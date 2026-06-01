/* // supabase configuration */
const SUPABASE_PROJECT_URL = "https://lzllnbzffjibonzsbyvq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_fQ5cgwScE33k-1M-_nyh_Q_OOF4_ldB";
const SUPABASE_MIN_VOTES_FOR_REAL_PERCENTAGES = 3;
const SUPABASE_REQUEST_TIMEOUT_MS = 1500;

let indoFoodleSupabase = null;

function isSupabaseConfigured() {
  return (
    SUPABASE_PROJECT_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_PROJECT_URL.includes("PASTE_") &&
    !SUPABASE_ANON_KEY.includes("PASTE_") &&
    window.supabase &&
    window.supabase.createClient
  );
}

function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;

  if (!indoFoodleSupabase) {
    indoFoodleSupabase = window.supabase.createClient(
      SUPABASE_PROJECT_URL,
      SUPABASE_ANON_KEY
    );
  }

  return indoFoodleSupabase;
}

function withSupabaseTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Supabase request timed out"));
      }, SUPABASE_REQUEST_TIMEOUT_MS);
    })
  ]);
}

function getAnonymousPlayerId() {
  const storageKey = "indofoodle-anonymous-player-id";
  const savedPlayerId = localStorage.getItem(storageKey);

  if (savedPlayerId) return savedPlayerId;

  const newPlayerId = crypto.randomUUID
    ? crypto.randomUUID()
    : `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(storageKey, newPlayerId);
  return newPlayerId;
}

function getMatchupKey(leftFood, rightFood) {
  return [leftFood, rightFood].sort().join("_vs_");
}

function getChosenFoodKey(side, leftFood, rightFood) {
  return side === "left" ? leftFood : rightFood;
}

function getSupabaseVoteDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function storeVote({ mode, leftFood, rightFood, chosenFood }) {
  const client = getSupabaseClient();

  if (!client) return;

  const { error } = await withSupabaseTimeout(
    client
      .from("votes")
      .insert({
        vote_date: getSupabaseVoteDate(),
        mode: mode,
        matchup_key: getMatchupKey(leftFood, rightFood),
        left_food: leftFood,
        right_food: rightFood,
        chosen_food: chosenFood,
        anonymous_player_id: getAnonymousPlayerId()
      })
  );

  if (error) {
    throw error;
  }
}

async function fetchVoteTotals(leftFood, rightFood) {
  const client = getSupabaseClient();

  if (!client) return null;

  const matchupKey = getMatchupKey(leftFood, rightFood);

  const { data, error } = await withSupabaseTimeout(
    client.rpc("get_vote_totals", {
      target_matchup_key: matchupKey
    })
  );

  if (error) {
    throw error;
  }

  const totals = {
    left: 0,
    right: 0,
    total: 0
  };

  data.forEach((vote) => {
    if (vote.chosen_food === leftFood) {
      totals.left += Number(vote.vote_count);
    }

    if (vote.chosen_food === rightFood) {
      totals.right += Number(vote.vote_count);
    }
  });

  totals.total = totals.left + totals.right;
  return totals;
}

function getPercentagesFromTotals(totals) {
  if (!totals || totals.total < SUPABASE_MIN_VOTES_FOR_REAL_PERCENTAGES) {
    return null;
  }

  const leftPercentage = Math.round((totals.left / totals.total) * 100);
  const rightPercentage = 100 - leftPercentage;

  return {
    leftPercentage: leftPercentage,
    rightPercentage: rightPercentage,
    majority: leftPercentage >= rightPercentage ? "left" : "right"
  };
}

async function saveWarmupVote(side) {
  const leftFood = warmupQuestion.left;
  const rightFood = warmupQuestion.right;

  try {
    await storeVote({
      mode: "warmup",
      leftFood: leftFood,
      rightFood: rightFood,
      chosenFood: getChosenFoodKey(side, leftFood, rightFood)
    });
  } catch (error) {
    console.error("Warm-up vote was not saved.", error);
  }
}

async function saveDailyVoteAndGetPercentages(question, side) {
  try {
    await storeVote({
      mode: "daily",
      leftFood: question.left,
      rightFood: question.right,
      chosenFood: getChosenFoodKey(side, question.left, question.right)
    });

    const totals = await fetchVoteTotals(question.left, question.right);
    const realPercentages = getPercentagesFromTotals(totals);

    if (realPercentages) {
      return realPercentages;
    }
  } catch (error) {
    console.error("Daily vote data is unavailable.", error);
  }

  return {
    leftPercentage: question.leftPercentage,
    rightPercentage: question.rightPercentage,
    majority: question.majority
  };
}
