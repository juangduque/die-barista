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

If the name in admin differs from the screenshot ("Kopie JT … Optimized"), run `shopify theme list --store die-barista-kaffee.myshopify.com` and use the matching `--theme <id>`.

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

## Landing page (homepage)

The homepage (`/`) is defined in `templates/index.json`. The index template currently ships with **nav, hero, and trust** only; add more sections in the theme editor or JSON as you rebuild.

`templates/page.landing-handwerk.json` mirrors the same stack as the index (plus a disabled `main-page`) when you assign that template to a **Page**.

**Template section IDs** (index + Handwerk): `home_nav`, `home_hero`, `home_trust` (and `main` on the Handwerk page template only).

**Landing section types** still in the theme:

1. **Nav** (`landing-nav-barista`) — Sticky bar, nav item blocks, CTA.
2. **Hero** (`landing-hero-handwerk`) — Split layout: background + portrait images, status line, eyebrow, headline, body, two CTAs.
3. **Trust bar** (`landing-trust-bar`) — Repeating **blocks** "Item": icons / stars + label.

**How to edit**

1. **Online Store → Themes → Customize** (draft theme).
2. Open the **Home page** — sections appear in order in the left sidebar.
3. Use the **right sidebar** for settings and blocks (add / reorder / remove).

**Key links seeded in JSON (hero)**

| Link | Target |
|------|--------|
| Primary CTA | collection `kaffee` |
| Secondary | page `uber-uns` — change if handle differs |

**Assets & fonts**

- All images are set via the theme editor. Upload under **Settings → Files** or pick from the library.
- Sections use theme CSS variables (`--font-heading-family`, etc.) — they follow the active theme fonts.

**Publish checklist**

1. Work on draft theme **#184791367945** until approved.
2. **Publish** that theme in admin — the new homepage goes live.
3. Header/footer still come from `header-group` / `footer-group` (unchanged).
