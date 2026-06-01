# IndoFoodle Project Log

This file is the running history for project fixes and implementation work.
All future fixes must be appended here with the date, scope, files changed, and verification performed.

## 2026-05-24 - Repository Read And State Documentation

### Scope
- Read the repository structure and core implementation files.
- Created documentation only:
  - `PROJECT_LOG.md`
  - `CURRENT_STATE.md`

### Files Reviewed
- `index.html`
- `indofoodle plan.txt`
- `data/foods.json`
- `js/state.js`
- `js/game-data.js`
- `js/modal.js`
- `js/dom.js`
- `js/ui.js`
- `js/results.js`
- `js/warmup-flow.js`
- `js/game-flow.js`
- `js/script.js`
- `css/style.css`
- `css/base.css`
- `css/home.css`
- `css/game.css`
- `css/animations.css`
- `css/results.css`
- `css/mobile.css`
- `assets/`
- `indofoodle-html-designs/`

### Summary
- IndoFoodle is a static browser game about choosing which Indonesian traditional food most people would prefer.
- The app is implemented with plain HTML, CSS, and browser JavaScript.
- The current build includes a main menu, daily mode, practice mode, warm-up vote, animated food cards, score dots, result breakdown, copy result, modal prompts, food JSON data, and food image assets.

### No Code Changes
- No runtime app code was changed.
- No tests or browser verification were run in this pass.

## 2026-05-24 - Mobile Card Height Fix

### Scope
- Fixed collapsed warm-up/game cards on narrow mobile layouts.
- Updated the mobile card flex behavior so Safari/mobile browsers keep the intended card height.

### Files Changed
- `css/mobile.css`

### Summary
- Added `flex: 0 0 auto` and `display: block` to the mobile `.card` rule.
- This prevents the stacked button cards from collapsing into thin tap targets when `.cards` switches to a column layout.

### Verification
- Reasoned from the reported mobile screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-24 - Mobile Card Reveal Sizing

### Scope
- Tuned mobile card layout after reveal based on phone screenshot feedback.
- Reduced oversized reveal text and expanded the stacked card area to use more of the available screen height.

### Files Changed
- `css/mobile.css`

### Summary
- Increased mobile `.card` height from `clamp(230px, 34svh, 310px)` to `clamp(275px, 39svh, 370px)`.
- Tightened the stacked card gap from `16px` to `14px`.
- Reduced mobile food name, description, and percentage overlay sizing.
- Increased the very-small-screen card height rule while keeping text smaller.

### Verification
- Reasoned from the reported mobile screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-24 - Revealed Card Text Hierarchy

### Scope
- Reduced the warm-up "Thank you" overlay size.
- Improved contrast hierarchy between result overlays and food labels after reveal.

### Files Changed
- `css/game.css`
- `css/mobile.css`

### Summary
- Added revealed-card label dimming for `.food-name` and `.food-desc`.
- Added a smaller `#warmup-screen .percentage-overlay` size so "Thank you" does not inherit the full percentage scale.
- Added a tighter mobile warm-up overlay size.

### Verification
- Reasoned from the reported mobile screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-24 - Limit Reveal Hierarchy Changes To Mobile

### Scope
- Preserved the existing desktop card reveal styling.
- Kept the food label dimming and smaller warm-up overlay behavior mobile-only.

### Files Changed
- `css/game.css`
- `css/mobile.css`

### Summary
- Removed global revealed-card dimming from `css/game.css`.
- Removed the global warm-up overlay size override from `css/game.css`.
- Added the revealed-card label dimming inside the mobile media query in `css/mobile.css`.
- Left the existing mobile warm-up overlay override in `css/mobile.css`.

### Verification
- Read the affected CSS rules after editing.
- I have not run live browser verification in this turn.

## 2026-05-24 - Disable Sticky Mobile Hover Glow

### Scope
- Fixed mobile hover highlight persisting on the same top/bottom card position after a tap and next round.

### Files Changed
- `css/mobile.css`

### Summary
- Expanded the mobile `body.cards-interactive .card:not(.disabled):hover` override.
- Mobile hover now resets `border-color` and `box-shadow` in addition to disabling transform.
- Desktop hover styling remains unchanged.

### Verification
- Reasoned from the reported mobile behavior and current CSS cascade.
- I have not run live browser verification in this turn.

## 2026-05-24 - Mobile Percentage Result Glow

### Scope
- Matched mobile percentage overlays more closely to the card result state without changing the main font color.

