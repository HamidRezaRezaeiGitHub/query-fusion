# QueryFusion

QueryFusion is a Vite-powered React + TypeScript single-page application for exploring JSON and XML documents. It provides a three-panel layout where users can paste or upload content, compose queries, and review results with helpful tooling such as syntax highlighting, validation, and formatting utilities.

## Key Features

- **Dual content support** – Toggle between JSON and XML workflows through the navigation bar; each content type keeps its own content, query, and results using an internal `DefaultContentSpecificMap` store.
- **Rich editing experience** – All three panels use Ace Editor with autocompletion, theming, and focus management so keyboard users can quickly switch between the content, query, and result panes.
- **Content validation and formatting** – Validation is handled by the `ContentValidator`, delegating to JSON or XML validators to surface parsing issues in real time. When content is valid, the formatter service can pretty-print it for easier inspection.
- **Query execution services** – Queries are processed client-side via `jsonpath` for JSON documents and `xpath` with `xmldom` for XML. Responses are normalized into `IQueryResponse` objects for consistent rendering.
- **User experience helpers** – Includes dark/light theme switching, GitHub link, and responsive layout built with React Bootstrap and Font Awesome icons.

## Project Structure

```
├── src
│   ├── components
│   │   ├── content/       # Content editor panel (upload, clear, format controls)
│   │   ├── query/         # Query editor with validation-aware messaging
│   │   ├── result/        # Read-only result viewer fed by query services
│   │   ├── layout/        # Orchestrates panel composition and shared state
│   │   └── navbar/        # Branding, theme toggle, and content type selector
│   ├── model/             # TypeScript models for content, queries, and validation
│   ├── services/          # Formatting, validation, and query service classes
│   └── styles/            # Shared styling helpers
├── public                 # Static assets (e.g., favicon, logo)
├── index.html             # Vite entry point
└── package.json           # Tooling configuration
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

