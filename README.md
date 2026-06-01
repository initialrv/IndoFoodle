# IndoFoodle

IndoFoodle is a static browser game about Indonesian traditional foods. Players choose between two foods and try to match the community majority choice.

## Features

- Daily matchup mode with deterministic seeded food pairs
- Practice mode with local randomized matchups
- Warm-up vote before the daily game
- Score tracking and final result summary
- Share/copy result support
- Supabase-backed vote storage for warm-up and daily matchups
- Fallback generated percentages when vote data is unavailable or too sparse

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Supabase browser client via CDN

No build step is required.

## Local Development

Because the app fetches `data/foods.json`, run it through a local static server instead of opening `index.html` directly.

```powershell
cd "C:\Users\Rayden\Documents\Codex\IndoFoodle"
python -m http.server 4174 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4174/
```

## Supabase Setup

The frontend configuration lives in:

```text
js/supabase-client.js
```

The browser app uses only the public Supabase project URL and publishable/anon key. Do not put a service role or secret key in frontend code.

Required database objects:

- `votes`
- `daily_results`
- `get_vote_totals(target_matchup_key text)`

The setup SQL is documented in `PROJECT_LOG.md` and the Codex integration notes.

## Vote Behavior

- Warm-up votes are stored with `mode = "warmup"`.
- Daily game votes are stored with `mode = "daily"`.
- Matchup keys are unordered, so reversed pairs share totals.
- Practice mode stays local and does not write votes.
- If Supabase fails or a matchup has too few votes, the app keeps using generated fallback percentages.
