# Incert Product Creation: Wireframe Explorations

**Purpose**: This workspace is a sandbox for exploring different UX approaches for a **Product Creation Page**. We will build multiple distinct versions (v1, v2, v3...) as separate routes to compare workflows.

**Constraint**: Even though this is a demo environment, all code must follow **Incert Monorepo** standards (Angular 19, PrimeNG 19, Incert Shared Libs) to ensure the winning design is portable to production.

---

## 1) Source of truth (what is actually in the repo)

- **Monorepo layout**: Nx-style `apps/` + `libs/` + `shared-libs/`.
  - UI tokens, styles, and theme live in `shared-libs/incert-assets`.
  - Shared UI components live in `shared-libs/incert-gui`.
- **Framework**: Angular **19.2.x** (see `package.json`).
- **UI stack**:
  - `@incert/incert-gui` = primary shared UI library (page wrappers, datatables, form helpers, etc.).
  - PrimeNG 19 + PrimeFlex 1.3.0, PrimeIcons 7.
  - Angular Gridster for dashboard widgets.
- **Global styles**:
  - **Default**: `shared-libs/incert-assets/stylesheet.scss` (global).
  - **Scoped variant**: `shared-libs/incert-assets/incert-components.scss` (styles are under `.inct`).
    - Used for embedded/isolated builds. If you use this file, you must wrap your UI in a `.inct` container.

---

## 2) Standalone product integration (how to stay consistent outside the repo)

Choose one of these paths and be explicit in your agent request.

### Option A: reuse Incert assets + components (preferred)

- **Bring in these folders/files** (direct copy or as a dependency):
  - `shared-libs/incert-assets/*` (SCSS, fonts, theme presets).
  - `shared-libs/incert-gui/src/lib/page/*` (page wrappers) and any other components you plan to use.
- **Include styles** in your standalone app build:
  - `shared-libs/incert-assets/stylesheet.scss` (global) **or**
  - `shared-libs/incert-assets/incert-components.scss` (scoped; requires `.inct` wrapper).
- **Include assets**:
  - Fonts under `shared-libs/incert-assets/fonts/*` (Soehne is required).
- **PrimeNG theme**:
  - Use `shared-libs/incert-assets/incertTheme.ts` as your preset.
  - Keep PrimeFlex + PrimeIcons installed and loaded.

### Option B: no shared components, styles only

- Only import `incert-assets` and replicate the layout primitives in your own code.
- You must still use the **Incert grid**, spacing classes, and theme tokens as documented below.
- This yields a consistent look but not full UI parity.

**Important**: If the standalone product does not share Angular/PrimeNG versions with this repo, lock visual outputs to the tokens and component patterns in this document rather than framework defaults.

---

## 3) Environment Setup Checklist

Use this checklist to initialize the workspace before starting on specific wireframes.

### Step 1: Framework Initialization

- [ ] **Angular**: Initialize a new Angular workspace (Standard or Nx) using Angular **19.2.x**.
- [ ] **Dependencies**: Install core libraries:
  - `primeng@19.0.0`
  - `primeicons@^7.0.0`
  - `primeflex@1.3.0`
  - `@angular/cdk` (if needed for drag-and-drop or intricate layouts)
- [ ] **Assets**: Copy over `incert-assets` and `incert-gui` (mocked or real) into `src/assets` or a local library folder.

### Step 2: Routing Infrastructure

- [ ] **Router Config**: Set up `app.routes.ts` to support lazy-loaded feature modules or standalone component routes for each version.
- [ ] **Route Structure**:
  ```typescript
  export const routes: Routes = [
    {
      path: "v1",
      loadComponent: () =>
        import("./explorations/v1-standard/v1.component").then(
          (m) => m.V1Component,
        ),
    },
    {
      path: "v2",
      loadComponent: () =>
        import("./explorations/v2-wizard/v2.component").then(
          (m) => m.V2Component,
        ),
    },
    { path: "", redirectTo: "v1", pathMatch: "full" },
  ];
  ```

### Step 3: Placeholders

- [ ] **Create Shells**: Generate the component shells for `v1`, `v2`, etc.
  - Each must include the basic `<page><page-content>...</page-content></page>` structure.
  - Add a simple text placeholder: "V[X] Work in Progress".
- [ ] **Navigation**: Add a temporary top-bar or sidebar link list to easily switch between `/v1`, `/v2`, etc.

### Step 4: Agent & Browser Access

- [ ] **Serve**: Ensure the app runs on `http://localhost:4200`.
- [ ] **Agent Preview**: If the agent has browser capabilities (via MCP), ensure it can hit `localhost`.
- [ ] **Validation**: The agent should verify that navigating to `/v1` renders the Incert styled page wrapper correctly before beginning detailed work.

---

## 4) Design system: tokens and sources of truth

### Typography

- **Font family**: `Soehne, sans-serif`.
- **Sizes** (from `_variables.scss`):
  - Base: `14px`
  - H1..H6: `28 / 26 / 24 / 22 / 20 / 18px`

### Color palette

- **Primary**: `#009711` (hover `#007A0E` in theme, `#58E650` in SCSS hover variant).
- **Text**: `#2B3435` (secondary `#5A5A5A`).
- **Backgrounds**: body `#F6F6F8`, surface `#FFFFFF`, box `#FAFAFA`.
- **Status**: success `#009711`, warn `#D9631E`, error `#DB404E`, info `#CCFDCD`.

Sources:

- `shared-libs/incert-assets/_variables.scss`
- `shared-libs/incert-assets/incertThemePrimitive.ts`

