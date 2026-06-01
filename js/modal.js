/* // modal state */
let modalAction = null;
let modalCloseTimer = null;

/* // modal dom */
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const modalCopyPanel = document.getElementById("modal-copy-panel");
const modalCopyValue = document.getElementById("modal-copy-value");
const modalCopyText = document.getElementById("modal-copy-text");
const modalCopyBtn = document.getElementById("modal-copy-btn");
const modalBtn = document.getElementById("modal-btn");

/* // show modal */
function showModal(text, buttonText = "OK", action = null) {
  clearTimeout(modalCloseTimer);

  modalText.textContent = text;
  modalCopyPanel.hidden = true;
  modalCopyValue.textContent = "";
  modalCopyText.hidden = true;
  modalCopyText.value = "";
  modalCopyBtn.classList.remove("is-copied");
  modalBtn.textContent = buttonText;
  modalAction = action;

  modal.classList.remove("is-closing");
  modal.hidden = false;

  requestAnimationFrame(() => {
    modal.classList.add("is-open");
  });
}

function showCopyFallbackModal(text) {
  showModal("Copy result", "Done");

  modalCopyPanel.hidden = false;
  modalCopyValue.textContent = text;
  modalCopyText.value = text;
}

async function copyModalResultText() {
  const text = modalCopyText.value;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      modalCopyText.hidden = false;
      modalCopyText.focus();
      modalCopyText.select();
      document.execCommand("copy");
      modalCopyText.hidden = true;
    }

    modalCopyBtn.classList.add("is-copied");
    modalCopyBtn.setAttribute("aria-label", "Copied result");
  } catch (error) {
    modalCopyText.hidden = false;
    modalCopyText.focus();
    modalCopyText.select();
    console.error(error);
  }
}

/* // close modal */
function closeModal() {
  modal.classList.remove("is-open");
  modal.classList.add("is-closing");

  const action = modalAction;
  modalAction = null;

  modalCloseTimer = setTimeout(() => {
    modal.hidden = true;
    modal.classList.remove("is-closing");

    if (action) {
      action();
    }
  }, 240);
}

function resetModalState() {
  clearTimeout(modalCloseTimer);

  modalAction = null;
  modalCloseTimer = null;

  modal.hidden = true;
  modal.classList.remove("is-open", "is-closing");
  modalCopyPanel.hidden = true;
  modalCopyValue.textContent = "";
  modalCopyText.hidden = true;
  modalCopyText.value = "";
  modalCopyBtn.classList.remove("is-copied");
  modalCopyBtn.setAttribute("aria-label", "Copy result");
}

modalCopyBtn.addEventListener("click", copyModalResultText);
