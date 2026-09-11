# Readiness assessment · v0.7

Ready for another prototype playtest. Not an app-store release.

## Added in this version

- Vedastra studio branding; Temple Guardians remains the game title. Vedastra Limited is recorded as a planned, unincorporated company rather than an existing legal entity.
- Deep blue, saffron and sandstone interface, preserving deity-specific colours.
- Main menu with Continue, three campaigns, How to play and configurable Quick Battle.
- Three campaigns × 15 encounters = 45 story battles. Night of Lamps and The Seven Winds revisit the five illustrated landscapes with different routes, atmosphere, scenes and wave patterns. No claim of 45 new maps.
- Independent campaign progression; existing River progress retained.
- Quick Battle offers five settings, three difficulties and 4/8/12 waves. Seeded replay and saved configuration; no campaign reward writes.
- Menu return pauses an active battle. Continue, campaign selection, setup and Quick Battle victory handlers are exercised through the real application module in a small DOM adapter.

## Automated assessment

180 attempts: 45 campaign encounters plus 15 Quick Battle setting/length combinations, each on three difficulties. One predefined seven-shrine build strategy, finite offerings, manual Durga targeting, interventions, local actions, optional escorts and save/resume during wave three. Quick Battle uses seed 123 for reproducibility.

| Difficulty | Wins | Attempts | Stalls |
|---|---:|---:|---:|
| Easy | 60 | 60 | 0 |
| Normal | 60 | 60 | 0 |
| Difficult | 55 | 60 | 0 |

All 45 story encounters and all 15 tested Quick Battle setups completed on Easy and Normal. Difficult losses were Night of Lamps’ town commander, Seven Winds’ spring commander, and all three First Spring Quick Battle lengths. These are losses by one fixed strategy, not evidence that those stages are impossible.

An initial run exposed early difficulty spikes. Quick Battle now introduces basic foes before hidden/heavier enemies, Difficult-only opening-wave health is reduced for the new modes, and the short Quick Battle boss is scaled for a four-wave economy. Night of Lamps introduces a discrete mist bearer after ordinary hidden foes instead of filling entire groups with concealment sources. The River campaign’s combat balance is unchanged.

Records: `mode-results.json`. Reproduce with `node scripts/assess-modes.mjs`. The previous River-only three-strategy assessment remains in `stage-results.json`.

## Verification and limits

40 regression tests cover combat, deity protections, manual targeting, boons, role combinations, progress isolation, old-save compatibility, deterministic Quick Battle replay, campaign content and the menu/Quick Battle result handlers. Syntax checks cover all application modules.

The DOM adapter catches handler and Canvas-call errors; it does not render pixels or emulate a full browser. No interactive browser or phone playtest was performed in this pass. Visual quality, scrolling, touch accuracy, sound, performance and player enjoyment still need direct observation.

Simulations react at 0.1-second intervals and know where to build. Their success rates are not human win rates. Difficult needs player feedback and additional adaptive strategies; Easy/Normal may still be too forgiving for experienced players.

The new campaigns share backgrounds and recurring commander archetypes. They provide distinct tactical journeys, but bespoke artwork, more set-piece encounters and a less repetitive late campaign are useful future work. App packaging, purchases/restoration, offline launch, audio polish and release testing remain outside this prototype.

## Next player checks

Start each campaign from the new menu; return during a wave, refresh, and Continue. Try a short Quick Battle and inspect its result. Check phone-width menus and the desktop right-hand shrine controls. Then play a complete new campaign unaided and note where the story or repeated encounters lose momentum.
