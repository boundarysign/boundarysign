# Boundary Sign

This is a Vite + React + TypeScript application. It is **not** a plain static HTML site, so the VS Code "Live Server" extension cannot run the source files directly (it can't compile `.tsx`/TypeScript).

## Run the app (recommended)

1. Install Node.js 18+ (https://nodejs.org).
2. In the `boundarysign` folder, install dependencies:

   ```sh
   npm install
   ```

3. Start the dev server:

   ```sh
   npm run dev
   ```

   Then open the URL printed in the terminal (default http://localhost:8080).

## Host with VS Code Live Server (no Node needed)

A pre-built static copy of the site is included in the `static-site/` folder. Open that folder in VS Code and click "Go Live" — Live Server can serve it as-is.

To regenerate it after editing the source:

```sh
npm run build
rm -rf static-site && cp -R dist static-site
```

## Build for production

```sh
npm run build
npm run preview
```

The production build is emitted to `dist/` and can be served by any static host.

