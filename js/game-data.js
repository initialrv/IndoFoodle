/* ==============================
   FOOD DATA + QUESTION GENERATION
============================== */

let foods = {};

let warmupQuestion = {};
let randomizedDailyQuestions = [];

/* // testing round count; change back to 10 before finalization */
const QUESTION_COUNT = 2;
// const QUESTION_COUNT = 10;

async function loadFoods() {
  const response = await fetch("data/foods.json");

  if (!response.ok) {
    throw new Error("Failed to load foods.json");
  }

  foods = await response.json();
}

function getTodayKey() {
  return "test-day";
  // return new Date().toISOString().split("T")[0];
}

function createSeedFromString(text) {
  let seed = 0;

  for (let i = 0; i < text.length; i++) {
    seed += text.charCodeAt(i);
  }

  return seed;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function seededShuffle(array, seedText) {
  const shuffled = [...array];
  let seed = createSeedFromString(seedText);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const random = seededRandom(seed + i);
    const j = Math.floor(random * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generateWarmupQuestion() {
  const foodKeys = shuffleArray(Object.keys(foods));

  warmupQuestion = {
    left: foodKeys[0],
    right: foodKeys[1]
  };
}

function generateDailyQuestions() {
  const todayKey = getTodayKey();
  const foodKeys = seededShuffle(Object.keys(foods), todayKey + "-daily").slice(0, QUESTION_COUNT * 2);

  randomizedDailyQuestions = [];

  for (let i = 0; i < foodKeys.length; i += 2) {
    const percentageSeed = createSeedFromString(todayKey + foodKeys[i] + foodKeys[i + 1]);

    const leftPercentage = Math.floor(seededRandom(percentageSeed) * 51) + 25;
    const rightPercentage = 100 - leftPercentage;

    randomizedDailyQuestions.push({
      left: foodKeys[i],
      right: foodKeys[i + 1],
      majority: leftPercentage >= rightPercentage ? "left" : "right",
      leftPercentage: leftPercentage,
      rightPercentage: rightPercentage
    });
  }
}

function generatePracticeQuestions() {
  const foodKeys = shuffleArray(Object.keys(foods)).slice(0, QUESTION_COUNT * 2);

  randomizedDailyQuestions = [];

  for (let i = 0; i < foodKeys.length; i += 2) {
    const leftPercentage = Math.floor(Math.random() * 51) + 25;
    const rightPercentage = 100 - leftPercentage;

    randomizedDailyQuestions.push({
      left: foodKeys[i],
      right: foodKeys[i + 1],
      majority: leftPercentage >= rightPercentage ? "left" : "right",
      leftPercentage: leftPercentage,
      rightPercentage: rightPercentage
    });
  }
}
