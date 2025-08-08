# Kosher Businesses – React + TypeScript + Vite

A single-page app that lists kosher businesses (Hebrew, RTL). Users can filter by city, provider, category (Dairy/Meat/Parve), and search by name/address. Data is loaded from a static CSV in `public/`.

## Features

- Full Hebrew UI with RTL layout
- Tailwind CSS card-based design
- Filters:
  - City
  - Kosher provider (derived from CSV filename)
  - Category: Dairy / Meat / Parve / Parve-Dairy (derived from activity)
  - Free-text search (name, address)
- Responsive (mobile and desktop)

## Getting Started

1. Install dependencies

```bash
npm i
npm i -D tailwindcss postcss autoprefixer
npm i -E csv-parse lucide-react
```

2. Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173`.

## Data Format

- CSV path: `public/kosher-list-landa-filtered.csv`
- Supported columns (Hebrew headers): `שם עסק, כתובת, עיר, סוג, פעילות עסק`
- Provider: inferred from the filename (e.g., `kosher-list-landa-filtered.csv` → "לנדא")

## Key Files

- Main component: `src/components/KosherBusinessApp.tsx`
- Types: `src/types/business.ts`
- CSV service: `src/services/csvService.ts`
- Hooks:
  - `src/hooks/useBusinesses.ts`
  - `src/hooks/useFilters.ts`
- Utilities:
  - `src/utils/providerDisplay.ts` – filename → provider display name
  - `src/utils/kosherCategory.ts` – derive category from activity
  - `src/utils/activityColor.ts` – activity tag colors

## Tailwind CSS

- Entry CSS: `src/index.css` (includes `@tailwind base/components/utilities`)
- Config files at project root:
  - `tailwind.config.js`
  - `postcss.config.js`

If you see "Unknown at rule @tailwind", install Tailwind/PostCSS deps and restart the dev server.

## Build

```bash
npm run build
npm run preview
```

## License

Use freely within this project.
