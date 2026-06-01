/* // result dom */
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");
const matchupBreakdown = document.getElementById("matchup-breakdown");
const resultDots = document.getElementById("result-dots");
const copyResultBtn = document.getElementById("copy-result-btn");

function resetCopyResultButtonSoon() {
  scheduleTimer(() => {
    if (!resultScreen.hidden) {
      copyResultBtn.textContent = "Copy Result";
    }
  }, 1800);
}

/* // render result dots */
function renderResultDots() {
  resultDots.innerHTML = "";

  roundHistory.forEach((round) => {
    const dot = document.createElement("div");

    dot.classList.add("result-dot");
    dot.classList.add(round.isCorrect ? "correct" : "wrong");

    resultDots.appendChild(dot);
  });
}

/* // render matchup percentage bars */
function renderMatchupBreakdown() {
  matchupBreakdown.innerHTML = "";

  roundHistory.forEach((round) => {
    const row = document.createElement("div");

    row.classList.add("matchup-row");

    row.innerHTML = `
      <div class="matchup-food left">
        ${round.leftName}
      </div>

      <div class="matchup-bar">
        <div
          class="matchup-bar-left"
          style="width: ${round.leftPercentage}%"
        >
          <span class="matchup-percent">
            ${round.leftPercentage}%
          </span>
        </div>

        <div
          class="matchup-bar-right"
          style="width: ${round.rightPercentage}%"
        >
          <span class="matchup-percent">
            ${round.rightPercentage}%
          </span>
        </div>
      </div>

      <div class="matchup-food right">
        ${round.rightName}
      </div>
    `;

    matchupBreakdown.appendChild(row);
  });
}

/* // get result message */
function getResultMessage() {
  if (score === randomizedDailyQuestions.length) {
    return "\uD83C\uDFC6 Certified Nusantara Taste Master";
  }

  if (score >= Math.ceil(randomizedDailyQuestions.length * 0.7)) {
    return "\uD83C\uDF5B Your taste is crowd-approved";
  }

  if (score >= Math.ceil(randomizedDailyQuestions.length * 0.4)) {
    return "\uD83C\uDF36\uFE0F Spicy choices, mixed results";
  }

  return "\uD83D\uDC80 The crowd does not understand your taste.";
}

/* // show final result */
function showFinalResult() {
  if (!isPracticeMode) {
    saveTodayResult();
  }

  gameScreen.hidden = true;
  resultScreen.hidden = false;

  finalScore.textContent = `${score}/${randomizedDailyQuestions.length}`;
  finalMessage.textContent = getResultMessage();
  copyResultBtn.textContent = "Copy Result";
  copyResultBtn.hidden = isPracticeMode;

  renderResultDots();
  renderMatchupBreakdown();
}

/* // copy result */
async function copyResult() {
  const modeText = isPracticeMode ? "Practice Mode" : "today";

  const text =
    `IndoFoodle ${modeText}: ${score}/${randomizedDailyQuestions.length}\uD83C\uDF5B`;

  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error("Clipboard API is unavailable");
    }

    await navigator.clipboard.writeText(text);
    copyResultBtn.textContent = "Copied!";
    resetCopyResultButtonSoon();
  } catch (error) {
    copyResultBtn.textContent = "Copy manually";
    showCopyFallbackModal(text);
    resetCopyResultButtonSoon();
    console.error(error);
  }
}
