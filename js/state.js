/* // game state */
let currentQuestion = 0;
let score = 0;
let answered = false;
let currentLanguage = "en";
let isPracticeMode = false;
let roundHistory = [];
let gameSessionId = 0;

/* // reveal timing */
const REVEAL_HOLD_MS = 2200;
const ROUND_TRANSITION_MS = 3000;
const WARMUP_MODAL_DELAY_MS = 250;

/* // pending delayed transitions */
let activeTimers = [];

function scheduleTimer(callback, delay) {
  const timerId = setTimeout(() => {
    activeTimers = activeTimers.filter((id) => id !== timerId);
    callback();
  }, delay);

  activeTimers.push(timerId);
  return timerId;
}

function clearActiveTimers() {
  activeTimers.forEach((timerId) => {
    clearTimeout(timerId);
  });

  activeTimers = [];
}

function startGameSession() {
  gameSessionId++;
  return gameSessionId;
}

function isCurrentGameSession(sessionId) {
  return sessionId === gameSessionId;
}