### Files Changed
- `css/mobile.css`

### Summary
- Added green glow to correct mobile percentage overlays.
- Added dimmer white text with red glow to wrong mobile percentage overlays.
- Kept the desktop percentage styling unchanged.

### Verification
- Reasoned from the requested visual hierarchy and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-24 - Desktop Percentage Result Glow

### Scope
- Applied the same result-colored percentage glow to desktop for review.

### Files Changed
- `css/game.css`
- `css/mobile.css`

### Summary
- Moved correct/wrong percentage glow styling from the mobile media query to the global card styling.
- Removed the duplicated mobile-only glow rules.
- Correct percentages now get a green glow and wrong percentages get a red glow on desktop and mobile.

### Verification
- Read the affected CSS cascade after editing.
- I have not run live browser verification in this turn.

## 2026-05-24 - Stronger Percentage Result Outline

### Scope
- Made the result-colored percentage treatment visibly noticeable on desktop and mobile.

### Files Changed
- `css/game.css`
- `css/mobile.css`

### Summary
- Added colored `-webkit-text-stroke` to correct and wrong percentage overlays.
- Increased the green/red glow strength behind percentage overlays.
- Reduced mobile stroke width to keep smaller text from feeling too heavy.

### Verification
- Reasoned from reported lack of visible color in the percentage outline/shadow.
- I have not run live browser verification in this turn.

## 2026-05-24 - Revert Percentage Result Outline

### Scope
- Reverted the stronger colored percentage outline treatment after visual review.

### Files Changed
- `css/game.css`
- `css/mobile.css`

### Summary
- Removed correct/wrong percentage overlay glow and colored text stroke rules.
- Removed the mobile percentage stroke width override.
- Restored percentage overlays to the previous plain white text-shadow styling.

### Verification
- Read the affected CSS after editing.
- I have not run live browser verification in this turn.

## 2026-05-24 - Percentage Result Glow Without Outline

### Scope
- Added result-colored glow behind percentage overlays without using text outline.

### Files Changed
- `css/game.css`

### Summary
- Added green text shadow glow for correct percentage overlays.
- Added red text shadow glow for wrong percentage overlays.
- Kept the percentage fill color white and avoided `text-stroke`.

### Verification
- Reasoned from the requested visual direction and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-24 - Revert Percentage Result Glow

### Scope
- Reverted result-colored percentage glow after visual review.

### Files Changed
- `css/game.css`

### Summary
- Removed correct/wrong percentage overlay text-shadow overrides.
- Restored percentage overlays to the base white text with black shadow only.

### Verification
- Read the affected CSS after editing.
- I have not run live browser verification in this turn.

## 2026-05-25 - Stronger Bottom Text Scrim

### Scope
- Improved food name and description readability with a stronger bottom dim area.

### Files Changed
- `css/game.css`
- `css/mobile.css`

### Summary
- Strengthened the card image gradient overlay in `css/game.css`.
- Added a slightly stronger mobile-specific bottom scrim in `css/mobile.css`.
- Kept the percentage overlay styling unchanged.

### Verification
- Reasoned from the requested visual direction and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Lower Mobile Text Scrim

### Scope
- Tuned the mobile card scrim so it protects the food label area without darkening too much of the food image.

### Files Changed
- `css/mobile.css`

### Summary
- Lowered the mobile-only gradient falloff by moving the stronger dark stops closer to the bottom.
- Desktop scrim styling remains unchanged.

### Verification
- Reasoned from the mobile visual feedback and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Desktop Warm-Up Title Spacing

### Scope
- Reduced the top spacing above the desktop warm-up title.

### Files Changed
- `css/game.css`

### Summary
- Added `#warmup-screen .subtitle { margin-top: -12px; }` to the default game styles.
- Mobile can still override this separately through `css/mobile.css`.

### Verification
- Read the affected CSS after editing.
- I have not run live browser verification in this turn.

## 2026-05-25 - Taller Mobile Warm-Up Cards

### Scope
- Reduced empty space below the mobile warm-up card stack after title spacing changes.

### Files Changed
- `css/mobile.css`

### Summary
- Increased mobile `.card` height from `clamp(275px, 39svh, 370px)` to `clamp(295px, 42svh, 395px)`.
- Increased the very-small-screen card height from `clamp(250px, 37svh, 330px)` to `clamp(270px, 40svh, 350px)`.
- Desktop card sizing remains unchanged.

