import { TFile } from "obsidian";
import { workerBridge } from "bridge";
import { services } from "./services";
import type { AnyIDBZoteroItem } from "types/db-schema";
import type { CitationFormat } from "settings/types";
import type { AnnotationJSON } from "types/zotero-reader";

/** A Zotero item bundled with its optional annotation for citation. */
export interface CitationInput {
    item: AnyIDBZoteroItem;
    annotation?: AnnotationJSON;
}

/** Result of citation generation for a single item. */
export interface CitationResult {
    /** Inline citation text (e.g., `[@key]`, `[^key]`, `[[note]]`). */
    citation: string;
    /** Footnote definition line (only for footnote format). */
    footnoteDef?: string;
}

/** Generates citation strings for Zotero items. */
export class CitationService {
    /**
     * Generate citation strings for one or more items.
     * @param format   Citation format to use.
     * @param inputs   Items (with optional annotations) to cite.
     */
    async generate(
        format: CitationFormat,
        inputs: CitationInput[],
    ): Promise<CitationResult[]> {
        const results: CitationResult[] = await Promise.all(
            inputs.map(async (input) => {
                let notePath: string | undefined;

                notePath = services.indexService.getFileByKey(
                    input.item.key,
                )?.path;

                if (!notePath) {
                    notePath = await workerBridge.libraryNote.ensureNote(
                        input.item.libraryID,
                        input.item.key,
                        {},
                    );
                }

                if (!notePath) {
                    services.logService.error(
                        `Unable to resolve or create source note for item ${input.item.libraryID}/${input.item.key}`,
                        "CitationService",
                    );
                    return { citation: "" };
                }

                try {
                    switch (format) {
                        case "pandoc":
                            return await this.pandoc(input, notePath);
                        case "wikilink":
                            return await this.wikilink(input, notePath);
                        case "footnote":
                            return await this.footnote(input, notePath);
                        case "citekey":
                            return this.citekey(input);
                    }
                } catch (error) {
                    services.logService.error(
                        `Error generating citation for item ${input.item.libraryID}/${input.item.key}: ${error}`,
                        "CitationService",
                        error,
                    );
                    return { citation: "" };
                }
            }),
        );
        return results;
    }

    /** `[@citekey]` — template-rendered or hardcoded fallback. */
    private async pandoc(
        input: CitationInput,
        notePath: string,
    ): Promise<CitationResult> {
        const citekey = input.item.citationKey || input.item.key;
        const rendered =
            await workerBridge.libraryTemplate.renderCitationTemplate(
                input,
                notePath,
                "pandoc",
            );
        if (rendered) {
            return { citation: rendered };
        }

        // Fallback: simple `[@citekey]`
        return { citation: `[@${citekey}]` };
    }

    /** `@citekey` — raw citation key only. */
    private citekey(input: CitationInput): CitationResult {
        const citekey = input.item.citationKey || input.item.key;
        return { citation: `@${citekey}` };
    }

    /** Wikilink: template-rendered or `generateMarkdownLink` fallback. */
    private async wikilink(
        input: CitationInput,
        notePath: string,
    ): Promise<CitationResult> {
        const citekey = input.item.citationKey || input.item.key;

        const rendered =
            await workerBridge.libraryTemplate.renderCitationTemplate(
                input,
                notePath,
                "wikilink",
            );
        if (rendered) {
            return { citation: rendered };
        }
        // Fallback: generateMarkdownLink
        const file = services.app.vault.getAbstractFileByPath(notePath);
        if (file instanceof TFile) {
            const link = services.app.fileManager.generateMarkdownLink(
                file,
                "",
                "",
                file.name.split(".").shift(),
            );
            return { citation: link };
        }
        return { citation: `[[@${citekey}]]` };
    }

    /** `[^citekey]` reference + footnote definition. */
    private async footnote(
        input: CitationInput,
        notePath: string,
    ): Promise<CitationResult> {
        const citekey = input.item.citationKey || input.item.key;
        const citation = `[^${citekey}]`;
        const footnoteDef = await this.footnoteDef(input, notePath);
        return { citation, footnoteDef };
    }

    /** Render the footnote definition text via the template service. */
    private async footnoteDef(
        input: CitationInput,
        notePath: string,
    ): Promise<string | undefined> {
        const rendered =
            await workerBridge.libraryTemplate.renderCitationTemplate(
                input,
                notePath,
                "footnote",
            );
        if (!rendered) return undefined;
        const citekey = input.item.citationKey || input.item.key;
        return `[^${citekey}]: ${rendered}`;
    }
}