### Spacing & layout constants

- **Section padding**: `32px` (`$section-spacing`).
- **Separators**: `5/10/20/25px` (`$separator-*`).
- **Grid gutter**: `10px` (`$gutter`).

Sources:

- `shared-libs/incert-assets/_variables.scss`
- `shared-libs/incert-assets/core/grid.scss`

### Theme integration (PrimeNG)

- Theme preset: `shared-libs/incert-assets/incertTheme.ts` (Aura-based).
- PrimeNG CSS variables used in SCSS (e.g. `var(--p-incert-palette-primary)`).
- **Rule**: prefer PrimeNG components over custom HTML; let the theme handle colors.

---

## 5) Page composition patterns (use these first)

### Base page wrapper

- `<page>` provides optional header, description, and step navigation.
- For multi-step flows use `<page-step header="...">` inside `<page>`.

Source: `shared-libs/incert-gui/src/lib/page/page.component.*`

### Sections

- Use `<page-content>` for each section. It renders a standardized header + padded content.
- Supports `header`, `helpInfoText`, and spacing flags (`clearSpacingTop`, `clearSpacingBottom`, `clearSeparatorTop`).

Source: `shared-libs/incert-gui/src/lib/page/page-content/page-content.component.*`

### Width-constrained content

- `<page-inner-container containerSize="small|medium">` for forms or narrow sections.
  - `small` = max 700px, `medium` = max 1200px.

Source: `shared-libs/incert-gui/src/lib/page/page-inner-container/page-inner-container.component.scss`

---

## 6) Layout rules (do not improvise)

### Grid

- Use the custom grid system: `.grid` and `.col` / `.col-1..12`.
- **Rule**: a `.grid` must contain `.col...` children. Do not put content directly in a grid.
- Responsive: `sm:`, `md:`, `lg:` prefixes (from grid.scss).

Source: `shared-libs/incert-assets/core/grid.scss`

### Utility classes

- Alignment: `.align-left`, `.align-center`, `.align-right`.
- Spacing: `.separator-top`, `.separator-bottom`, `...-small`, `...-large`.
- Sizing: `.full-width`, `.full-height`.

Source: `shared-libs/incert-assets/core/misc-classes.scss`

### PrimeFlex

- PrimeFlex is available (imported globally), but the **primary layout system is the Incert grid**. Use PrimeFlex utilities only when they simplify micro-layouts.

---

## 7) Component patterns

### Data tables (list pages)

- Prefer `table-widget` / `incert-data-table` with `DataTableConfig` + `RqlDataSource`.
- Configure columns, filters, and actions in `ngOnInit`.

### Forms

- Use **Reactive Forms**.
- Wrap fields with `<form-field label="...">` for consistent spacing and label styling.
- Multi-language fields use `LanguageFormBuilder` (`GMS_FRONTEND_LFB`) + `incert-language-tabs`.

### Buttons & icons

- Buttons: `p-button` or `icon-button` (from incert-gui).
- Icons: `<incert-icon>` with `iconType` (preferred) or `iconClass`.

### Cards

- Use `<incert-card-item>` rather than building a custom card.

### Info & summary blocks

- `.information-box` and `.summary-box` styles are available.

---

## 8) Data + services

- Build API URLs with `GMSUrlResolver` rather than hardcoding.
- Keep UI logic in component, data operations in a feature service.

---

## 9) Internationalization (required)

- All user-visible text must use the `| i18n` pipe and consistent key prefixes.
- For multi-language data entry, use `LanguageFormBuilder` and `incert-language-tabs`.

---

## 10) Exploration Strategy (Routing & Versions)

We will implement each design concept as a separate route for easy comparison.

### Structure

- `src/app/explorations/v1-standard/` -> Route: `/v1`
- `src/app/explorations/v2-wizard/` -> Route: `/v2`
- `src/app/explorations/v3-modal/` -> Route: `/v3`

### Common Requirements for All Versions

1.  **Goal**: Allow a user to input product details (Name, SKU, Price, Description, Images).
2.  **Components**: Use `incert-gui` wrappers (`<page>`, `<page-content>`) and PrimeNG form elements.
3.  **Mock Data**: Use local services or hardcoded observables; no real backend needed.

---

## 11) Agent Request Template (Use This)

Use this prompt structure when creating a new iteration:

> **Task**: Create **Version {N}** of the Product Creation Page.
> **Concept**: {e.g., "Multi-step Wizard with Validation"}
> **Route**: `/v{N}`
> **Specs**:
>
> - **Layout**: {Describe usage of grid/page-content}
> - **Form Features**: {e.g., "Use ReactiveForms with real-time validation"}
> - **Key Difference**: {How this differs from previous versions}
> - **Reference**: Follow Section 3 (Tokens) and Section 6 (Components) of `ai-design-guideline.md`.

---

## 12) Quick references

- **Global styles**: `shared-libs/incert-assets/stylesheet.scss`
- **Scoped styles**: `shared-libs/incert-assets/incert-components.scss`
- **Tokens**: `shared-libs/incert-assets/_variables.scss`
- **Theme**: `shared-libs/incert-assets/incertTheme.ts`
- **Page components**: `shared-libs/incert-gui/src/lib/page/*`
- **Grid & utilities**: `shared-libs/incert-assets/core/grid.scss`, `shared-libs/incert-assets/core/misc-classes.scss`
- **Sample layouts**: `apps/sample/src/app/sample-page-content/sample-page-content.component.html`
