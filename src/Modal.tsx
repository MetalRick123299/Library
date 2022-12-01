import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { IBookItem } from './BookItem';

interface ModalProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<IBookItem[]>>;
  bookList: IBookItem[];
}

const emptyForm: IBookItem = {
  title: '',
  author: '',
  pagesRead: 0,
  totalPages: 0,
};

export default function Modal({
  isModal,
  setIsModal,
  setBookList,
  bookList,
}: ModalProps) {
  const [formInputs, setFormInputs] = useState<IBookItem>(emptyForm);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const currName = e.currentTarget.name.replace(/\s/g, '');
    let currValue: string | number = e.currentTarget.value;

    if (
      currValue !== '' &&
      (currName === 'totalPages' || currName === 'pagesRead')
    ) {
      currValue = parseInt(e.currentTarget.value, 10);
    }
    setFormInputs((prev) => ({ ...prev, [currName]: currValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { title, pagesRead, totalPages } = formInputs;
    e.preventDefault();

    if (bookList.findIndex((ele) => ele.title === title) !== -1) return;
    if (pagesRead > totalPages) return;

    setBookList((prev) => [...prev, formInputs]);
    setIsModal(false);
    setFormInputs(emptyForm);
  };

  return (
    <div
      className={clsx(
        'fixed flex flex-col justify-center items-center h-screen w-screen bg-black/60 z-10 text-xl transition-all',
        isModal ? 'scale-100' : 'scale-0'
      )}
      aria-hidden={isModal ? 'false' : 'true'}
    >
      <form
        action=""
        className="flex flex-col items-center gap-3 bg-primary-bg p-5 rounded-xl border-primary-nav border-8"
        aria-label="Add Book Form"
        onSubmit={handleSubmit}
      >
        <label className="">
          Search Book
          <input
            className="bg-primary-item block rounded-md px-2 py-1 mt-1"
            type="text"
            name="search Book"
          />
        </label>

        <div className="text-2xl -mb-3 font-semibold">OR</div>

        <label className="">
          Title
          <input
            className="bg-primary-item block rounded-md px-2 py-1 mt-1"
            type="text"
            name="title"
            value={formInputs.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="">
          Author
          <input
            className="bg-primary-item block rounded-md px-2 py-1 mt-1"
            type="text"
            name="author"
            value={formInputs.author}
            onChange={handleChange}
            required
          />
        </label>

        <label className="">
          Pages Read
          <input
            type="number"
            className="bg-primary-item block rounded-md px-2 py-1 mt-1"
            name="pages Read"
            value={formInputs.pagesRead}
            onChange={handleChange}
            required
          />
        </label>

        <label className="">
          Total Pages
          <input
            type="number"
            className="bg-primary-item block rounded-md px-2 py-1 mt-1"
            name="total Pages"
            value={formInputs.totalPages}
            onChange={handleChange}
            required
          />
        </label>

        <div className="flex items-start gap-3 bg-primary-item p-3 rounded-xl">
          <button type="submit" className="" aria-label="Add Book Submit">
            Add Book
          </button>
          <XCircleIcon
            className="btn inline !h-7"
            role="button"
            aria-hidden="false"
            aria-label="Close Form Button"
            onClick={() => setIsModal(false)}
          />
        </div>
      </form>
    </div>
  );
}
