# Readiness assessment · v0.6

## Verdict

Ready for a small, supervised prototype playtest. Not ready for commercial release or an app-store submission. The campaign is mechanically traversable and the story now has a clear central crisis, but actual browser/phone usability, performance and player enjoyment remain unverified.

## Implemented

- Three named principal antagonists: Vritra binds the river, Mahishasura occupies the weakened settlements, Raktabija guards the ascent. Their pact and motives are explicitly an original game story.
- Former named commanders become Armoured General, Illusionist, Mist Stalker and Seal Bearer. Enemy introductions, previews, journal data, dialogue and chapter text use these roles.
- The drought is present from the opening grove. The alliance is discovered in the town rather than explained immediately.
- The temples shelter communities and maintain sacred protections. Seven shrines remain the only buildable combat system. No second layer of temple-deity powers or favour currency.
- Brahma’s boon, Vishnu’s devotional image at the crossing and the small Shiva shrine in the mountains are narrative references. Kali is explicitly temporary aid against Raktabija.
- Rescued mountain keepers guide the party to the spring and secure the water channel used by the existing regional action.

## Final automated stage assessment

15 encounters × 3 difficulties × 3 build strategies = 135 attempts. Strategies use finite offerings, seven shrine types in different orders, manual Durga targeting, Indra interventions, regional actions and optional escorts. Each attempt saves and resumes from a snapshot during the third wave. Decisions are automated at 0.1-second intervals; these are not human win-rate estimates or browser playthroughs.

| Difficulty | Completed | Attempts | Stalled |
|---|---:|---:|---:|
| Easy | 45 | 45 | 0 |
| Normal | 45 | 45 | 0 |
| Difficult | 39 | 45 | 0 |

Every encounter was completed by at least one tested strategy on every difficulty. The balanced strategy completed all 15 Difficult encounters. Remaining losses: heavy strategy at naga pools; heavy/control against the town Illusionist; heavy against Raktabija; heavy/control against Vritra. These are strategy-dependent losses, not proven impossible encounters.

The initial run found Dharan defeated all three strategies on Difficult, each reaching the sanctuary with substantial health. His Difficult-only health was reduced by 30%; all three strategies then completed that encounter. Easy and Normal scaling was unchanged.

Detailed records: `stage-results.json`. Reproduce with `node scripts/assess-campaign.mjs`. Regression suite: 35 checks covering combat, save/resume, target availability, encounter pacing, myth counters and consolidated story names.

## What the assessment does not establish

- Desktop/mobile rendering, touch selection, scrolling, post-victory controls, audio and animation have not been exercised in a browser in this pass. The supervised browser preview remains stopped, and this static project has no compatible development server. No alternative live-site browser route was used.
- The simulations react immediately and use predefined placement; Easy/Normal 100% completion does not establish their suitability for new players. Normal may still be too forgiving for experienced players.
- Fun, emotional payoff and repetition need feedback from people who have not helped design the game.
- Commercial readiness still requires phone testing, art/iconography review, audio polish, purchase implementation and restoration, mobile packaging and release testing.

## Recommended next gate

Ask a small group of fresh players to complete the grove and crossing unaided, then attempt a myth boss. Observe confusion and missed controls before explaining anything. Follow with one complete phone campaign and one desktop campaign, including refresh/resume, losing, replaying and returning from the restored battlefield. Resolve those findings before adding campaign length.
