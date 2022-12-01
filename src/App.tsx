import { useState } from 'react';

import BookItem, { IBookItem } from './BookItem';
import Modal from './Modal';

const book: IBookItem = {
  title: 'Harry Potter',
  author: 'Maybe JK',
  pagesRead: 256,
  totalPages: 586,
};

const books: IBookItem[] = [
  { ...book, title: 'Book Title 1' },
  { ...book, pagesRead: 0, title: 'Book Title 2' },
  { ...book, title: 'Book Title 3' },
  { ...book, pagesRead: book.totalPages, title: 'Book Title 4' },
  { ...book, title: 'Book Title 5' },
];

function App() {
  const [isModal, setIsModal] = useState(false);
  const [bookList, setBookList] = useState<IBookItem[]>(books);

  return (
    <div className="min-h-full text-white bg-primary-bg">
      <Modal
        isModal={isModal}
        setIsModal={setIsModal}
        setBookList={setBookList}
        bookList={bookList}
      />
      {/* ISSUE-1: Navbar is ugly */}
      {/* ISSUE-1: Navbar doesn't work on mobile */}
      <nav className="bg-primary-nav h-24 grid grid-cols-3 place-items-center fixed inset-0 z-[2]">
        <h1 className="text-4xl">Library</h1>
        <button
          type="button"
          className="mx-auto text-3xl border-2 border-primary-bg px-6 py-3 rounded-full shadow-xl active:shadow-none active:translate-y-1 transition-all whitespace-nowrap"
          // onClick={() => setIsModal(true)}
          onClick={() => console.log(bookList)}
        >
          Add Book
        </button>
        <div className="flex gap-3">
          <button type="button" className="text-4xl">
            Sign In
          </button>
          <img
            className="rounded-full hidden"
            src="https://via.placeholder.com/48"
            alt="Profile"
          />
          <button type="button" className="text-2xl hidden">
            Sign Out
          </button>
        </div>
      </nav>
      {/* ISSUE-1 Area End */}
      <div className="pt-28 flex gap-10 flex-wrap justify-center items-center">
        {bookList.map((currBook) => (
          <BookItem
            key={currBook.title}
            book={currBook}
            setBookList={setBookList}
            bookList={bookList}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
