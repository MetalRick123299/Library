// Library Code
const addBookButton = document.querySelector("#add-book");
const removeBookButtons = document.querySelectorAll(".remove-book");
const changeReadButtons = document.querySelectorAll(".read-buttons");

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
      return `${title} by ${author}, ${pages} pages, ${
        isRead ? "read" : "not read yet"
      }.`;
    };
  }
}
const Library = [];

const addBook = () => {};
addBookButton.addEventListener("click", () => {
  addBook();
});

const removeBook = () => {};
removeBookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    removeBook();
  });
});

const changeRead = () => {};
changeReadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeRead();
  });
});
