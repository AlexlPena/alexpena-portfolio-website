# Alex Pena — Business Edition

A business-focused portfolio for Alex Pena’s AI automation, integration and training services. Off-white, graphite and deep-blue visual identity; original animated cube in a coordinated silver-blue finish. Independent from the saved Pastel Edition.

## Run

```sh
npm ci
npm run dev -- --port 5176
```

## Build and preview

```sh
npm run build
npm run preview -- --port 4175
```

Both `/` and `/home` render the site. Requires Node.js 22.12 or newer. Contact links address alex@alexpena.dev. All workflow and review demos are local simulations; no messages are sent and no business tools are connected.

Main files: src/App.jsx, src/Studio.jsx, src/Closing.jsx, src/business.css and src/pastel-cube.js (retained filename, now configured with the business palette). The original Spline geometry and animation are preserved. Fonts and assets are local. Spline is lazy-loaded; its build-size advisory remains.

## Deploy with Vercel

Import this GitHub repository into Vercel. Use the repository root, the Vite framework preset, `npm run build`, and output directory `dist`. Use Node.js 22.x. No environment variables are required.

`vercel.json` configures the build and `/home` rewrite. Set `main` as the production branch. After connecting the Git integration, pushes to `main` trigger production deployments and other branches receive preview deployments.

## Make changes

```sh
npm ci
npm run dev
npm run build
git add .
git commit -m "Describe the change"
git push
```

## Illustration credits

User Flow, Data Extraction, and Webinar (Amico) by [Storyset](https://storyset.com/), recolored to match the business theme. Keep the linked website footer attribution. Source links and license notes are in `public/assets/storyset/README.md`.

## First-load rendering

The production build prerenders the complete page into `dist/index.html`; React hydrates that HTML for interactive behavior. The hero remains visible on first paint, and a local cube poster stays visible until the deferred 3D scene is ready. If WebGL fails, the poster remains. Development mode uses the standard Vite client render; use `npm run build` and `npm run preview` when checking first-load behavior.
