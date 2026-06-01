/* // choose answer */
async function choose(side) {
  if (answered) return;

  const sessionId = gameSessionId;

  answered = true;

  const q = randomizedDailyQuestions[currentQuestion];

  leftCard.classList.add("disabled", "revealed");
  rightCard.classList.add("disabled", "revealed");

  const resultData = isPracticeMode
    ? {
        leftPercentage: q.leftPercentage,
        rightPercentage: q.rightPercentage,
        majority: q.majority
      }
    : await saveDailyVoteAndGetPercentages(q, side);

  if (!isCurrentGameSession(sessionId)) return;

  q.leftPercentage = resultData.leftPercentage;
  q.rightPercentage = resultData.rightPercentage;
  q.majority = resultData.majority;

  const chosenCard = side === "left" ? leftCard : rightCard;
  const majorityCard = q.majority === "left" ? leftCard : rightCard;
  const minorityCard = q.majority === "left" ? rightCard : leftCard;

  let isCorrect = false;

  if (side === q.majority) {
    score++;
    isCorrect = true;
    chosenCard.classList.add("correct");
    minorityCard.classList.add("wrong");
  } else {
    chosenCard.classList.add("wrong");
    majorityCard.classList.add("correct");
  }

  updateDot(isCorrect);

  roundHistory.push({
    leftName: foods[q.left].name,
    rightName: foods[q.right].name,
    leftPercentage: q.leftPercentage,
    rightPercentage: q.rightPercentage,
    isCorrect: isCorrect
  });

  leftCard.querySelector(".percentage-overlay").textContent =
    `${q.leftPercentage}%`;

  rightCard.querySelector(".percentage-overlay").textContent =
    `${q.rightPercentage}%`;

  scheduleTimer(() => {
    if (!isCurrentGameSession(sessionId)) return;

    leftCard.classList.add("fade-out");
    rightCard.classList.add("fade-out");
  }, REVEAL_HOLD_MS);

  scheduleTimer(goToNextQuestion, ROUND_TRANSITION_MS);
}

/* // next question */
async function goToNextQuestion() {
  const sessionId = gameSessionId;

  currentQuestion++;

  if (currentQuestion >= randomizedDailyQuestions.length) {
    if (!isCurrentGameSession(sessionId)) return;

    showFinalResult();
  } else {
    await loadQuestion();

    if (!isCurrentGameSession(sessionId)) return;
  }
}

/* // save daily result */
function saveTodayResult() {
  const resultData = {
    date: getTodayKey(),
    score: score,
    total: randomizedDailyQuestions.length
  };

  localStorage.setItem("indofoodle-result", JSON.stringify(resultData));
}

/* // get saved daily result */
function getSavedResult() {
  const saved = localStorage.getItem("indofoodle-result");

  if (!saved) return null;

  return JSON.parse(saved);
}

/* // reset game state */
function resetGameState() {
  const sessionId = startGameSession();

  clearActiveTimers();
  resetModalState();

  currentQuestion = 0;
  score = 0;
  answered = false;
  roundHistory = [];

  resetCardStyles(leftCard);
  resetCardStyles(rightCard);
  resetCardStyles(warmupLeftCard);
  resetCardStyles(warmupRightCard);
  clearPreparedQuestion();
  document.body.classList.remove("cards-interactive");

  copyResultBtn.textContent = "Copy Result";
  copyResultBtn.hidden = false;

  return sessionId;
}

/* // restart to menu */
function restartGame() {
  const sessionId = resetGameState();

  document.body.classList.add("menu-active");

  resultScreen.hidden = true;
  gameScreen.hidden = true;
  warmupScreen.hidden = true;
  menuScreen.hidden = false;
}

/* // start daily game */
async function startDailyGame() {
  if (Object.keys(foods).length === 0) {
    await loadFoods();
  }

  const sessionId = resetGameState();

  isPracticeMode = false;

  generateDailyQuestions();

  /*
  // daily lock check disabled for testing
  const savedResult = getSavedResult();

  if (savedResult && savedResult.date === getTodayKey()) {
    showModal(
      `You already played today! You scored ${savedResult.score}/${savedResult.total}. Want to keep playing? Try Practice Mode.`,
      "Practice Mode",
      () => {
        startPracticeGame();
      }
    );

    return;
  }
  */

  await Promise.all([
    loadWarmupQuestion(),
    prepareQuestion()
  ]);

  if (!isCurrentGameSession(sessionId)) return;

  menuScreen.hidden = true;
  resultScreen.hidden = true;
  gameScreen.hidden = true;
  warmupScreen.hidden = false;

  document.body.classList.remove("menu-active");

  await revealFoodCardPair(warmupLeftCard, warmupRightCard);

  if (!isCurrentGameSession(sessionId)) return;

  scheduleTimer(() => {
    if (!isCurrentGameSession(sessionId)) return;

    showModal(
      "Before today's game, help us collect food preference data. This vote does not affect your score.",
      "Got it",
      () => {
        document.body.classList.add("cards-interactive");
      }
    );

    answered = false;
  }, WARMUP_MODAL_DELAY_MS);
}

/* // start practice game */
async function startPracticeGame() {
  if (Object.keys(foods).length === 0) {
    await loadFoods();
  }

  const sessionId = resetGameState();

  isPracticeMode = true;

  generatePracticeQuestions();

  menuScreen.hidden = true;
  resultScreen.hidden = true;
  warmupScreen.hidden = true;
  gameScreen.hidden = false;

  document.body.classList.remove("menu-active");
  document.body.classList.add("cards-interactive");

  renderDots();
  await loadQuestion();

  if (!isCurrentGameSession(sessionId)) return;
}
