# Maxwell — A field guide

An interactive visual explanation of Maxwell’s equations, built for [immediately.run](https://immediately.run).

**[Open the app →](https://immediately.run/present/github/neumark/maxwell-equations/main)**

## Explore

- **Gauss’s law:** reverse or remove a point charge and resize a Gaussian sphere. Its total electric flux depends on enclosed charge, not radius.
- **Gauss’s law for magnetism:** trace complete magnetic field loops through a bar magnet; inspect a closed surface around one pole.
- **Faraday’s law:** vary the rate of magnetic-flux change and see the induced electric circulation reverse or vanish.
- **Ampère–Maxwell law:** compare conduction current with changing electric flux in a capacitor gap.
- **Light:** pause a projected electromagnetic plane wave, toggle E and B, and change frequency while keeping propagation speed constant.

Each law includes differential and integral forms, plain-language explanations, and an application. The guide also includes a short wave-equation derivation, notation reference, and conceptual question with feedback.

## Run locally

Node.js 22.12+ (Node 24 recommended):

```sh
npm ci
npm run dev
```

```sh
npm test       # signs, superposition, inverse-square scaling, and wave propagation
npm run build # TypeScript checking and production build
npm run preview
```

Browser checks use Playwright: `npx playwright install chromium`, then `npm run test:ui`. To use an existing Chrome installation, set `CHROME_EXECUTABLE` to its executable path instead. The checks cover the controls, wave behavior, reduced motion, and layouts at 1440, 390, and 320 pixels.

Development dependency note: the registry currently reports an unpatched `picomatch` ReDoS advisory through Vite’s file-matching dependencies. These are development tools, not part of the browser app. Keep the development server on localhost and update the dependency when a patched release is available.

## immediately.run compatibility

The platform renders the default export in `src/App.tsx`. That file imports the application stylesheet directly. `src/main.tsx` and `index.html` are used for local Vite development only. The `immediately.run` entry in `package.json` declares this as an app; no SDK features, credentials, API keys, or privileged capabilities are needed.

The public repository is the app’s source. The presentation URL points to `main`; no separate hosting service is required. Google Fonts are optional visual enhancements, with local serif and sans-serif fallbacks.

## Physics and accessibility

Equations use SI units and microscopic electric and magnetic fields with total charge and current. Integral curl equations assume stationary loops and surfaces. Diagrams use relative units and are explicitly labeled as qualitative. The wave is an ideal source-free plane wave in vacuum, drawn with separately normalized E and B amplitudes. The point-charge diagram shows a cross section of a spherical Gaussian surface, not a two-dimensional electrostatic model.

The interface includes keyboard-operable tabs and controls, SVG descriptions, visible focus states, a skip link, and an animation pause button. Automatic wave animation respects the initial reduced-motion preference.

Physics references:

- [OpenStax, University Physics Volume 2, §16.1: Maxwell’s Equations and Electromagnetic Waves](https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves)
- [OpenStax, §16.2: Plane Electromagnetic Waves](https://openstax.org/books/university-physics-volume-2/pages/16-2-plane-electromagnetic-waves)

## Files

- `src/App.tsx` — explanations, interactive SVG diagrams, and controls
- `src/style.css` — responsive field-notebook design
- `src/physics.js` — small dimensionless field and wave models
- `tests/physics.test.mjs` — numerical and sign-convention checks

All diagrams are drawn in the application; no image assets are required.
