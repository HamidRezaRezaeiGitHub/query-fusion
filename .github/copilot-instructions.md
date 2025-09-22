# QueryFusion Copilot Instructions

QueryFusion is a Vite-powered React + TypeScript single-page application for exploring JSON and XML documents. It provides a three-panel layout where users can paste or upload content, compose queries, and review results with helpful tooling such as syntax highlighting, validation, and formatting utilities.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Test the Repository

**CRITICAL: NEVER CANCEL any builds or commands. All operations complete quickly in this project.**

1. **Install dependencies** (first time setup requires dependency fixes):
   ```bash
   npm install
   ```
   - **Expected time**: 20-30 seconds
   - **Common issue**: If installation fails with version not found errors, the following packages need version fixes:
     - `@types/xmldom`: Use `^0.1.34` (not `^0.1.35`)
     - `react-ace`: Use `^11.0.1` (not `^11.5.0`) 
     - `xmldom`: Use `^0.6.0` (not `^0.8.10`)
   - **Missing dependencies**: Install `ts-node` and `jest-environment-jsdom` if Jest fails:
     ```bash
     npm install --save-dev ts-node jest-environment-jsdom
     ```

2. **Lint the code**:
   ```bash
   npm run lint
   ```
   - **Expected time**: 6 seconds
   - **Note**: May show TypeScript version warning (safe to ignore)

3. **Build for production**:
   ```bash
   npm run build
   ```
   - **Expected time**: 6 seconds total (tsc + vite build)
   - **Output**: Creates `dist/` directory with optimized bundle (~915KB JS, ~233KB CSS)
   - **Warning**: Bundle size warning is expected (large due to Ace Editor and Bootstrap)

4. **Run tests**:
   ```bash
   npm run test
   ```
   - **Expected time**: 2 seconds
   - **Current state**: No tests exist (exits with "No tests found"). Test infrastructure is configured but no test files are present.
   - **Test pattern**: Tests should be placed in `src/**/__tests__/**/*.(ts|tsx)` or `src/**/*.(spec|test).(ts|tsx)`

### Run the Application

1. **Development server**:
   ```bash
   npm run dev
   ```
   - **Expected time**: 200ms startup
   - **URL**: http://localhost:5173/
   - **Auto-reload**: Changes trigger instant updates

2. **Production preview**:
   ```bash
   npm run preview
   ```
   - **URL**: http://localhost:4173/
   - **Use case**: Test production build locally

## Validation Scenarios

**ALWAYS manually validate any changes by running through these complete end-to-end scenarios:**

### JSON Workflow Validation
1. Start the development server (`npm run dev`)
2. Navigate to http://localhost:5173/
3. Ensure "JSON" mode is selected in the navbar
4. Paste JSON content in the left panel: `{"name": "John", "age": 30, "city": "New York", "hobbies": ["reading", "swimming"]}`
5. Click "Format Content" button - verify JSON is properly formatted with syntax highlighting
6. Enter JSONPath query in middle panel: `$.name`
7. Verify query has syntax highlighting
8. Test theme toggle - click the moon/sun icon to switch between light/dark modes
9. Test "Clear" button to empty content
10. Test "Upload File" button with a .json file

### XML Workflow Validation
1. Click the content type dropdown in navbar and select "XML"
2. Paste XML content in the left panel (use sample from `test-data/sample.xml`)
3. Click "Format Content" button - verify XML is properly formatted
4. Enter XPath query in middle panel: `//name/text()`
5. Verify the three-panel layout remains responsive
6. Test file upload with .xml files

### UI Component Validation
- **Three-panel layout**: Content, Query, Result panels must be visible and properly sized
- **Navbar**: Logo, content type selector, theme toggle, GitHub link
- **Content panel**: Upload, Clear, Format buttons with proper enable/disable states
- **Syntax highlighting**: JSON (blue strings, orange keys) and XML (colored tags)
- **Theme switching**: Light mode (white background) and dark mode (dark background)

## Troubleshooting & Common Issues

### Dependency Issues
- **Problem**: `npm install` fails with "No matching version found"
- **Solution**: Update package.json versions as documented above, then run `npm install`

### Jest Configuration Issues  
- **Problem**: Jest fails with "ts-node required" or "jest-environment-jsdom cannot be found"
- **Solution**: Install missing dependencies:
  ```bash
  npm install --save-dev ts-node jest-environment-jsdom
  ```

### Build Performance
- **Bundle size warning**: Expected due to Ace Editor (~300KB) and Bootstrap dependencies
- **Build time**: Should complete in under 10 seconds; if slower, check for file watching conflicts

## Project Architecture

### Key Directories
```
├── src/
│   ├── components/
│   │   ├── content/       # ContentPanel.tsx - file upload, format, clear
│   │   ├── query/         # Query editor with validation
│   │   ├── result/        # Read-only result viewer  
│   │   ├── layout/        # Main layout orchestration
│   │   └── navbar/        # Navigation with theme toggle
│   ├── model/             # TypeScript interfaces and types
│   ├── services/          # Business logic (validation, formatting, queries)
│   └── styles/            # Shared CSS and styling helpers
├── test/                  # Jest configuration and setup
├── test-data/             # Sample JSON/XML files for testing
└── public/                # Static assets
```

### Key Files
- **`src/main.tsx`**: Application entry point
- **`src/App.tsx`**: Main application component with state management
- **`package.json`**: Dependencies and scripts
- **`vite.config.ts`**: Vite build configuration  
- **`jest.config.ts`**: Test configuration
- **`tsconfig.json`**: TypeScript configuration

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Bootstrap 5, React Bootstrap, custom CSS
- **Editors**: Ace Editor with JSON/XML modes and themes
- **Query Libraries**: JSONPath for JSON, XPath with xmldom for XML
- **Icons**: Font Awesome
- **Testing**: Jest with jsdom environment (configured but no tests)

## Development Best Practices

### Before Making Changes
1. **Always run linting**: `npm run lint` 
2. **Test build**: `npm run build`
3. **Manual validation**: Run through at least one complete user scenario

### Code Style
- **ESLint**: Configure maximum 0 warnings (`--max-warnings 0`)
- **TypeScript**: Strict mode enabled with no unused locals/parameters
- **React**: Uses hooks and functional components exclusively

### Performance Considerations
- **Bundle size**: Current size (~915KB) is acceptable for the feature set
- **Lazy loading**: Not currently implemented but could be added for optimization
- **Editor performance**: Ace Editor handles large documents efficiently

## Frequently Referenced Commands

```bash
# Quick development cycle
npm run dev                    # Start development (200ms)
npm run lint                   # Check code quality (6s) 
npm run build                  # Production build (6s)

# Dependency management  
npm install                    # Install all dependencies (20-30s)
npm audit                      # Check for vulnerabilities

# Testing (when tests exist)
npm run test                   # Run Jest tests (currently no tests)
npm run test -- --watch       # Watch mode for test development
```

## Repository Status
- **Build status**: ✅ Working (6 second builds)
- **Dependencies**: ✅ Resolved (with version fixes)
- **Runtime**: ✅ Fully functional application
- **Test coverage**: ❌ No tests currently exist
- **Documentation**: ✅ Comprehensive README and this guide

**Always validate your changes by building (`npm run build`) and manually testing the application (`npm run dev`) before committing.**