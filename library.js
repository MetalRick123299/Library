// Library Code
const addBookButton = document.querySelector("#add-book");

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

const removeBook = () => {};
