/* // event listeners */
startBtn.addEventListener("click", async () => {
  try {
    await startDailyGame();
  } catch (error) {
    showModal(
      "Food data failed to load. Please check data/foods.json.",
      "OK"
    );

    console.error(error);
  }
});

practiceBtn.addEventListener("click", async () => {
  try {
    await startPracticeGame();
  } catch (error) {
    showModal(
      "Food data failed to load. Please check data/foods.json.",
      "OK"
    );

    console.error(error);
  }
});

warmupLeftCard.addEventListener("click", () => {
  voteWarmup("left");
});

warmupRightCard.addEventListener("click", () => {
  voteWarmup("right");
});

leftCard.addEventListener("click", () => {
  choose("left");
});

rightCard.addEventListener("click", () => {
  choose("right");
});

copyResultBtn.addEventListener("click", copyResult);

restartBtn.addEventListener("click", restartGame);

topbarLogoBtn.addEventListener("click", restartGame);

modalBtn.addEventListener("click", closeModal);
