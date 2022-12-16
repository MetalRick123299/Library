import { useContext, useEffect, useState } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import database from './firebase.config';

import BookItem from './BookItem';
import Modal, { emptyForm } from './Modal';
import { BookListContext, IBookItem } from './contexts/BookList';

function App() {
  const [isModal, setIsModal] = useState(false);
  const [initForm, setInitForm] = useState(emptyForm);
  const { bookList, setBookList } = useContext(BookListContext);

  const collectionRef = collection(database, 'BookLists');

  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      setBookList(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as IBookItem;
        })
      );
    });
  });

  return (
    <div className="min-h-full text-white bg-primary-bg">
      <Modal isModal={isModal} setIsModal={setIsModal} initForm={initForm} />
      <nav className="bg-primary-nav h-24 flex items-center fixed inset-0 z-[2]">
        <h1 className="text-4xl mr-auto flex flex-1 justify-center">Library</h1>
        <button
          type="button"
          className=" text-3xl border-2 border-primary-bg px-6 py-3 rounded-full shadow-xl active:shadow-none active:translate-y-1 transition-all whitespace-nowrap flex"
          onClick={() => {
            setInitForm(emptyForm);
            setIsModal(true);
            console.log(bookList);
          }}
        >
          Add Book
        </button>
        <div className="gap-3 justify-center ml-auto flex flex-1 justify-self-center">
          <img
            className="rounded-full h-10"
            src="https://via.placeholder.com/40"
            alt="Profile"
          />
          <button type="button" className="text-4xl hidden md:block ">
            Sign In
          </button>
        </div>
      </nav>
      {/* ISSUE-1 Area End */}
      <div className="pt-28 flex gap-10 flex-wrap justify-center items-center">
        {bookList.map((currBook) => (
          <BookItem
            key={currBook.id}
            book={currBook}
            setInitForm={setInitForm}
            setIsModal={setIsModal}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
