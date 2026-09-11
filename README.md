# Temple Guardians

An illustrated Hindu-themed tower defence prototype. Play with seven divine shrines, three favour levels, divine protection, elemental combinations and a shared intervention meter.

## Play and develop

The browser game is in `dist/`. Serve that folder with any static web server. There are no package dependencies, API keys or backend services. `npm start` serves it using Python 3; `npm test` runs combat tests using Node.js 20 or newer. The Sites preview is hosted separately, so the repository can remain public without exposing account credentials.

The first implementation uses browser-native JavaScript modules and Canvas 2D. This keeps the remote build simple. Combat logic is isolated from rendering in `dist/engine.js`; definitions, prices, enemy values and waves live in `dist/data.js`. The earlier Phaser/TypeScript proposal was provisional; no Phaser dependency is included in this prototype.

## Included

- Agni, Varuna, Vayu, Indra, Prithvi, Saraswati and Durga, available from the outset.
- Three linear favour levels, placement, 85% rebuilding refund and shared offerings.
- Four enemy families, with swift, veiled, flying, armoured and protected variants.
- Five illustrated chapters connected by an upriver story; eight waves and a different boss in each.
- Water/lightning, earth/fire, wind/guardian and wisdom support combinations.
- A shared intervention meter with a different power for each deity.
- Touch and mouse placement, keyboard-accessible plot selector, pause and 1×/2×/5× speed.
- Browser-local battle resumption, migrating existing completed temples, restoration rewards and three achievement lamps per temple.
- Original generated Indian miniature-style maps, three illustrated shrine favour tiers, deity-specific spell effects and restoration details.
- First-appearance enemy introductions and a replayable enemy guide.
- Early wave calling for bonus offerings; at most two waves overlap.
- Saraswati deals modest sound damage while revealing and supporting.
- Earn all three lamps across replays to unlock cosmetic festival decorations.
- Optional synthesised sound cues. No audio recordings or music licences required by this implementation.

## Prototype boundaries

This is a browser prototype, not an App Store or Google Play release. All chapters are open for testing. Purchases, purchase restoration, platform signing, packaged offline launch, full walk cycles and recorded music are not implemented. Mobile feel and visual quality need hands-on device testing. Deity depictions need a dedicated iconographic review before release.

Game rules and enemy allegiances are fictional interpretations, not claims about scripture. See `docs/GAME_DESIGN.md`, `docs/ART_DIRECTION.md` and `docs/MOBILE_ROADMAP.md`.

## Checks

`npm test` exercises divine immunity, spending and upgrades, hidden-enemy detection, water effects, intervention costs, boss armour, save/resume including overlapping waves, defeat, a finite-budget victory on each map, all-seven damage, early rewards, speed equivalence, progress migration, lamps and enemy introductions. These simulations establish mechanical playability, not enjoyable difficulty or visual correctness.

No open-source licence has been selected for this project.
