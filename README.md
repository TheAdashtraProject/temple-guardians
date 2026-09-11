# Temple Guardians

An illustrated Hindu mythological tower defence game. Follow Mira, a temple keeper, upriver through five regions and fifteen encounters to break Rudhiraksha’s hold on the First Spring.

## Play and develop

Serve `dist/` with any static web server. No package dependencies, API keys or backend are required. `npm start` uses Python 3; `npm test` runs the Node.js combat and campaign tests. Source is public; the current Sites preview remains private to its owner.

## The seven shrines

- **Agni:** prolonged fire; prioritises enemies that are not already burning.
- **Indra:** chain lightning, strengthened by wet targets.
- **Vayu:** heavy immediate damage, particularly effective against flying foes.
- **Varuna:** light damage, a backward wash with shared per-foe resistance, and Wet synergy with Indra.
- **Prithvi:** boulders damage enemies along a line; upgrades crack armour.
- **Saraswati:** reveals hidden foes and accelerates nearby shrines. No attack.
- **Durga:** manually select a foe for a powerful strike anywhere on the route. Long recharge; no automatic blocking.

Three favour levels increase output and reach, with deity-specific final enhancements. Offerings are the only spendable currency. Rebuilding returns 85% of the investment.

## Active play and campaign

- Fifteen encounters across grove, crossing, town, mountain and spring settings; six to eight waves each.
- Mythological enemy introductions, regional commanders with boons, and a persistent enemy guide.
- Easy, Normal and Difficult settings affect health, starting offerings, rewards, speed and, on Difficult, wave composition.
- Three selectable battle blessings: extra starting offerings, greater shrine reach, or faster intervention charge.
- A local action in each region: temple bell, river sluice, courtyard gate, stone ledge or spring water.
- Optional lamp-bearer escorts earn offerings if protected; failure costs the bonus, not the battle.
- Manual Durga strikes; First, Strongest or Groups priorities for applicable automatic shrines.
- A shared meter with seven distinct interventions, including targeted wind blasts and temporary earthen barriers.
- Early-wave calling for extra offerings, with at most two waves overlapping.
- A right-hand shrine panel on desktop; responsive controls on mobile; 1×/2×/5× speeds and pause.
- Enemy inspection shows health, current effects, boon and “Protected by…”; overhead protection uses a shield emblem.
- Defeat each regional commander to restore the temple. Achievement lamps accumulate across attempts and unlock cosmetic festival decoration.
- Restoring all five temples opens **The unending vigil**, escalating survival waves with a choice of aid every five waves.

## Saves and project structure

Progress and active battles save on this browser. Earlier completed temples and earned lamps remain available; unfinished battles from previous combat versions restart. No account or cloud save is built into the game. Local storage removal clears progress.

`dist/engine.js` owns combat; `dist/data.js` owns numeric content; `dist/journey-content.js` holds scenes, blessings, difficulty and regional actions; `dist/campaign.js` owns progress; `dist/renderer.js` draws the battlefield; `dist/app.js` connects the controls. Original illustrated WebP assets live in `dist/assets/`.

## Validation and limitations

Nineteen automated checks cover roles, immunity, manual targeting, timed effects, temporary barriers, rewards, difficulty, saves, survival and finite-budget victories in all fifteen encounters. These checks establish mechanical behaviour, not enjoyable balance or visual quality. This update has not been interactively playtested in a browser or on a phone.

This remains a browser prototype. App packaging, purchases, packaged offline launch, full character animation and recorded music are not implemented. Sound uses optional synthesised cues. Deity iconography needs review before a commercial release. The powers, allegiances, boons and story are fictional game interpretations, not scriptural claims.

No open-source licence has been selected.
