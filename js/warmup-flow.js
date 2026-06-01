/* // warmup flow */
async function loadWarmupQuestion() {
  answered = true;

  generateWarmupQuestion();

  const leftFood = foods[warmupQuestion.left];
  const rightFood = foods[warmupQuestion.right];

  await prepareFoodCardPair(
    warmupLeftCard,
    warmupRightCard,
    leftFood,
    rightFood
  );
}

/* // warmup vote */
function voteWarmup(side) {
  if (answered) return;

  const sessionId = gameSessionId;

  answered = true;

  warmupLeftCard.classList.add("disabled", "revealed");
  warmupRightCard.classList.add("disabled", "revealed");

  warmupLeftCard.querySelector(".percentage-overlay").textContent =
    "Thank you";

  warmupRightCard.querySelector(".percentage-overlay").textContent =
    "Thank you";

  if (side === "left") {
    warmupLeftCard.classList.add("correct");
  } else {
    warmupRightCard.classList.add("correct");
  }

  scheduleTimer(() => {
    if (!isCurrentGameSession(sessionId)) return;

    warmupLeftCard.classList.add("fade-out");
    warmupRightCard.classList.add("fade-out");
  }, REVEAL_HOLD_MS);

  scheduleTimer(async () => {
    if (!isCurrentGameSession(sessionId)) return;

    warmupScreen.hidden = true;
    gameScreen.hidden = false;

    renderDots();
    await loadQuestion();
  }, ROUND_TRANSITION_MS);
}
