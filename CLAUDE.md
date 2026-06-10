# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expense Tracker is a React-based financial management application. Per the README, this starter project **intentionally has a bug, poor UI, and messy code** — all of which are addressed throughout the [Claude Code course](https://codewithmosh.com/p/claude-code).

## Commands

```bash
npm run dev       # Start dev server (Vite) at http://localhost:5173
npm run build     # Build for production to dist/
npm run lint      # Run ESLint on all files
npm run preview   # Preview production build locally
npm install       # Install dependencies
```

## Architecture

### Current Structure
- **Single-file monolithic design**: All application logic lives in `src/App.jsx`
- **State management**: Uses React `useState` hook exclusively for:
  - Transaction list (id, description, amount, type, category, date)
  - Form inputs (description, amount, type, category)
  - Filter selections (filterType, filterCategory)
- **Tech stack**: React 19 + Vite 7 with ESLint configuration

### Key Flows
1. **Transaction Display**: Renders transactions in a table with category and type-based filtering
2. **Summary Calculations**: Derives totalIncome, totalExpenses, and balance from transaction array in real-time
3. **Transaction Entry**: Form submission creates new transaction objects with Date.now() as ID and current date
4. **Filtering**: Applies chainable filters on type and category to `filteredTransactions`

### Known Limitations
- All logic centralized in single component (no separation of concerns)
- State updates mutate array by spreading (no transaction deletion/editing UI)
- Hard-coded category list in App.jsx
- No data persistence (state resets on refresh)
- Amounts stored as strings, not numbers (causes bugs in calculations)
- No form validation beyond emptiness check

## Development Notes

- The app uses Vite's Fast Refresh for automatic reloading during development
- ESLint is configured with React-specific rules (react-hooks, react-refresh plugins)
- `index.html` is the entry point; React mounts to `#root` div
- Styling uses CSS modules per file (App.css, index.css)