### Verification
- Reasoned from the reported mobile screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Slightly Reduce Mobile Card Height

### Scope
- Fine-tuned the mobile card height after the previous increase.

### Files Changed
- `css/mobile.css`

### Summary
- Reduced mobile `.card` height from `clamp(295px, 42svh, 395px)` to `clamp(288px, 41svh, 385px)`.
- Reduced the very-small-screen card height from `clamp(270px, 40svh, 350px)` to `clamp(264px, 39svh, 342px)`.

### Verification
- Reasoned from the requested visual adjustment and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Compact Mobile Results Screen

### Scope
- Reduced mobile result screen scale so more matchup rows fit comfortably on screen.

### Files Changed
- `css/mobile.css`

### Summary
- Reduced result hero padding, score size, dot size, message size, and matchup row spacing.
- Reduced mobile matchup food names, percentage labels, and bar height.
- Kept desktop result styling unchanged.

### Verification
- Reasoned from the supplied mobile results screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Mobile Result Row Label Layout

### Scope
- Moved mobile result matchup food names into the same row above each percentage bar.

### Files Changed
- `css/mobile.css`

### Summary
- Changed mobile matchup rows from a single-column stack to a two-column label row plus full-width bar.
- Left food name aligns above the left side of the bar.
- Right food name aligns above the right side of the bar.

### Verification
- Reasoned from the supplied mobile results screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Text Cleanup And Timer Hardening

### Scope
- Cleaned visible result mojibake strings.
- Hardened delayed game transitions so old timers are cleared on reset/restart.

### Files Changed
- `js/state.js`
- `js/modal.js`
- `js/game-flow.js`
- `js/warmup-flow.js`
- `js/results.js`
- `indofoodle plan.txt`

### Summary
- Added `scheduleTimer()` and `clearActiveTimers()` helpers for tracked delayed transitions.
- Replaced gameplay and warm-up transition `setTimeout()` calls with tracked timers.
- `resetGameState()` now clears active transition timers before resetting screens and cards.
- Added `resetModalState()` so modal timers/actions do not survive a reset.
- Removed broken emoji/mojibake from result messages and copy text.
- Cleaned the mojibake example text in `indofoodle plan.txt`.

### Verification
- Searched for mojibake and transition timers before editing.
- Confirmed `rg` no longer finds mojibake markers in app files.
- Ran `node --check` on changed JavaScript files.
- I have not run live browser verification in this turn.

## 2026-05-25 - Larger Desktop Cards

### Scope
- Increased desktop card scale to reduce empty space below the game layout.

### Files Changed
- `css/game.css`

### Summary
- Changed default `.card` height from `min(62vh, 520px)` to `min(68vh, 600px)`.
- Mobile card sizing remains controlled by `css/mobile.css`.

### Verification
- Reasoned from the supplied desktop screenshot and current CSS.
- I have not run live browser verification in this turn.

## 2026-05-25 - Restore Clean Result Emojis

### Scope
- Restored result emojis using clean UTF-8 characters.

### Files Changed
- `js/results.js`

### Summary
- Added clean emoji prefixes back to result messages.
- Added a clean food emoji back to copied result text.
- This keeps the playful result tone without the previous mojibake corruption.

### Verification
- Confirmed `rg` no longer finds mojibake markers in app files.
- Ran `node --check` on changed JavaScript files.
- I have not run live browser verification in this turn.

## 2026-05-25 - Clipboard And Basic Accessibility Polish

### Scope
- Added safer Copy Result behavior.
- Added basic focus and live-region accessibility polish.
- Cleaned remaining visible mojibake text.

### Files Changed
- `index.html`
- `css/game.css`
- `js/results.js`

### Summary
- `copyResult()` now handles clipboard API failures and shows `Copy failed` instead of always claiming success.
- Result emojis now use Unicode escape sequences in source to avoid encoding corruption while still rendering as emojis.
- Fixed the menu description apostrophe text.
- Added polite live regions for result text updates.
- Added visible focus styling for food cards.

### Verification
- Confirmed `rg` no longer finds mojibake markers in app files.
- Ran `node --check` on changed JavaScript files.
- I have not run live browser verification in this turn.

## 2026-05-25 - Mobile Clipboard Fallback

### Scope
- Added a manual copy fallback for mobile browsers that block Clipboard API writes on local HTTP pages.

