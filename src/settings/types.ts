export type LibrarySyncMode = "bidirectional" | "readonly" | "ignored";
export type TabSection = "sync" | "webdav" | "cache" | "general";

export interface LibraryConfig {
    mode: LibrarySyncMode;
}

export interface ZotFlowSettings {
    zoteroapikey: string;
    librariesConfig: Record<string, LibraryConfig>;
    syncInterval: number; // in minutes
    autoSync: boolean;
    useWebDav: boolean;
    webDavUrl?: string;
    webDavUser?: string;
    webdavpassword?: string;
    useCache: boolean;
    maxCacheSizeMB: number;
    sourceNoteTemplatePath: string;
    localSourceNoteTemplatePath: string;
    localSourceNoteFolder: string;
    sourceNoteFolder: string;
    autoImportAnnotationImages: boolean;
    annotationImageFolder: string;
    overwriteViewer: boolean;
}

/** Persisted reader view state for a single attachment (local or remote). */
export interface ViewStateEntry {
    primaryViewState?: Record<string, unknown>;
    secondaryViewState?: Record<string, unknown>;
}

/**
 * Full shape of data.json.
 * Settings and non-settings data are stored as separate top-level keys.
 *
 * `viewStates` is keyed by file path (local) or `"libraryID:itemKey"` (remote).
 */
export interface ZotFlowPluginData {
    settings: ZotFlowSettings;
    viewStates: Record<string, ViewStateEntry>;
}

export const DEFAULT_SETTINGS: ZotFlowSettings = {
    zoteroapikey: "",
    librariesConfig: {},
    syncInterval: 30,
    autoSync: false,
    useWebDav: false,
    useCache: true,
    maxCacheSizeMB: 500,
    sourceNoteTemplatePath: "",
    sourceNoteFolder: "",
    localSourceNoteTemplatePath: "",
    localSourceNoteFolder: "",
    autoImportAnnotationImages: false,
    annotationImageFolder: "",
    overwriteViewer: false,
};

export const DEFAULT_PLUGIN_DATA: ZotFlowPluginData = {
    settings: { ...DEFAULT_SETTINGS },
    viewStates: {},
};
