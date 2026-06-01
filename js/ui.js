/* // card dom */
const warmupLeftCard = document.getElementById("warmup-left-card");
const warmupRightCard = document.getElementById("warmup-right-card");
const progress = document.getElementById("progress");
const leftCard = document.getElementById("left-card");
const rightCard = document.getElementById("right-card");

/* // card timing */
const CARD_ENTER_MS = 500;
let preparedQuestionIndex = null;

/* // get food description */
function getFoodDescription(food) {
  return currentLanguage === "id"
    ? food.description_id
    : food.description_en;
}

/* // create food card */
function createFoodCard(food) {
  return `
    <div class="card-content">
      <img src="${food.image}" class="food-img" alt="${food.name}">
      <div class="percentage-overlay"></div>
      <div class="food-name">${food.name}</div>
      <div class="food-desc">${getFoodDescription(food)}</div>
    </div>
  `;
}

/* // preload card image before reveal */
function preloadFoodImage(food) {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = async () => {
      if (image.decode) {
        try {
          await image.decode();
        } catch (error) {
          /* // continue even if decode is skipped by the browser */
        }
      }

      resolve();
    };

    image.onerror = resolve;
    image.src = food.image;
  });
}

/* // reset card visual state */
function resetCardStyles(card) {
  card.classList.remove(
    "selected",
    "disabled",
    "correct",
    "wrong",
    "revealed",
    "fade-out",
    "round-enter",
    "round-enter-active"
  );
}

/* // render a synced pair of food cards */
async function prepareFoodCardPair(leftCardElement, rightCardElement, leftFood, rightFood) {
  resetCardStyles(leftCardElement);
  resetCardStyles(rightCardElement);

  leftCardElement.classList.add("round-enter");
  rightCardElement.classList.add("round-enter");

  leftCardElement.innerHTML = "";
  rightCardElement.innerHTML = "";

  await Promise.all([
    preloadFoodImage(leftFood),
    preloadFoodImage(rightFood)
  ]);

  leftCardElement.innerHTML = createFoodCard(leftFood);
  rightCardElement.innerHTML = createFoodCard(rightFood);
}

/* // animate a prepared pair into view */
async function revealFoodCardPair(leftCardElement, rightCardElement) {
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));

  leftCardElement.classList.add("round-enter-active");
  rightCardElement.classList.add("round-enter-active");

  leftCardElement.classList.remove("round-enter");
  rightCardElement.classList.remove("round-enter");

  await new Promise((resolve) => setTimeout(resolve, CARD_ENTER_MS));

  leftCardElement.classList.remove("round-enter-active");
  rightCardElement.classList.remove("round-enter-active");
}

/* // render a synced pair of food cards */
async function loadFoodCardPair(leftCardElement, rightCardElement, leftFood, rightFood) {
  await prepareFoodCardPair(leftCardElement, rightCardElement, leftFood, rightFood);
  await revealFoodCardPair(leftCardElement, rightCardElement);
}

/* // clear prepared main-round state */
function clearPreparedQuestion() {
  preparedQuestionIndex = null;
}

/* // render progress dots */
function renderDots() {
  progress.innerHTML = "";

  for (let i = 0; i < randomizedDailyQuestions.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("progress-dot");
    progress.appendChild(dot);
  }
}

/* // update current progress dot */
function updateDot(isCorrect) {
  const dots = document.querySelectorAll(".progress-dot");
  const currentDot = dots[currentQuestion];

  if (!currentDot) return;

  currentDot.classList.add(
    isCorrect ? "correct-dot" : "wrong-dot"
  );

  currentDot.classList.remove("pop");
  void currentDot.offsetWidth;
  currentDot.classList.add("pop");
}

/* // load current question cards */
async function prepareQuestion() {
  const q = randomizedDailyQuestions[currentQuestion];

  const leftFood = foods[q.left];
  const rightFood = foods[q.right];

  await prepareFoodCardPair(leftCard, rightCard, leftFood, rightFood);

  preparedQuestionIndex = currentQuestion;
}

/* // load current question cards */
async function loadQuestion() {
  answered = true;

  if (preparedQuestionIndex !== currentQuestion) {
    await prepareQuestion();
  }

  await revealFoodCardPair(leftCard, rightCard);

  clearPreparedQuestion();

  answered = false;
}
