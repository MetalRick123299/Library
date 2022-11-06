import { useState } from 'react';
import BookItem from './BookItem';

function App() {
  return (
    <div className="min-h-full text-white bg-primary-bg">
      {/* ISSUE-1: Navbar is ugly */}
      {/* ISSUE-1: Navbar doesn't work on mobile */}
      <nav className="bg-primary-nav h-24 grid grid-cols-3 place-items-center fixed inset-0">
        <div className="text-4xl">Library</div>
        <button className="mx-auto text-3xl border-2 border-primary-bg px-6 py-3 rounded-full shadow-xl active:shadow-none active:translate-y-1 transition-all">
          Add Book
        </button>
        <div className="flex gap-3">
          <button className="text-4xl">Sign In</button>
          <img
            className="rounded-full hidden"
            src="https://via.placeholder.com/48"
            alt="Profile Picture"
          />
          <button className="text-2xl hidden">Sign Out</button>
        </div>
      </nav>
      {/* ISSUE-1 Area End */}
      <div className="pt-28 flex gap-10 flex-wrap justify-center items-center">
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
      </div>
    </div>
  );
}

export default App;
