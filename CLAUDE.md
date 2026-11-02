# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expense Tracker is a React-based financial management application. Per the README, this starter project **intentionally has a bug, poor UI, and messy code** — all of which are addressed throughout the [Claude Code course](https://codewithmosh.com/p/claude-code).

## Commands

```bash
npm run dev       # Start dev server (Vite) at http://localhost:5173
npm run build     # Build for production to dist/
npm run lint      # Run ESLint on all files (eslint.config.js)
npm run preview   # Preview production build locally
npm install       # Install dependencies
```

## Tech Stack

- React 19 (`react`, `react-dom`) with `@vitejs/plugin-react`
- Vite 7 (dev server and bundler)
- ESLint 9 flat config with `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- No routing, no state library, no UI library, no test framework, no backend

## Project Structure

```
index.html              # Vite entry; loads /src/main.jsx
src/
  main.jsx              # Mounts <App /> into #root inside StrictMode; imports index.css
  App.jsx               # Root component; owns the transactions state; imports App.css
  Summary.jsx           # Income / expenses / balance cards
  TransactionForm.jsx   # "Add Transaction" form
  TransactionList.jsx   # Filterable transactions table
  constants.js          # CATEGORIES array
  App.css, index.css    # Global stylesheets (plain CSS, not CSS modules)
  assets/               # Static assets (react.svg)
```

## Architecture

### Component Structure
The app uses component composition with clear separation of concerns:

- **App.jsx** — Root component. Owns the transactions array (seeded with sample data) and the `handleAddTransaction` handler. Renders the header, `Summary`, `TransactionForm`, and `TransactionList`.
- **Summary.jsx** — Displays financial summary (income, expenses, balance). Receives `transactions` as a prop and derives totals on every render; holds no state.
- **TransactionForm.jsx** — Self-contained form component that manages its own state (description, amount, type, category). On submit it builds the transaction object and calls `onAddTransaction`, then resets its inputs.
- **TransactionList.jsx** — Displays the filtered transaction table. Receives `transactions` as a prop and manages its own filter state (filterType, filterCategory).
- **constants.js** — Centralized `CATEGORIES` array shared by the form and the list filter.

### Data Model
A transaction is a plain object:

```js
{
  id: Number,          // Seed data uses small ints; form uses Date.now()
  description: String,
  amount: Number,      // Always a number. The form converts with Number(amount)
  type: 'income' | 'expense',
  category: String,    // One of CATEGORIES
  date: String,        // 'YYYY-MM-DD'. Form uses new Date().toISOString().split('T')[0]
}
```

`CATEGORIES`: `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`.

### State Management
Uses React `useState` distributed across components:
- **App**: Transactions array only (single source of truth)
- **TransactionForm**: Form inputs (description, amount, type, category)
- **TransactionList**: Filter selections (filterType, filterCategory)
- **Summary**: None (pure calculation from transactions prop)

There is no shared state between the form and the list beyond the transactions array passed down from App. There are no context providers, reducers, or effects.

### Data Flow
1. User submits form → TransactionForm creates transaction object → calls `onAddTransaction(newTransaction)`
2. App receives transaction → appends it to transactions state
3. Summary recalculates totals from the new transactions prop on render
4. TransactionList displays transactions with user-selected filters applied locally (filters are derived during render, not stored)

Data flows down via props; events flow up via callbacks. Components never reach into each other's state.

## Architectural Changes

### Refactor: monolithic App → composed components (commit `3da070b`)
Before this refactor, `App.jsx` held everything: the transactions array, the form inputs, the filter selections, the totals calculation, the form JSX, and the table JSX, all in one component.

What changed:
- **Split into components.** Summary, TransactionForm, and TransactionList were extracted into their own files. App now only composes them.
- **State moved down to its owner.** Form inputs moved into TransactionForm and filter selections moved into TransactionList. Only the transactions array remains in App, so unrelated state no longer re-renders the whole tree.
- **Derived data computed locally.** Totals live in Summary and filtered rows live in TransactionList, both computed from the `transactions` prop rather than stored in state.
- **Categories extracted.** The category list was duplicated in the form and filter; it now lives in `constants.js`.
- **Callback contract.** TransactionForm reports new items through `onAddTransaction`. It does not know how App stores them.

### Earlier fix (commit `bf062b3`)
Amounts were stored as strings in seed data and form input, which made income and expense totals concatenate instead of add. Seed amounts and the form (`Number(amount)`) now produce numbers.

### Guidelines for future architectural changes
- Keep state in the lowest component that needs it. Lift state up only when two siblings must share it.
- Add new shared constants to `constants.js`, not inline in components.
- Derive values during render rather than storing them in state when they can be computed from `transactions`.
- Keep the `onAddTransaction` callback shape stable (it receives a complete transaction object) unless the change is intentional and updates both TransactionForm and App.

## Improvements Made
- ✅ Fixed amount calculation bug (amounts now stored as numbers, not strings)
- ✅ Component-based architecture with clear responsibilities
- ✅ Each component manages only its own state
- ✅ Categories centralized in `constants.js`
- ✅ Form and filters are encapsulated within their components

## Known Limitations
- No data persistence (state resets on page refresh)
- No transaction deletion/editing UI
- No form validation beyond emptiness check (negative or zero amounts are accepted)
- No undo/redo functionality
- `handleAddTransaction` in App.jsx uses `[...transactions, newTransaction]` rather than a functional state update, so it can read a stale array if called rapidly
- Seed data contains a mismatch: "Freelance Work" is typed `expense` with category `salary`
- Summary and TransactionList display amounts as raw numbers (e.g. `$5000`) with no currency or decimal formatting

## Development Notes

- The app uses Vite's Fast Refresh for automatic reloading during development
- ESLint is configured with React-specific rules (react-hooks, react-refresh plugins)
- `index.html` is the Vite entry point. It loads `src/main.jsx`, which mounts `<App />` into the `#root` div
- Styling is plain global CSS: `App.css` is imported in App.jsx and `index.css` in main.jsx. Components do not import their own stylesheets, and CSS modules are not used
