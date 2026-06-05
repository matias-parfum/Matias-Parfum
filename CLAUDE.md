# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Matías Parfum is a static HTML/CSS/JS e-commerce catalog for a perfume shop in Costa Rica. It has no build system, no package manager, and no framework — just files served directly by GitHub Pages at `matiasparfum.com`.

## Development

**Preview locally** — open `index.html` in a browser directly, or use any static server:
```
npx serve .
# or
python -m http.server 8080
```

**Deploy** — push to GitHub; GitHub Pages handles the rest (custom domain configured via `CNAME`).

There are no tests, linters, or build steps.

## File structure and architecture

| File | Role |
|---|---|
| `index.html` | ~5 500-line monolith: navbar, hero, all ~239 product cards, finder quiz, comparator modal, footer, and inline `<script>` |
| `style.css` | All styles; CSS custom-property tokens at the top of `:root` |
| `script.js` | Legacy filter helpers (loaded by `index.html`); its functions are **overridden** by the inline `<script>` at the bottom of `index.html` |
| `productos/*.html` | ~40 individual product pages with a lighter topbar-only layout (not the full main nav) |
| `img/` | All product images (~250 files, referenced directly) |

### Product card anatomy

Every product in `index.html` is a hardcoded `<div class="card">` with these data attributes:

```html
<div class="card"
  data-nombre="Jean Paul Gaultier Le Male"
  data-tipo="Hombre"          <!-- Hombre | Mujer | Unisex -->
  data-brand="Jean Paul Gaultier"
  data-familia="Oriental"     <!-- Fresco | Oriental | Floral | Amaderado | Chypre | Gourmand -->
  data-intensidad="4"         <!-- 1–5 -->
  data-duracion="8">          <!-- hours -->
```

The three catalog sections use `data-seccion` on their `<section>` elements (`Hombre`, `Mujer`, `Unisex`) and matching grid IDs (`gridHombre`, `gridMujer`, `gridUnisex`).

### Filter system

All filtering runs client-side in the inline `<script>` at the bottom of `index.html`. The single source of truth is the `activeFilters` object:

```js
let activeFilters = { tipo:'Todos', marca:'Todos', precio:'Todos', familia:'Todos', query:'' };
```

`aplicarFiltros()` iterates every `.card`, reads its `data-*` attributes against `activeFilters`, toggles `display:none`, and updates the per-section counts and the `.filter-count` badge. The brand buttons in the `#marcas` section pass `this` (the element) to `filtrarMarca()`, while the `<select>` in the filter bar passes `this.value` — both code paths set `activeFilters.marca`.

> `script.js` also defines `filtrarTipo`, `filtrarPerfumes`, and `aplicarFiltros`. These are overridden by the identical inline definitions in `index.html`. Edits to filter logic should go in the **inline script only**.

### WhatsApp integration

All CTAs open `https://wa.me/50683674466` with a pre-encoded message. Two helpers exist (defined in both `script.js` and the inline script):

- `consultarPerfume(nombre)` — pre-fills the fragrance name
- `consultarGeneral()` — generic inquiry

### Perfume Finder quiz

A 2-step UI (`#step1` → `#step2` → `#finderResult`) that collects `ocasion` and `familia` via `selectFinder(el)`, then filters `.card` elements by `data-familia` and `data-tipo` to render up to 4 recommendations into `#finderResultGrid`.

### Comparator

Clicking a card checkbox adds it to `compSlots` (up to 2). Once 2 are selected, the sticky `#comparadorBar` activates and the "Comparar" button opens `#compModal`, which renders a side-by-side column view from each card's `data-*` attributes.

### Individual product pages (`productos/`)

These pages share only `style.css` (linked as `/style.css`) with the main site. They have their own slim topbar, breadcrumb, size selector, quantity input, and a local `<script>` that handles the WhatsApp CTA and tab switching. They do **not** load `script.js`.

### CSS design tokens

Key tokens in `:root` (top of `style.css`):

```css
--ink / --ink2 / --ink3   /* dark backgrounds */
--gold / --gold-lt         /* accent colour */
--cream / --stone          /* light text */
--serif                    /* DM Serif Display */
--sans                     /* Outfit */
```

### Scroll animations

`.reveal` elements use an `IntersectionObserver` that adds class `in` on entry. Product cards stagger with a `transitionDelay` based on their index mod 6.

## Adding a new product

1. Add the image to `img/`.
2. Copy any existing `<div class="card">` block in the correct section of `index.html` and update all `data-*` attributes, the `src`/`alt` on the `<img>`, `href` links, and `.precio`.
3. If a dedicated product page is needed, copy a page from `productos/` and update its content.
4. Increment the count in `.filter-count` (`239 fragancias` hardcoded in the filter bar — update it after adding cards).
