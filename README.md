# QueryFusion

QueryFusion is a Vite-powered React + TypeScript single-page application for exploring JSON and XML documents. It provides a three-panel layout where users can paste or upload content, compose queries, and review results with helpful tooling such as syntax highlighting, validation, and formatting utilities.

## Key Features

- **Dual content support** – Toggle between JSON and XML workflows through the navigation bar; each content type keeps its own content, query, and results using an internal `DefaultContentSpecificMap` store. Content type state is managed through React Context to avoid prop drilling across components.
- **Rich editing experience** – All three panels use Ace Editor with autocompletion, theming, and focus management so keyboard users can quickly switch between the content, query, and result panes.
- **Content validation and formatting** – Validation is handled by the `ContentValidator`, delegating to JSON or XML validators to surface parsing issues in real time. When content is valid, the formatter service can pretty-print it for easier inspection.
- **Query execution services** – Queries are processed client-side via `jsonpath` for JSON documents and `xpath` with `xmldom` for XML. Responses are normalized into `IQueryResponse` objects for consistent rendering.
- **Context-driven state management** – Theme preferences and content type selection use React Context providers, eliminating prop drilling and providing clean separation of concerns.
- **User experience helpers** – Includes dark/light theme switching, GitHub link, and responsive layout built with React Bootstrap and Font Awesome icons.

## Project Structure

```
├── src
│   ├── components
│   │   ├── content/         # Content editor panel with content types and data models
│   │   ├── query/           # Query editor with validation and query response models  
│   │   ├── result/          # Read-only result viewer
│   │   ├── layout/          # Layout orchestration with editor focus management
│   │   └── navbar/          # Navigation with branding, theme toggle, content type selector
│   ├── contexts/            # React context providers and custom hooks
│   │   ├── AppProvider.tsx         # Main provider wrapper that combines all contexts
│   │   ├── ThemeContext.tsx        # Theme provider for dark/light mode switching
│   │   ├── ContentTypeContext.tsx  # Content type provider for JSON/XML state management
│   │   ├── themeContext.ts         # Theme context definition and types
│   │   ├── contentTypeContext.ts   # Content type context definition and types
│   │   ├── useTheme.ts            # Hook for consuming theme context
│   │   ├── useContentType.ts      # Hook for consuming content type context
│   │   └── index.ts               # Centralized exports for all contexts
│   ├── services/            # Service classes for formatting, validation, and querying
│   ├── styles/              # Shared styling helpers
│   └── tests/               # Jest configuration and test setup files
├── public                   # Static assets (e.g., favicon, logo)
├── index.html               # Vite entry point
└── package.json             # Tooling configuration
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Build for production**
   ```bash
   npm run build
   ```
4. **Preview the production build**
   ```bash
   npm run preview
   ```

## Testing

No automated test suite is currently defined; feature behavior can be validated manually through the running application.

## To-Do List

To finish the UI-only QueryFusion experience (no accounts, no persistence, and no data collection), work through the following tasks:

1. **Design polish and responsiveness** – Audit the three-panel layout on common breakpoints, tightening spacing, typography, and iconography so the interface feels cohesive on both desktop and tablet widths.
2. **Editor affordances** – Add inline guidance in each editor panel (placeholder text, tooltips, empty-state messaging) to clarify how users can paste/upload content, craft queries, and interpret results without requiring documentation.
3. **Validation feedback** – Enhance the validation messaging area with color, icons, and succinct copy that make JSON/XML issues immediately clear while remaining entirely client-side.
4. **Result visualization** – Provide alternative renderers (tree view for JSON, formatted markup for XML) that help users inspect complex responses without leaving the browser.
5. **Theme refinements** – Revisit the light/dark theme palette to ensure accessible contrast ratios and consistent styling across all components.
6. **Keyboard and screen reader support** – Confirm that focus order, ARIA labels, and skip links enable complete navigation and usage without a mouse.
7. **Sample content shortcuts** – Offer quick actions that populate the editors with demo JSON/XML snippets so users can try the tool instantly while keeping everything local to the session.
8. **In-browser help modal** – Create a lightweight help/about modal summarizing capabilities, privacy assurances (client-only processing, no data storage), and external resources.
9. **Performance review** – Profile the client bundle, eliminating unnecessary dependencies and enabling lazy loading where possible to keep the UI fast.
10. **Manual QA checklist** – Document a manual test pass covering the JSON and XML workflows, theme toggling, formatting, and validation—all within the browser.