### Files Changed
- `index.html`
- `js/modal.js`
- `js/results.js`
- `css/base.css`
- `css/mobile.css`

### Summary
- Added a readonly textarea inside the modal for fallback result copying.
- `copyResult()` now opens the fallback modal and selects the result text when clipboard writing fails.
- Styled the fallback copy field for desktop and mobile.

### Verification
- Confirmed removed unused hidden controls/selectors are no longer found.
- Confirmed `rg` no longer finds mojibake markers in app files.
- Ran `node --check` on changed JavaScript files.
- I have not run live browser verification in this turn.

## 2026-05-25 - Copy Popup With Icon Button

### Scope
- Replaced the visible fallback textarea with a cleaner result copy popup and icon button.

### Files Changed
- `index.html`
- `js/modal.js`
- `css/base.css`
- `css/mobile.css`

### Summary
- Added a visible modal copy panel that displays the result text.
- Added an icon-only copy button inside the modal.
- Kept a hidden textarea for fallback selection/copy behavior on mobile browsers.
- Styled the copy popup for desktop and mobile.

### Verification
- I have not run live browser verification in this turn.

## 2026-06-01 - Supabase Vote Data Integration

### Scope
- Added Supabase browser client integration for warm-up and daily game votes.
- Prepared daily matchup percentages to use real vote totals when enough votes exist.
- Kept Practice Mode local-only.

### Files Changed
- `index.html`
- `js/supabase-client.js`
- `js/warmup-flow.js`
- `js/game-flow.js`

### Summary
- Loaded Supabase from the browser CDN before the app scripts.
- Added the public Supabase project URL and publishable browser key to the client config.
- Generated a stable anonymous player ID in `localStorage`.
- Stored warm-up votes and daily votes in the `votes` table.
- Used unordered matchup keys so reversed food pairs share vote totals.
- Fetched vote totals through the `get_vote_totals` RPC and fell back to generated percentages when Supabase is unavailable or has too few votes.

### Verification
- Supabase tables, policies, and RPC were created successfully in the dashboard.
- Frontend JavaScript syntax and browser flow verification were run after applying the file changes.

## 2026-05-25 - Final Do-Now Cleanup Pass

### Scope
- Finished the current low-risk optimization pass before manual QA.

### Files Changed
- `index.html`
- `css/base.css`
- `css/mobile.css`
- `js/state.js`
- `js/game-flow.js`
- `js/warmup-flow.js`
- `js/results.js`

### Summary
- Removed unused hidden warm-up/result placeholder elements and old hidden buttons.
- Removed CSS selectors for the old hidden `continue` and `next` controls.
- Added a game session guard so delayed or async transition work can bail after restart/reset.
- Improved copied result text with a score line and green/red result pattern.
- Reset the Copy Result button text after copy feedback.

### Verification
- Confirmed removed unused hidden controls/selectors are no longer found.
- Confirmed `rg` no longer finds mojibake markers in app files.
- Ran `node --check` on changed JavaScript files.
- I have not run live browser verification in this turn.

## 2026-05-25 - Fix Daily Start Session Guard

### Scope
- Fixed daily mode startup after the session guard cleanup.

### Files Changed
- `js/game-flow.js`

### Summary
- Stored the `resetGameState()` return value in `startDailyGame()` so the later session guard can read `sessionId`.
- This fixes the false "Food data failed to load" modal caused by a `ReferenceError`.

### Verification
- I have not run live browser verification in this turn.

## 2026-05-25 - Share Text Format Update

### Scope
- Updated copied result text format.

### Files Changed
- `js/results.js`

### Summary
- Changed copied result text to `🍛IndoFoodle today: 2/3` on the first line and the green/red result pattern on the second line.

### Verification
- I have not run live browser verification in this turn.

## 2026-05-25 - Compact Share Text

### Scope
- Simplified copied result text for better mobile sharing.

### Files Changed
- `js/results.js`

### Summary
- Removed the green/red result pattern from copied text.
- Changed copied result text to a single line: `IndoFoodle today: 2/3🍛`.

### Verification
- I have not run live browser verification in this turn.

## 2026-05-25 - Hide Practice Copy Result

### Scope
- Simplified practice mode results actions.

### Files Changed
- `js/results.js`
- `js/game-flow.js`

### Summary
- Practice mode result screen now hides the Copy Result button.
- Daily result screen still shows Copy Result.
- Reset flow restores Copy Result visibility for later daily games.

### Verification
- I have not run live browser verification in this turn.
