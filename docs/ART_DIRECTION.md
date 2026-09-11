# Art direction

An animated Indian storybook painting, drawing on Pahari miniature art: flat perspective, fine confident outlines, vermilion, indigo, turmeric, leaf green and sandstone. Avoid Warcraft proportions, orc silhouettes, metallic fantasy UI and neon magic.

Deities remain dignified. Open-front shrines contain bronze murtis. Character humour belongs to enemies: expressive faces, moustaches, cloth, crowns and readable silhouettes. Shrine colours are reinforced by names and shapes. English interface; deity and enemy names preserve identity.

## Generated assets

The three principal original images were made with built-in image generation. They are project assets, not source photographs. Prompts:

1. Courtyard: landscape Pahari miniature, quiet pale sandstone ground, banyan forest framing the edges, small temple at far right, expansive empty central sandy ground, no paths, shrines, figures, text or UI. The engine draws functional paths and plots over the illustration.
2. Shrine atlas: transparent four-column/two-row grid. Top row Agni red fire, Varuna blue pool, Vayu teal open arches with flags, Indra indigo vajra. Bottom row Prithvi earth green, Saraswati ivory with veena, Durga crimson with lion; final cell empty. Seven open-front shrines with bronze murtis, consistent scale, Indian miniature style, no text or grid.
3. Enemy atlas: transparent two-by-two grid. Wiry pisacha, broad moustached rakshasa, dignified yaksha guardian and crowned asura commander. Right-facing full figures, Indian textiles, expressive painted faces, no orcs, text or UI.

Shrine source rectangles use a 4×2 atlas. Enemy bounds are explicit in `dist/renderer.js` because the painted figures slightly cross regular cell boundaries. Original alpha is preserved.

## Journey artwork

Four additional backgrounds depict a lotus river crossing, a temple town, mountain steps and the first spring. Each is a separate environment illustration; functional paths and plots are drawn in code. Honoured and Exalted atlases retain the seven-deity 4×2 layout and add garlands, lamps, richer architecture and divine presence.

The spell atlas uses four columns and two rows: fire, water, wind, lightning; earth, music, guardian slash and petals. The generated fire extends below the nominal half-height; the renderer crops spell rows at y=660. Restoration details contain lamps, lotuses, returning people, market stalls, birds, water, festival garlands and Mira’s portrait. Generated PNG assets are compressed to WebP with alpha preserved for runtime use.

## Further art work

Review deity iconography carefully before final release. Enemy locomotion uses light sprite movement rather than full frame animation. Sound uses optional synthesised cues, not authentic instrument recordings. Visual quality and touch comfort still require hands-on phone testing.

## Active combat update

Keep the existing miniature-painting atlas style. Durga manifests at the selected enemy, Vayu uses larger wind strikes, Agni flames remain on burning foes and Prithvi boulders move along their shot. Functional shield emblems replace overhead patron names. Selecting Saraswati highlights supported shrines. Lamp-bearer escorts reuse the procession artwork. No new generated artwork was needed for this update.
