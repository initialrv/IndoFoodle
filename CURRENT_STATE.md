# IndoFoodle Current State

Snapshot date: 2026-05-24

## Project Purpose

IndoFoodle is a lightweight web game inspired by daily comparison games. Players choose between two Indonesian traditional foods and try to match the simulated majority preference. The game presents food matchups, reveals percentage results, tracks the score, and shows a final summary.

The app appears intended to support:
- A daily challenge with seeded matchups.
- A practice mode with randomized matchups.
- A warm-up preference vote before the daily game.
- Shareable or copyable result text.
- Mobile-friendly play on phone screens.

## Important Files

- `index.html`: Main document and screen structure for menu, warm-up, game, result, and modal views.
- `css/style.css`: CSS entrypoint that imports the modular stylesheets.
- `css/base.css`: Theme tokens, global layout, shared buttons, topbar, and modal styling.
- `css/home.css`: Main menu and home screen layout.
- `css/game.css`: Food card layout, progress dots, card states, image overlay, and answer reveal styling.
- `css/animations.css`: Card fade-in/fade-out, reveal, and dot animations.
- `css/results.css`: Final score, result dots, matchup breakdown, and result action layout.
- `css/mobile.css`: Mobile responsive overrides for menu, topbar, cards, result rows, buttons, and modal.
- `js/state.js`: Global game state and timing constants.
- `js/game-data.js`: Food data loading, seeded daily question generation, practice question generation, and date key logic.
- `js/dom.js`: Cached DOM references for screens and buttons.
- `js/ui.js`: Card rendering, image preloading, card reveal flow, progress dots, and question loading.
- `js/game-flow.js`: Main gameplay selection logic, score/history tracking, daily result storage, reset, restart, daily start, and practice start.
- `js/warmup-flow.js`: Warm-up question loading and warm-up vote transition into the daily game.
- `js/results.js`: Final result rendering, matchup breakdown rendering, result messages, and clipboard copy.
- `js/modal.js`: Modal show/close behavior and optional modal action callback.
- `js/script.js`: Event listener wiring for buttons and cards.
- `data/foods.json`: Food catalog with names, English and Indonesian descriptions, and image paths.
- `assets/images/foods/`: Food image assets used by the game cards.
- `assets/`: Logo and favicon assets.
- `indofoodle-html-designs/`: Static design reference HTML pages and screenshots.
- `indofoodle plan.txt`: Existing cleanup and production-readiness checklist.
- `IndoFoodle_Development_Framework.pdf`: Project reference document.

## Current Architecture

The app is a static, client-side web application with no build system visible in the repository.

Runtime flow:
- `index.html` loads CSS through `css/style.css`.
- `index.html` loads JavaScript files in global-script order.
- DOM nodes are cached in `js/dom.js`, `js/ui.js`, `js/results.js`, and `js/modal.js`.
- Shared state is stored in globals from `js/state.js` and `js/game-data.js`.
- Food data is fetched from `data/foods.json` at game start.
- Daily mode uses deterministic seeded shuffling based on `getTodayKey()`.
- Practice mode uses random shuffling and random percentages.
- Screens are switched by setting `hidden` on the menu, warm-up, game, and result sections.
- Card animation is handled with CSS classes and `setTimeout`.
- Results are stored in `roundHistory` and rendered at the end.
- Daily result persistence uses `localStorage`, though the daily lock is currently disabled.

The code is modular by file, but not by ES modules. All functions and variables live in the browser global scope and rely on script load order.

## Visible Completed Features

- Main menu with logo, subtitle, description, daily start button, and practice button.
- Sticky topbar with clickable logo that returns to the menu.
- Food data loaded from JSON.
- Food cards with images, names, and descriptions.
- Image preloading before card reveal.
- Daily question generation with seeded order and simulated majority percentages.
- Practice question generation with random order and simulated percentages.
- Warm-up vote before the daily game.
- Modal prompt before warm-up interaction.
- Main game selection between left and right food cards.
- Correct/wrong answer reveal with percentage overlays.
- Score tracking.
- Round history tracking.
- Progress dots for each question.
- Result screen with final score, result dots, result message, and matchup breakdown bars.
- Copy result button using `navigator.clipboard.writeText`.
- Restart/back-to-menu flow.
- Mobile CSS for stacked cards, narrower buttons, adjusted topbar, and simplified result breakdown rows.
- Logo and favicon assets are present.
- Food image assets for 20 foods are present.
- Static design reference files and screenshots are present.

## Suspected Unfinished Areas

These are suspected from `indofoodle plan.txt` and the current source state.

- Text encoding/mojibake remains visible in `index.html`, `indofoodle plan.txt`, and result strings in `js/results.js`.
- `getTodayKey()` currently returns `"test-day"` instead of the real date, so daily mode is still in test mode.
- Daily lock logic exists but is commented out in `js/game-flow.js`.
- `QUESTION_COUNT` is 10, but surrounding comments still reference testing cleanup and include a duplicate commented constant.
- Timer handling is not centralized; delayed callbacks can still fire after restart or screen changes.
- Rapid clicking and restart-during-transition edge cases may need hardening.
- Clipboard copy has no failure handling.
- Keyboard and accessibility support is incomplete:
  - Food cards are buttons, but explicit Enter/Space behavior, live regions, and status announcements are not implemented.
  - Focus states exist for the topbar logo but not clearly for food cards.
  - Reduced-motion handling is not present.
- Mobile layout exists, but should still be manually verified across real phone widths.
- Some food images are very large and likely need compression.
- Food image crop and quality consistency should be checked.
- Current majority percentages are simulated; the project may eventually need real vote data if that is part of the product goal.
- Food data lacks region/category metadata that could support richer UI later.
- No automated tests, build scripts, package manifest, or deployment configuration are visible.
- The folder is not currently a Git repository, based on `git status` failing from the project root.

## Future Work Rule

All future fixes and implementation passes should append an entry to `PROJECT_LOG.md`.

