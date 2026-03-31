# AGENTS.md - El Hambre Nuestra

## Project Overview

A vanilla JavaScript web application for managing favorite restaurants. Uses Supabase for authentication and database. Built with Vite for environment variable support.

## Build & Development Commands

### Running the App
```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

Variables must have prefix `VITE_` to be accessible in browser:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### No Tests
No test framework is currently set up. If adding tests, use Vitest or Jest.

## Code Style Guidelines

### General Conventions
- **Language**: Spanish for UI-facing code (variable names, UI text)
- **Naming**: camelCase for variables/functions, PascalCase for constructors
- **Scope**: Avoid global pollution - use IIFE for initialization scripts
- **Async**: Use `async`/`await` for all Supabase operations

### File Structure
```
js/
  config.js   - Supabase initialization (IIFE)
  auth.js     - Authentication functions
  db.js       - Database CRUD operations
  app.js      - UI rendering and state management
css/
  styles.css  - All styles
index.html    - Entry point
.env          - Environment variables (NOT committed)
.env.example  - Template for environment variables
```

### Imports & Dependencies
- Supabase loaded from CDN: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
- Google Fonts: Playfair Display, DM Sans
- All scripts loaded in order: config.js → db.js → auth.js → app.js

### Error Handling
```javascript
// Always wrap async operations in try/catch
async function someOperation() {
  try {
    const { data, error } = await window.supabaseClient.from('table').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Operation failed:', err);
    throw err; // Re-throw for caller to handle
  }
}
```

### Database Functions (db.js)
- Always check `error` after Supabase operations
- Return empty array `[]` for select errors: `return data || []`
- Use `.select()` with joins for related data: `.select('*, zonas(nombre, color)')`

### Authentication (auth.js)
- Store current user in `currentUser` global variable
- Use optional chaining for session: `session?.user || null`
- Initialize auth listener before checking current user

### UI Rendering (app.js)
- Use template literals for HTML generation
- Use event delegation where possible
- Always call `loadData()` after mutations to refresh state
- Use `document.getElementById()` for single elements, `querySelectorAll()` for lists

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase (Spanish ok) | `restaurantes`, `currentFilter` |
| Functions | camelCase | `renderApp()`, `toggleVisita()` |
| Database tables | snake_case | `zonas`, `visitas`, `restaurantes` |
| Database columns | snake_case | `zona_id`, `user_id`, `restaurante_id` |
| Boolean fields | Spanish adjectives | `niños` (for kids-friendly) |

### Common Patterns

#### Modal Creation
```javascript
function showSomeModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `...html content...`;
  document.body.appendChild(overlay);
  // Clean up with: overlay.remove()
}
```

#### Filter/Search State
```javascript
let currentFilter = 'all';
let searchQuery = '';

function matchesFilter(r) { /* return boolean */ }
function matchesSearch(r) { /* return boolean */ }
function renderRestaurants() {
  const filtered = restaurantes.filter(r => matchesFilter(r) && matchesSearch(r));
  // render filtered list
}
```

#### Form Handling
```javascript
// Get values
const value = element.value.trim();
// Validate
if (!value) {
  alert('Please complete all fields');
  return;
}
// Disable button during async operation
btn.disabled = true;
btn.textContent = 'Processing...';
try {
  await someAsyncAction();
} finally {
  btn.disabled = false;
}
```

### Things to Avoid
- **Don't** use `var` - use `const`/`let`
- **Don't** use jQuery or other frameworks
- **Don't** commit `.env` - it's in .gitignore
- **Don't** open index.html directly in browser - use `npm run dev`
- **Don't** forget to handle errors in async functions
- **Don't** use `alert()` in production - consider toast notifications

### Supabase Client
- Client is stored at `window.supabaseClient`
- Always check if loaded before using: `if (window.supabaseClient) return;`
- Config loads from environment variables via `import.meta.env`

## Database Schema

### zonas
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| nombre | text | Zone name |
| color | text | Hex color code |

### restaurantes
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| nombre | text | Restaurant name |
| location | text | Address/location |
| zona_id | int | FK to zonas |
| tipo | text | Cuisine type |
| niños | boolean | Kid-friendly |

### visitas
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| user_id | uuid | FK to auth.users |
| restaurante_id | int | FK to restaurantes |
| created_at | timestamp | Visit date |

## Common Tasks

### Adding a New Feature
1. Determine if it needs DB changes (modify db.js)
2. Add UI rendering in app.js
3. Add event handlers in appropriate render function

### Running a Single Test
No test framework configured. To add tests:
```bash
npm install -D vitest
npx vitest run --single-run
```

### Adding a New Table
1. Create table in Supabase dashboard
2. Add CRUD functions in db.js following existing pattern
3. Add to loadData() in app.js if needed
4. Add render function in app.js if visible in UI

### GitHub Pages Deployment
1. Set environment variables in GitHub repository settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Configure GitHub Actions to run `npm run build`
3. Deploy the `dist` folder to GitHub Pages