// Library Code
const addBookButton = document.querySelector("#add-book");
const removeBookButtons = document.querySelectorAll(".remove-book");
const changeReadButtons = document.querySelectorAll(".read-buttons");
const booksGrid = document.querySelector(".book-grid");
const bookForm = document.querySelector("#addBookForm");

const testelement = document.querySelector("#test-button");
let testBool = true;

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

// const addBook = () => {};
// addBookButton.addEventListener("click", () => {
//   addBook();
//   const book = new Book();
//   createBookCard(book);
// });

const removeBook = () => {};
removeBookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    removeBook();
  });
});

const changeRead = (button) => {
  if (testBool) {
    button.target.classList.add("read");
    button.target.innerText = "Read";
    testBool = !testBool; // Replace This with changing isRead
  } else {
    button.target.classList.remove("read");
    button.target.innerText = "Not Read";
    testBool = !testBool; // Replace This with changing isRead
  }
};
changeReadButtons.forEach((button) => {
  button.addEventListener("click", (button) => {
    changeRead(button);
  });
});

// testelement.addEventListener("click", () => {
//   addBook();
//   const book = new Book(
//     "Book Title",
//     "You",
//     69,
//     Math.random() > 0.5 ? true : false
//   );
//   createBookCard(book);
// });

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("strong");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  buttonGroup.classList.add("buttons");
  readBtn.classList.add("read-buttons");
  removeBtn.classList.add("read-buttons");
  readBtn.onclick = changeRead;
  removeBtn.onclick = removeBook;

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("read");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.remove("read");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  booksGrid.appendChild(bookCard);
};

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = bookForm.querySelector("#input-title").value;
  const author = bookForm.querySelector("#input-author").value;
  const pages = bookForm.querySelector("#input-pages").value;
  const isRead = bookForm.querySelector("#input-isRead");
  console.log(
    `title -- ${title} - author ${author} -- Pages ${pages} -- isRead ${isRead.checked}`
  );
  const newBook = new Book(title, author, pages, isRead.checked);
  createBookCard(newBook);
});
