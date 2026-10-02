# Chaosdev — Light Studio

A light-first portfolio for a fullstack and Web3 developer, built with Next.js, React, ThreeUI Community and GSAP. The original Evil Eye background is preserved with light and dark palettes. The hero uses the approved portrait as a transparent image cutout, with a restrained halo and ambient motion. Includes scroll reveals, persisted theme preference, a global animation pause control and accessible email copying.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run lint
npm run build
npm start
```

The app uses the Next.js App Router and is ready for zero-config deployment on Vercel. Import the repository in Vercel or run `vercel` from this directory.

## Content to personalize

Project data and contact links live in `components/data/index.ts`. The current page, copy and small presentation components live in `app/page.tsx`. Base styles live in `app/globals.css`; the CHAOS visual direction is in `app/cinematic.css`.

The hero asset is `public/chaos-avatar-cutout.png`, a background-removed version of the approved `public/chaos-avatar-3d.png`. The original remains `public/chaos-avatar.jpg`. This is an image, not an interactive 3D model. The rejected mesh prototype is retained as unused source and is not imported or downloaded by the page. Project illustrations are labeled interface concepts, not product screenshots. Replace them with verified screenshots when available.

The earlier `components/sections` are retained. EvilEye is actively mounted. Theme preference uses the `chaos-theme` localStorage key (`light` / `dark`). Reduced-motion preferences and the pause control stop ambient movement.

## Design sources

Actual ThreeUI integration: `BrandOrbs` in the technology strip and `RibbonFieldBackground` in Contact, imported through component subpaths from the official MIT Community package. FeralUI, Book of Shapes and MotionSites informed the interaction and editorial direction; the SVG pattern and page layout are original implementations. No paid templates are bundled.

See `ATTRIBUTIONS.md` and the public `/credits` page for asset attribution.

## Portrait depth experiment

Visit `/lab3d` for an isolated portrait relief experiment. Drag to orbit within ±30°, compare the portrait/clay/wireframe modes, adjust depth, or export the textured mesh as GLB. The portfolio homepage is unchanged. Rendering is event-driven with no idle animation loop.

This is a single-view relief, not a complete character reconstruction. `public/chaos-avatar-depth.png` is a synthetic depth estimate created with the built-in imagegen tool; it contains shading inaccuracies and is not a measured depth map. Missing edge samples are repaired and mesh heights smoothed before triangulation. Source texture remains `public/chaos-avatar-cutout.png`. A default exported mesh is saved at `public/models/chaos-portrait-relief.glb`. There is no back surface, rig, or inferred hidden anatomy.

Prompt used for the depth asset: “Create a smooth grayscale camera-space DEPTH MAP of the provided exact portrait for displacement meshing. Preserve exact original 1122:1402 aspect ratio, pixel registration, silhouette, pose, face position, hair and garment positions. All transparent background becomes solid BLACK. This is data not a lit illustration: intensity represents distance toward camera ONLY, near=bright, far=dark. NO lighting, NO cast shadows, NO color, NO metallic highlights, NO texture, NO cyan light strips, NO contours, NO text. Smooth low-frequency rounded geometry. Foreground face nose tip brightest near 240, cheeks/forehead ~185-210, ears ~130, rear hair ~105, front dreadlocks ~175-195, neck ~140, front coat lapels ~170, outer shoulders ~110, torso ~140. Eye sockets gently recessed but eyes not painted black, eyebrows no color detail. Dreadlocks smooth rounded tubes in depth, no shiny stripes. Exact aligned portrait as input, no reframe, no crop, no new geometry, grayscale depth only.”

Geometry and material reference: [Three.js PlaneGeometry](https://threejs.org/docs/pages/PlaneGeometry.html) and [MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html).
