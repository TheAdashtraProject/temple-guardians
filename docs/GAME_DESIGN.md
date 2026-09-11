# Game design — playable prototype 0.2

## Intent

A simple but tactically interesting landscape-friendly Hindu-themed tower defence game, primarily for an Indian audience. Illustrated Indian storybook art, English controls, selected meaningful Sanskrit names. All seven shrines and all core systems must be available together; reduce map count rather than shrine count.

## Battle loop

Select a numbered plot, establish a shrine, inspect the next wave and start it. Earn offerings for defeated enemies and wave completion. Spend on new shrines or three linear favour levels: Established, Honoured and Exalted. Multiple shrines to one deity are allowed. Each shrine owns its favour. Selling returns floor(85% of all offerings spent). Offerings reset each battle. Pause permits construction and upgrades.

The temple begins with 20 shield. Most foes remove 1–2 shield; a boss removes 8. At zero shield the battle ends, leaving murtis intact. Complete eight waves to restore that temple. The prototype contains five freely selectable chapters; victory adds restoration lights and a saved campaign record. The best remaining shield is saved for each temple.

## Definitive numeric content

`dist/data.js` is the single source of truth for prices, ranges, damage, attack intervals, upgrades, map paths, building plots and wave definitions. `dist/engine.js` defines the exact runtime effects. These are initial tuning values, not final balance.

Agni: area damage; level two and three leave burning ground. Varuna: slow and wet marking; third level affects additional foes. Vayu: rapid damage and bounded pushback; bonus damage to flying foes. Indra: armour-piercing lightning; wet targets take 25% extra first-hit damage and gain additional lightning jumps. Prithvi: repeated roots; third level binds additional foes. Saraswati: modest musical damage, a second-target echo at level three, passive reveal and nearby attack-speed support, rising 16% per favour level. Durga: holds up to one/two/three grounded visible foes and attacks.

One divine protection per enemy. It blocks its patron's damage and harmful effects, including intervention and reveal. Ordinary armour is separate. Every shrine skips its protected targets. Protected enemies are marked by the deity's name. Hidden enemies require Saraswati's reveal before direct attacks and hostile interventions can affect them. Flying enemies evade Durga's blocking mechanic.

## Combinations

- Varuna's wet status lasts four seconds and enables stronger Indra chains.
- Prithvi keeps foes in Agni's burning ground.
- Vayu pushes foes back towards Durga's blocking zone.
- Saraswati reveals hidden foes and increases nearby shrine attack speed; multiple Saraswati bonuses do not stack, only the strongest applies.

## Intervention

Defeats add three meter points (bosses add twenty); completed waves add twelve. Maximum 100. Spend the whole meter on one established shrine's power during combat. No per-deity cooldown bars. Powers respect divine protection and visibility rules. Saraswati instead provides eight seconds of reveal and global support. Interventions target eligible enemies automatically in this prototype to avoid an extra touch targeting mode.

## Bosses

- Vajraketu: only takes one-quarter damage while moving; roots or guardians remove this benefit.
- Dharan: Varuna-protected yaksha with heavy armour; fire and lightning bypass armour.
- Mayadhara: Indra hits create two veiled pisacha copies, at most once every four seconds.
- Nishachara: alternates visible/hidden every five seconds; Saraswati can reveal him.

- Rudhiraksha: cycles Agni/Varuna/Indra protection every eight seconds.

All boss waves are announced in advance, including their boon and protective allegiance. The families are gameplay categories, not a theological power ranking.

## Saving

Battle and progression are stored locally on the device/browser, every three seconds and on user actions. Backgrounding pauses combat. A resumed active battle opens paused. A different device does not share saves. Clearing browser storage removes progress. No user account is required by game code; the private preview host separately requires its owner's access.

## Connected journey and rewards

Mira, a temple keeper, follows the river upriver: Banyan Grove → Lotus Crossing → Temple Town → Mountain Steps → First Spring. Each chapter introduces the next through short opening and victory scenes. Saving temples restores visual details and brings their communities back. All chapters remain available for prototype testing.

Offerings are the only spendable currency. Favour is the individual shrine’s level, purchased with offerings. There is no passive mining or additional persistent economy. A battle is the complete eight-wave defence of one temple; a wave is one group arriving during that battle.

Once every foe in the current wave has spawned, the next wave may be called early if fewer than two waves are active. The bonus is 20 plus three times the sum of remaining enemy health fractions, rounded down and capped at 40 additional offerings. Each wave still pays its completion bonus exactly once. Existing foes continue to attack.

Three lamps per temple reward victory, an intact shield, and a chapter-specific challenge. Earned lamps persist across attempts. Lighting all three unlocks optional cosmetic festival decorations. Challenges are: use at most four different deities; call two waves early; finish with three Exalted shrines; use no intervention; establish all seven deities. Used-deity history includes sold shrines.

Speed cycles 1×, 2× and 5×. Enemy introductions and other dialogs pause battle time. Spell animations retain readable real-time duration at higher speeds. Old completed temples migrate to their corresponding chapters; an unfinished v1 battle restarts because maps and wave bookkeeping have changed.
