# Temple Guardians · Vedastra

An illustrated Hindu mythical tower defence game from **Vedastra**. Seven divine shrines protect sacred spaces through three connected journeys.

## Play

The main menu offers **Continue**, three campaigns and **Quick Battle**:

- **The Bound River:** 15 encounters following Mira upriver, overcoming the alliance of Mahishasura, Raktabija and Vritra.
- **Night of Lamps:** 15 encounters carrying the true festival flame with Leela and Kapi. Hidden raiders, mist bearers and veiled commanders reward revelation and sustained damage.
- **The Seven Winds:** 15 encounters reopening the monsoon supply road with Dharan. Airborne raids alternate with armoured columns.
- **Quick Battle:** choose one of five settings, Easy/Normal/Difficult, and 4/8/12 waves. A fresh seeded enemy mix is generated on each start from the menu; Replay keeps the same mix. No campaign lamps or restoration rewards are awarded.

The campaigns reuse five illustrated landscapes with campaign-specific routes, atmosphere, waves and scenes. They are 45 encounters, not 45 newly illustrated maps. All stages are open for prototype testing. The interface uses deep blue, saffron and sandstone; shrine colours remain distinct.

## Seven shrines

- **Agni:** prolonged fire, prioritising foes not already burning.
- **Indra:** chain lightning, strengthened by Wet targets.
- **Vayu:** powerful immediate damage, particularly against flying foes.
- **Varuna:** light damage, backward wash with shared per-foe resistance, and Wet synergy.
- **Prithvi:** line-damage boulders; upgrades crack armour.
- **Saraswati:** reveals hidden foes and accelerates nearby shrines; no attack.
- **Durga:** manually targeted powerful strikes with a long recharge.

Offerings are the only spendable currency. Three favour levels raise each shrine’s output and reach. A shared intervention meter offers seven distinct powers. The river story also includes Kali’s temporary aid against Raktabija; there is no second layer of buildable temple gods.

## Active play and saves

Optional escorts, regional actions, target priorities, early-wave calls, manual Durga strikes and targeted interventions give the player decisions during combat. The desktop shrine panel sits on the right. Speed controls offer 1×, 2× and 5×, plus pause.

Each campaign keeps separate stage completions, lamps and festival decorations. Existing River progress remains in place. One active battle is saved in this browser, including campaign identity or Quick Battle seed and length. Returning to the main menu pauses it; Continue resumes it paused. Starting a different battle replaces that active battle after confirmation when play or construction has begun. Completed campaign progress remains saved.

Restoring all five River temples unlocks **The unending vigil**, an endless survival mode. No game account or cloud save is implemented. Clearing browser storage clears saves.

## Develop and validate

Serve `dist/` with any static web server. No package dependencies, API keys or backend are required.

- `npm start`: Python 3 static server.
- `npm run check`: JavaScript syntax checks.
- `npm test`: combat, progress, campaign, save and UI-handler regressions.
- `node scripts/assess-modes.mjs`: 180 automated attempts across three campaigns and Quick Battle setups, all three difficulties. Results in `docs/mode-results.json`.
- `node scripts/assess-campaign.mjs`: the earlier three-strategy River assessment.

`dist/engine.js` owns combat; `data.js` numeric content; `myths.js` mythic encounters; `campaign-content.js` campaign definitions, route variants and seeded waves; `campaign.js` progress; `experience.js` companion dialogue; `renderer.js` Canvas artwork; `app.js` the controls. Original illustrated WebP assets are in `dist/assets/`.

See [the readiness assessment](docs/READINESS-ASSESSMENT.md) for results and limits. Automated simulations and a DOM adapter do not establish browser rendering, phone usability or fun. This remains a browser prototype; app packaging, purchases, packaged offline launch, recorded music and complete character animation are not implemented. Deity iconography needs review before commercial release.

## Identity

- Public studio: **Vedastra**
- Game: **Temple Guardians**
- Planned company: **Vedastra Limited** — not yet incorporated, as reported by the owner. Availability has not been independently verified.

The source repository is public; the current Sites publication remains private to its owner. No open-source licence has been selected. The campaign alliances, motives and combat rules are original game interpretations, not a scriptural chronology.
