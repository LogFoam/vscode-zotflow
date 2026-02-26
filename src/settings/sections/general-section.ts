import { Setting, SettingGroup } from "obsidian";
import ZotFlow from "main";

/** Settings section rendering source note paths, folders, and local reader options. */
export class GeneralSection {
    plugin: ZotFlow;
    refreshUI: () => void;

    constructor(plugin: ZotFlow, refreshUI: () => void) {
        this.plugin = plugin;
        this.refreshUI = refreshUI;
    }

    render(containerEl: HTMLElement) {
        const zoteroSourceNote = new SettingGroup(containerEl);
        zoteroSourceNote.setHeading("Zotero Attachment Source Note");

        zoteroSourceNote.addSetting((setting) => {
            setting
                .setName("Template Path")
                .setDesc(
                    "Path to template file for zotero attachment's source notes (relative to vault root).",
                )
                .addText((text) => {
                    text.setPlaceholder("e.g. templates/SourceNoteTemplate.md")
                        .setValue(this.plugin.settings.sourceNoteTemplatePath)
                        .onChange(async (value) => {
                            this.plugin.settings.sourceNoteTemplatePath = value;
                            await this.plugin.saveSettings();
                        });
                    text.inputEl.size = 40;
                });
        });

        zoteroSourceNote.addSetting((setting) => {
            setting
                .setName("Default Source Note Folder")
                .setDesc(
                    "Default folder for zotero attachment's source notes (relative to vault root).",
                )
                .addText((text) => {
                    text.setPlaceholder("e.g. Source/ZotFlow")
                        .setValue(this.plugin.settings.sourceNoteFolder)
                        .onChange(async (value) => {
                            this.plugin.settings.sourceNoteFolder = value;
                            await this.plugin.saveSettings();
                        });
                    text.inputEl.size = 40;
                });
        });

        const localSourceNote = new SettingGroup(containerEl);
        localSourceNote.setHeading("Local Attachment Source Note");

        localSourceNote.addSetting((setting) => {
            setting
                .setName("Source Note Template Path")
                .setDesc(
                    "Path to template file for local source notes (relative to vault root).",
                )
                .addText((text) => {
                    text.setPlaceholder(
                        "e.g. templates/LocalSourceNoteTemplate.md",
                    )
                        .setValue(
                            this.plugin.settings.localSourceNoteTemplatePath,
                        )
                        .onChange(async (value) => {
                            this.plugin.settings.localSourceNoteTemplatePath =
                                value;
                            await this.plugin.saveSettings();
                        });
                    text.inputEl.size = 40;
                });
        });

        localSourceNote.addSetting((setting) => {
            setting
                .setName("Local Source Note Folder")
                .setDesc(
                    "Default folder for local source notes (relative to vault root).",
                )
                .addText((text) => {
                    text.setPlaceholder("e.g. Source/ZotFlow/Local")
                        .setValue(this.plugin.settings.localSourceNoteFolder)
                        .onChange(async (value) => {
                            this.plugin.settings.localSourceNoteFolder = value;
                            await this.plugin.saveSettings();
                        });
                    text.inputEl.size = 40;
                });
        });

        const generalSettingGroup = new SettingGroup(containerEl);
        generalSettingGroup.setHeading("General Settings");

        generalSettingGroup.addSetting((setting) => {
            setting
                .setName("Auto Import Annotation Images")
                .setDesc(
                    "Auto import annotation images for area and ink annotations from PDF when creating source notes.",
                )
                .addToggle((toggle) => {
                    toggle.setValue(
                        this.plugin.settings.autoImportAnnotationImages,
                    );
                    toggle.onChange(async (value) => {
                        this.plugin.settings.autoImportAnnotationImages = value;
                        await this.plugin.saveSettings();
                    });
                });
        });

        generalSettingGroup.addSetting((setting) => {
            setting
                .setName("Annotation Image Folder")
                .setDesc(
                    "Default folder for annotation images (relative to vault root).",
                )
                .addText((text) => {
                    text.setPlaceholder("e.g. Attachments/ZotFlow")
                        .setValue(this.plugin.settings.annotationImageFolder)
                        .onChange(async (value) => {
                            this.plugin.settings.annotationImageFolder = value;
                            await this.plugin.saveSettings();
                        });
                    text.inputEl.size = 40;
                });
        });

        const zoteroReaderSettingGroup = new SettingGroup(containerEl);
        zoteroReaderSettingGroup.setHeading("Zotero Reader");

        zoteroReaderSettingGroup.addSetting((setting) => {
            setting
                .setName("Overwrite PDF/EPUB/HTML Viewer")
                .setDesc(
                    "Overwrite PDF/EPUB/HTML viewer with local Zotero reader (Requires Restart).",
                )
                .addToggle((toggle) => {
                    toggle.setValue(this.plugin.settings.overwriteViewer);
                    toggle.onChange(async (value) => {
                        this.plugin.settings.overwriteViewer = value;
                        await this.plugin.saveSettings();
                    });
                });
        });

        zoteroReaderSettingGroup.addSetting((setting) => {
            setting
                .setName("Follow Obsidian Color Scheme")
                .setDesc(
                    "Follow the current Obsidian color scheme (light/dark) in the Zotero reader.",
                )
                .addToggle((toggle) => {
                    toggle.setValue(
                        this.plugin.settings.readerFollowObsidianScheme,
                    );
                    toggle.onChange(async (value) => {
                        this.plugin.settings.readerFollowObsidianScheme = value;
                        await this.plugin.saveSettings();
                    });
                });
        });

        zoteroReaderSettingGroup.addSetting((setting) => {
            setting
                .setName("Follow Obsidian Theme")
                .setDesc(
                    "Use the forground/background colors of the current Obsidian theme in the Zotero reader.",
                )
                .addToggle((toggle) => {
                    toggle.setValue(
                        this.plugin.settings.readerFollowObsidianTheme,
                    );
                    toggle.onChange(async (value) => {
                        this.plugin.settings.readerFollowObsidianTheme = value;
                        await this.plugin.saveSettings();
                    });
                });
        });
    }
}
