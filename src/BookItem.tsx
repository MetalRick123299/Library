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

  return (
    <div className="bg-primary-item flex flex-col items-center gap-3 p-5 rounded-xl w-64 text-2xl">
      <h2 className="">{title}</h2>
      <span className="">{author}</span>
      <span className="">
        {pagesRead} / {totalPages}
      </span>
      <div className="self-stretch rounded-lg border-2 border-primary-bg text-center relative z-[1]">
        {parseFloat((pagesRead / totalPages).toFixed(4)) * 100}%
        <div
          className="h-full bg-primary-bg p-1 absolute inset-0 -z-[1]"
          style={{
            width: `${parseFloat((pagesRead / totalPages).toFixed(4)) * 100}%`,
          }}
        />
      </div>

      <button type="button" className="bg-red-500 self-stretch rounded-lg p-1">
        Delete
      </button>
    </div>
  );
}
