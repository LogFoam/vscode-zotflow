# ZotFlow — Keep Your Research in Flow

ZotFlow is a community plugin for [Obsidian](https://obsidian.md) that deeply integrates [Zotero](https://www.zotero.org) into your note-taking workflow. It syncs your Zotero libraries, lets you read and annotate PDFs/EPUBs/snapshots directly inside Obsidian, and automatically generates richly-templated source notes — all without leaving your vault.

If you have any of the following requirements, it will worth giving ZotFlow a try:

- You want to keep your Zotero library in **sync** with Obsidian, including annotations and metadata.
- You want to **read and annotate PDFs/EPUBs** without switching apps or breaking your flow.
- You want to annotate attachments in **Obsidian Markdown format**, with support for text, highlights, images, and ink.
- You want a immersive reading experience with your **Obsidian theme and custom CSS**.
- You want your source notes to be **automatically generated** and updated based on your Zotero items and annotations.
- You want to **cite** your literature in Obsidian with different formats (pandoc, wiki link, footnote).
- ...

## Features

### Read & Annotate Inside Obsidian

Read PDFs, EPUBs, and HTML snapshots without leaving Obsidian. Highlight, underline, draw, add notes — all annotation types are supported, and everything stays in sync with your Zotero library. The built-in reader is fully themed to match your Obsidian setup.

<!-- TODO: replace with actual GIF -->

![Built-in Reader](docs/assets/reader-placeholder.gif)

### Annotate Local Vault Files

Open **any** PDF or EPUB already in your vault with the same full-featured reader. Annotations are saved alongside the file — no Zotero account required.

<!-- TODO: replace with actual GIF -->

![Local Reader](docs/assets/local-reader-placeholder.gif)

### Bidirectional Sync

Pull items from Zotero **and push changes back** — annotations, metadata, everything. Configure each library as _Bidirectional_, _Read-Only_, or _Ignored_. When conflicts arise, a field-level diff viewer lets you pick _Keep Local_ or _Accept Remote_.

<!-- TODO: replace with actual GIF -->

![Bidirectional Sync](docs/assets/sync-placeholder.gif)

### Template-Powered Source Notes

Each Zotero item gets one auto-generated source note, rendered with [LiquidJS](https://liquidjs.com) templates you fully control. Notes regenerate when annotations change and are locked to prevent accidental edits — your own ideas go in separate notes that link back.

<!-- TODO: replace with actual GIF -->

![Source Notes](docs/assets/source-notes-placeholder.gif)

### Multi-Format Citations

Insert citations as **Pandoc** (`[@key]`), **Wikilinks** (`[[note]]`), **Footnotes**, or raw citekeys. Trigger them via command, autocomplete-as-you-type, or drag-and-drop from the tree view — with optional annotation context included.

<!-- TODO: replace with actual GIF -->

![Citations](docs/assets/citations-placeholder.gif)

### Zotero Tree View

Browse your entire Zotero library — collections, items, attachments — in a sidebar tree. Sort by title, date added, or date modified. Open any attachment or source note with a single click.

<!-- TODO: replace with actual GIF -->

![Tree View](docs/assets/tree-view-placeholder.gif)

### And More

- **WebDAV Support** — download attachments from your self-hosted storage.
- **Zotero LABD Support** — Support attachment which store in Zotero as a linked_file.
- **Batch operations** — create all source notes, extract all annotation images, or re-render all templates in one go.
- **Activity Center** — monitor sync progress, running tasks, and view a searchable log console.
- **Offline-first** — all data cached in IndexedDB. Network is only used for Zotero API and WebDAV.
- **Secure credentials** — API keys stored in Obsidian's `SecretStorage`, never in synced `data.json`.
- **Mobile-safe** — works on both desktop and mobile (current mobile support is limited).

## Installation

> **Note:** This plugin is currently in beta and not available in the official Obsidian Community Plugins store yet.

### From BRAT

1. **Install BRAT Plugin**
    - Open Obsidian Settings (⚙️)
    - Go to **Community plugins**
    - Click **Browse** and search for "BRAT"
    - Install and enable the **BRAT** plugin

2. **Add Beta Plugin**
    - In Obsidian, open **Settings → Community plugins**
    - Find **BRAT** in your installed plugins and click **Options**
    - Click **Add Beta plugin**
    - Enter the repository: `duanxianpi/obsidian-zotflow`
    - Click **Add Plugin**

3. **Enable Plugin**
    - Go to **Settings → Community plugins**
    - Find **Obsidian ZotFlow** in the list
    - Toggle it on to enable

4. Open **Settings → Community plugins → Browse**.
5. Search for **ZotFlow**.
6. Click **Install**, then **Enable**.

## Quick Start

1. **Get a Zotero API key** — go to [https://www.zotero.org/settings/keys/new](https://www.zotero.org/settings/keys/new) and create a key with read/write access to your personal library (and any groups you want to sync).
2. **Enter the key** in **Settings → ZotFlow → Sync**.
3. **Run your first sync** — open the Activity Center (ribbon icon or command palette) and click **Sync All**.
4. **Browse your library** — open the Zotero Tree View from the command palette or the left sidebar.
5. **Read & annotate** — click any attachment in the tree to open it in the built-in reader.

## Documentation

Check out the [full documentation](docs/README.md) for detailed guides, troubleshooting, and advanced features.

<!-- ## Commands

TODO

| Command                   | Description                              |
| ------------------------- | ---------------------------------------- |
| **Open Zotero Tree View** | Show the library browser in the sidebar. | -->

## Architecture

ZotFlow uses a **Main Thread + Web Worker** split:

- **Main thread** — Obsidian API interactions, UI rendering (React for complex views, native Obsidian APIs for settings).
- **Web Worker** — Zotero API communication, sync engine, database (IndexedDB via Dexie), template rendering, PDF processing.
- **Reader iframe** — Zotero's PDF/EPUB/HTML reader embedded via penpal for isolated, sandboxed rendering.

Communication flows through [Comlink](https://github.com/GoogleChromeLabs/comlink) (main ↔ worker) and [Penpal](https://github.com/nicmeriano/penpal) (main ↔ reader iframe).

## Development

### Prerequisites

- Node.js ≥ 16
- npm

### Setup

```bash
git clone https://github.com/duanxianpi/obsidian-zotflow.git --recursive
cd obsidian-zotflow
npm install
```

### Build

```bash
npm run build:ci       # Full CI build (PDF.js + reader + plugin)
```

### Development Mode

```bash
npm run dev:plugin     # esbuild watch mode (plugin)
npm run dev:reader     # webpack watch mode (reader, separate terminal)
```

### Lint

```bash
npm run lint
```

### Testing Locally

Copy `main.js`, `manifest.json`, and `styles.css` to:

```
<vault>/.obsidian/plugins/obsidian-zotflow/
```

Reload Obsidian and enable the plugin.

## Privacy

- **No telemetry, no analytics, no tracking.**
- Network requests go only to the Zotero API and your configured WebDAV server.
- Credentials are stored in Obsidian's platform-native `SecretStorage`.
- The reader iframe communicates only via structured-clone messaging (no `eval`, no remote code).

## License

[AGPL-3.0-only](LICENSE)

## Author

**Xianpi Duan** — [GitHub](https://github.com/duanxianpi/)

## Sponsor

Thanks for checking out the plugin! I’m currently a student and working on this plugin nights and weekends. If it’s useful to you, a small tip will help me keep shipping features.

<div>
	<a href="https://www.buymeacoffee.com/duanxianpi" target="_blank" title="buymeacoffee">
	  <img src="https://iili.io/JoQ0zN9.md.png"  alt="buymeacoffee-orange-badge" style="width: 200px;">
	</a>
</div>

---

## Roadmap / Feedback

Have ideas or found a bug? Please join the discord server!
<a href="https://discord.gg/7vNrR6qhVr"> <img alt="Join our Discord" src="https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white&style=for-the-badge"> </a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=duanxianpi/obsidian-zotflow&type=date&legend=top-left)](https://www.star-history.com/#duanxianpi/obsidian-zotflow&type=date&legend=top-left)
