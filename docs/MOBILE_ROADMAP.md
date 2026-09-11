# From browser prototype to mobile app

1. Playtest this version on real iPhone and Android devices. Record confusing controls, difficult-to-read enemies and difficulty spikes. Preserve all seven shrines while tuning.
2. Optimise images and animations against lower-cost Android devices. Keep large art separate from rules. Replace provisional assets only after reviewing deity iconography.
3. Package the same static game with Capacitor or another reviewed web-to-native shell. Validate current platform versions and build requirements at implementation time. Keep platform services in a separate adapter.
4. Add dependable packaged offline start and test interruption/resumption, screen ratios, safe areas, audio and save migration. Browser-local saving alone does not guarantee offline launch.
5. Configure Android and macOS cloud builds against this repository; keep signing materials in encrypted build secrets, never code or chat. Enrol the publisher in the relevant developer programmes.
6. Add the expanded campaign, tutorial progression and free chapter. Integrate one permanent full-game unlock and purchase restoration, tested against each store's sandbox. Current prototype unlocks everything and accepts no payments.
7. Test installations on devices through the platforms' testing channels, then prepare store descriptions, screenshots, privacy information and release submissions.

No developer software needs to be installed on the owner's work laptop. Account enrolment, authorisation and real-phone testing remain owner actions. Do not assume that wrapping a browser game alone creates a store-ready release.
