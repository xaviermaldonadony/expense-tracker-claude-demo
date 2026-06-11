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

### Component Structure
The app uses component composition with clear separation of concerns:

- **App.jsx** — Root component managing the transactions state and orchestrating child components
- **Summary.jsx** — Displays financial summary (income, expenses, balance). Calculates totals from transactions
- **TransactionForm.jsx** — Self-contained form component that manages its own state (description, amount, type, category). Calls `onAddTransaction` callback when submitting
- **TransactionList.jsx** — Displays filtered transaction table. Manages its own filter state (filterType, filterCategory)
- **constants.js** — Centralized CATEGORIES array shared across form and list components

### State Management
Uses React `useState` distributed across components:
- **App**: Transactions array only
- **TransactionForm**: Form inputs (description, amount, type, category)
- **TransactionList**: Filter selections (filterType, filterCategory)
- **Summary**: None (pure calculation from transactions prop)

### Data Flow
1. User submits form → TransactionForm creates transaction object → calls `onAddTransaction(newTransaction)`
2. App receives transaction → updates transactions state
3. Summary automatically recalculates from new transactions array
4. TransactionList displays transactions with user-selected filters applied locally

### Improvements Made
- ✅ Fixed amount calculation bug (amounts now stored as numbers, not strings)
- ✅ Component-based architecture with clear responsibilities
- ✅ Each component manages only its own state
- ✅ Categories centralized in `constants.js`
- ✅ Form and filters are encapsulated within their components

### Known Limitations
- No data persistence (state resets on page refresh)
- No transaction deletion/editing UI
- No form validation beyond emptiness check
- No undo/redo functionality

## Development Notes

- The app uses Vite's Fast Refresh for automatic reloading during development
- ESLint is configured with React-specific rules (react-hooks, react-refresh plugins)
- `index.html` is the entry point; React mounts to `#root` div
- Styling uses CSS modules per file (App.css, index.css)
