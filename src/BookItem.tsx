import React, { useState } from 'react';
import clsx from 'clsx';

export type IBookItem = {
  title: string;
  author: string;
  pagesRead: number;
  totalPages: number;
};

export default function BookItem({ book }: { book: IBookItem }) {
  const { title, author, pagesRead, totalPages } = book;
  const [isRead, setIsRead] = useState(false);
  const changeRead = () => {
    setIsRead((prev) => !prev);
  };

  return (
    <div className="bg-primary-item flex flex-col items-center gap-3 p-5 rounded-xl w-64 text-2xl">
      <h2 className="">{title}</h2>
      <span className="">{author}</span>
      <span className="">
        {pagesRead} / {totalPages}
      </span>
      <button
        type="button"
        className={clsx(
          'self-stretch rounded-lg p-1',
          isRead ? 'bg-green-500' : 'bg-red-500'
        )}
        onClick={changeRead}
      >
        {isRead ? 'Read' : 'Not Read'}
      </button>
      <button type="button" className="bg-red-500 self-stretch rounded-lg p-1">
        Delete
      </button>
    </div>
  );
}
