# Jasmine de Leon portfolio

Personal portfolio site for Jasmine de Leon (Electrical EIT, Transmission Lines, BC Hydro). Live at https://jasmine-deleon.github.io, served by GitHub Pages from the root of this repository's `main` branch. Anything pushed to `main` goes live within a minute or two.

## Files

- `index.html`: page shell, fonts, shared helpers (`window.U`) and all profile content in `window.P` (name, title, tagline, about, education, experience, projects, skills, hobbies, contact links). Most text edits happen here.
- `d41.js`: the one design in use ("Peace to Pacific"). Stop names and their facts are in the `STOPS` list at the top. The rest is the canvas scene, gauges, weather presets and layout CSS. Every CSS selector is prefixed `.bcprofile`; keep new ones prefixed too.
- `art/*.webp`: generated background panoramas (`pano-<region><variant>`), the dam, trees and clouds. The scene falls back to drawn shapes if an image is missing.
- `.nojekyll`: tells GitHub Pages to serve the files as they are.

There is no build step and no dependencies. Static files only.

## Making changes

1. Edit the files.
2. Run `node --check d41.js` after touching it.
3. If a browser is available, serve this folder with any static server and look at desktop width and a 375 px phone width. The scene must keep running with no console errors.
4. Describe the change to Jasmine and push to `main` only when she says to. Commit as `Jasmine de Leon <jasmine-deleon@users.noreply.github.com>`.

## Content rules

- Her title is "Electrical EIT" or "Engineer-in-Training", never "Electrical Engineer" (a protected title in BC).
- BC Hydro facts must come from public sources and be written in the site's own words. No BC Hydro logo or copied graphics. Keep the footer disclaimer ("Personal portfolio. Not a BC Hydro publication.") and the data credits.
- The load, temperature, sag and clearance numbers are an illustrative model. Keep them labelled that way.
- Never commit secrets (API keys, tokens) to this repository. It is public.
- Use plain, short copy. No lorem ipsum, and no invented facts about Jasmine.
