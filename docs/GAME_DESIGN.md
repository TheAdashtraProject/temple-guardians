# Game design — prototype 0.3

## Intent and setting

A Hindu mythological tower defence game with Indian storybook art, English controls and seven distinct shrines. Mira follows the river through the Banyan Grove, Lotus Crossing, Temple Town, Mountain Steps and First Spring. Pisachas, rakshasas, oath-bound yakshas and asura soldiers serve different battlefield roles. Their allegiances and the invented commanders’ boons are fictional.

Each region has three encounters: secure the approach, protect the community’s passage, then overcome the commander. Scenes feature lamps, offerings, processions, temple keepers, boons and divine protections. Victory restores the community’s sacred space. All encounters are selectable for prototype testing.

## Core rules

Place shrines on fixed plots. Offerings pay for construction and linear favour upgrades: Established, Honoured, Exalted. Favour belongs to the shrine and is not a second currency. Multiple shrines to one deity are allowed. Rebuilding refunds floor(85% of investment). New encounters reset the battlefield economy.

Six, seven and eight waves form the three regional encounters. Ordinary enemies reaching the sanctuary remove shield. A commander reaching it breaks the shield completely; commander encounters require defeating that foe. Pause permits building, upgrades and targeting. Speeds cycle 1×, 2× and 5×.

`dist/data.js` and `dist/engine.js` are the definitive numeric rules. Values are provisional balance settings.

## Shrine roles

Agni applies lasting non-stacking burns, prioritising fresh targets; Exalted burning defeats spread fire. Indra chains through groups, gaining conduction from Varuna’s wet marking. Vayu deals large immediate hits and extra flying damage, without routine pushback. Varuna hits broad crowds; every fourth attack surges, becoming every third at Exalted. Prithvi rolls boulders through enemies aligned with the target and cracks armour from Honoured onwards. Saraswati reveals and accelerates nearby shrines; strongest support applies, never stacking. Durga strikes only when the player chooses an eligible enemy and recharges over 24/21/18 combat seconds by level.

Every upgrade improves reach or output as appropriate. Durga already reaches the whole route. Saraswati’s reach grows more strongly than that of damage shrines. Applicable automatic shrines support First, Strongest and Groups targeting. Agni automatically prioritises unburnt targets.

## Protection and boons

Divine protection blocks that deity’s damage and harmful effects. Already-applied Agni burns cannot harm an enemy while its changing protection is Agni. Hidden foes require revelation before ordinary targeting. An already-applied burn continues out of range and through concealment.

Vajraketu marches for seven seconds with reduced incoming damage, then pauses vulnerably for three; he always resumes. Dharan combines Varuna’s protection and heavy armour. Mayadhara creates veiled copies when struck by Indra, at most once every four seconds. Nishachara alternates concealment every five seconds. Rudhiraksha cycles Agni, Varuna and Indra protection every eight seconds.

## Interventions

A shared 100-point meter funds one intervention. Agni ignites eligible foes for twelve seconds; Indra storms for six seconds; Vayu strikes around a selected path point; Varuna floods the battlefield and pushes foes back once; Prithvi raises a five-second barrier which shatters; Saraswati reveals globally and doubles base attack/recharge speed for eight seconds; Durga readies a double-strength manual strike. Bosses resist flood displacement and can be held by a barrier for only a short interval, followed by temporary barrier immunity.

## Active map decisions

Each region has one action, normally recharging in 45 combat seconds: bell revelation plus meter, a local sluice pushback, temporary courtyard gate, rockfall and armour cracking, or spring healing plus wet marking. The spring has three uses per battle. Optional bearers travel against the enemy flow; nearby foes reduce their resolve. Reaching safety awards 100 offerings and intervention charge. Failure means retreat without the bonus. If all foes are defeated while the escort is travelling, its remaining passage is safe.

Early calls are available once the current wave’s queue is empty, while enemies remain and fewer than two waves overlap. Each wave pays its own completion reward once. Survival pauses for aid every five waves and prohibits an early call across those checkpoints.

## Progression

Only commander victories restore temples. Three lamps reward victory, no shield damage during that attempt, and a region-specific challenge; lamps accumulate across attempts. All three unlock optional cosmetic festival decorations. Encounter wins save independently. A selectable blessing lasts one battle: +80 starting offerings, +15% reach or +25% intervention charge. No permanent statistical grind is added.

Easy, Normal and Difficult change health, starting offerings, speed and enemy payouts. Difficult also changes wave composition. Completing the five temples unlocks The unending vigil. Enemy health escalates after each eight-wave cycle; every five waves the player chooses offerings, shield repair or a full intervention meter.

## Save compatibility

The journey retains its v2 key and migrates older temple completions. New active battles use a v3 key because combat and map state changed. Previous unfinished battles restart; completed temples and earned lamps remain. Saves are browser-local and active battles resume paused.
