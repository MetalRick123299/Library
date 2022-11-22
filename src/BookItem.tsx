import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid/esm';

export type IBookItem = {
  title: string;
  author: string;
  pagesRead: number;
  totalPages: number;
};

// TODOs
// Add Fast Book Page movement
// remove selecting outside elements while holding / spam clicking

export default function BookItem({ book }: { book: IBookItem }) {
  const [bookDetails, setBookDetails] = useState(book);
  const { title, author, pagesRead, totalPages } = bookDetails;
  const varyRef = useRef<NodeJS.Timer | null>(null);

  const startVaryPagesRead = (dir: 'down' | 'up') => {
    if (varyRef.current) return;

    if (dir === 'up') {
      varyRef.current = setInterval(() => {
        if (
          bookDetails.pagesRead + 1 < 0 ||
          bookDetails.pagesRead + 1 > bookDetails.totalPages
        )
          return;

        setBookDetails((prev) => ({ ...prev, pagesRead: prev.pagesRead + 1 }));
      }, 75);
    } else {
      varyRef.current = setInterval(() => {
        if (
          bookDetails.pagesRead - 1 < 0 ||
          bookDetails.pagesRead - 1 > bookDetails.totalPages
        )
          return;

        setBookDetails((prev) => ({ ...prev, pagesRead: prev.pagesRead - 1 }));
      }, 75);
    }
  };

  const stopVaryPagesRead = () => {
    if (varyRef.current) {
      clearInterval(varyRef.current);
      varyRef.current = null;

      if (bookDetails.pagesRead / book.totalPages > 1) {
        setBookDetails((prev) => ({ ...prev, pagesRead: prev.totalPages }));
      }

      // Add API Call to PUT new PageRead
    }
  };

  return (
    <div className="bg-primary-item flex flex-col items-center gap-3 p-5 rounded-xl w-64 text-2xl">
      <h2 className="">{title}</h2>
      <span className="">{author}</span>
      <span className="">
        {pagesRead} / {totalPages}
      </span>

      <div className="flex w-full items-center justify-between">
        <ChevronDownIcon
          className="h-8 cursor-pointer transition-all hover:scale-125 active:scale-95"
          onMouseDown={() => startVaryPagesRead('down')}
          onMouseUp={() => stopVaryPagesRead()}
          onMouseLeave={() => stopVaryPagesRead()}
        />

        <div className="w-8/12 rounded-lg border-2 border-primary-bg text-center relative z-[1]">
          {((pagesRead / totalPages) * 100).toFixed(2)}%
          <div
            className="h-full bg-primary-bg absolute inset-0 -z-[1] transition-all max-w-full"
            style={{
              width: `${((pagesRead / totalPages) * 100).toFixed(2)}%`,
            }}
          />
        </div>

        <ChevronUpIcon
          className="h-8 cursor-pointer transition-all hover:scale-125 active:scale-95 z-[1]"
          onMouseDown={() => startVaryPagesRead('up')}
          onMouseUp={() => stopVaryPagesRead()}
          onMouseLeave={() => stopVaryPagesRead()}
        />
      </div>

      <button type="button" className="bg-red-500 self-stretch rounded-lg p-1">
        Delete
      </button>
    </div>
  );
}
