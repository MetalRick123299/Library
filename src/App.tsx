import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from './firebase.config';

import BookItem from './BookItem';
import Modal, { emptyForm } from './Modal';
import { BookListContext } from './contexts/BookList';

function App() {
  const [isModal, setIsModal] = useState(false);
  const [initForm, setInitForm] = useState({ ...emptyForm, bookId: uuid() });
  const { bookList, setBookList } = useContext(BookListContext);

  const [user] = useAuthState(auth);
  const signUserIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signout');
      })
      .catch(() => {
        console.log('Error Signing Out');
      });
  };

  useEffect(() => {
    const getBookList = async () => {
      if (user) {
        // setBookList to User's BookList
        const userBookList = doc(db, `Users/${user.uid}`);
        const mySnapshot = await getDoc(userBookList);

        if (mySnapshot.exists()) {
          setBookList(mySnapshot.data().BookList);
        } else {
          await setDoc(userBookList, {
            BookList: [],
          });
          setBookList([]);
        }
      } else {
        setBookList([]);
      }
    };
    getBookList();
  }, [user]);

  useEffect(() => {
    const updateData = async () => {
      await updateDoc(doc(db, `Users/${user?.uid}`), {
        BookList: bookList,
      });
    };
    console.log('Book List Updated');
    console.log(bookList);
    updateData();
  }, [bookList]);

  return (
    <div className="min-h-full text-white bg-primary-bg">
      <Modal isModal={isModal} setIsModal={setIsModal} initForm={initForm} />
      <nav className="bg-primary-nav h-24 flex items-center fixed inset-0 z-[2]">
        <h1 className="text-4xl mr-auto flex flex-1 justify-center">Library</h1>
        <button
          type="button"
          className=" text-3xl border-2 border-primary-bg px-6 py-3 rounded-full shadow-xl active:shadow-none active:translate-y-1 transition-all whitespace-nowrap flex"
          onClick={() => {
            setInitForm({ ...emptyForm, bookId: uuid() });
            setIsModal(true);
            console.log(bookList);
          }}
        >
          Add Book
        </button>
        <div className="justify-center flex flex-1 justify-self-center">
          {user ? (
            <button className="flex gap-3" type="button" onClick={signUserOut}>
              <img
                className="rounded-full h-10"
                src={user.photoURL ? user.photoURL : ''}
                alt="Profile"
              />
              <span className="text-4xl hidden md:block ">Sign Out</span>
            </button>
          ) : (
            <button
              onClick={signUserIn}
              type="button"
              className="text-4xl hidden md:block "
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* ISSUE-1 Area End */}
      <div className="pt-28 flex gap-10 flex-wrap justify-center items-center">
        {bookList.map((currBook) => (
          <BookItem
            key={currBook.bookId}
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
