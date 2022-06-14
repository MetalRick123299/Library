// Pop Up Code
// If there are mutlipe Pop Ups change #modal to .modal
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-modal-close]");
const overlay = document.querySelector("#overlay");

const addBookForm = document.querySelector("#addBookForm");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    addBookForm.reset();
    openModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll("#modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

// This is how to Close modal with button if there was one

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest("#modal");
    closeModal(modal);
  });
});

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
