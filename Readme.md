# Die Barista — Shopify theme

Online Store 2.0 theme (Liquid + JSON templates). Synced with store **die-barista-kaffee**.

## Working copy (draft theme)

Target theme for new work — **not** the live storefront until published:

| | |
|--|--|
| Name | **Kopie JT Theme bny media \| Barista neu 2026** |
| ID | `184791367945` |

```bash
# Re-sync this folder from that theme only
shopify theme pull --store die-barista-kaffee.myshopify.com --theme 184791367945

# Preview + push changes to this theme (not live)
shopify theme dev --store die-barista-kaffee.myshopify.com --theme 184791367945
```

[Preview in browser](https://die-barista-kaffee.myshopify.com?preview_theme_id=184791367945) · [Theme editor](https://die-barista-kaffee.myshopify.com/admin/themes/184791367945/editor)

If the name in admin differs from the screenshot (“Kopie JT … Optimized”), run `shopify theme list --store die-barista-kaffee.myshopify.com` and use the matching `--theme <id>`.

## Prerequisites

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) (`npm install -g @shopify/cli @shopify/theme` or Homebrew)
- Node/npm for CLI

## Commands

```bash
# Log in (browser)
shopify auth login --store die-barista-kaffee.myshopify.com

# Pull (use Working copy section for --theme ID)
shopify theme pull --store die-barista-kaffee.myshopify.com --theme 184791367945

# Local preview (add --theme 184791367945 to sync the draft copy)
shopify theme dev --store die-barista-kaffee.myshopify.com --theme 184791367945
```

Optional:

```bash
shopify theme push --store die-barista-kaffee.myshopify.com   # upload (use with care)
shopify theme list --store die-barista-kaffee.myshopify.com
```

## Things to know

- **`templates/*.json`**, **`sections/*-group.json`**: often updated by the theme editor — easy to overwrite; commit before risky edits.
- **Never run `theme dev` from an empty folder** — CLI may try to delete remote files to match local. Pull or init first.
- **Global npm installs** on macOS may need `sudo` or a user-owned global prefix; **`~/.npm` EACCES** → `sudo chown -R "$(id -u):$(id -g)" ~/.npm`
- **Layout**: `layout/theme.liquid` wraps every page; homepage body = `templates/index.json` → `sections/*.liquid`.
- **Published vs preview**: `theme dev` uses a development theme; customers see the published theme until you publish changes in admin.
