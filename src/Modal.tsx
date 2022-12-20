import clsx from 'clsx';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from 'react';
import { v4 as uuid } from 'uuid';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { IBookItem, BookListContext } from './contexts/BookList';

export const emptyForm: IBookItem = {
  bookId: uuid(),
  title: '',
  author: '',
  pagesRead: 0,
  totalPages: 0,
};

interface ModalProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  initForm: IBookItem;
}

export default function Modal({ isModal, setIsModal, initForm }: ModalProps) {
  const { bookList, setBookList } = useContext(BookListContext);

  const [formInputs, setFormInputs] = useState<IBookItem>(initForm);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setFormInputs(initForm);

    if (initForm.title === '') {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [isModal]);

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
    // Only Destructuring things that need to be checked
    const { title, pagesRead, totalPages } = formInputs;

    e.preventDefault();

    if (pagesRead > totalPages) return;
    if (totalPages <= 0 || pagesRead < 0) return;

    const initIdx = bookList.findIndex((ele) => ele.title === initForm.title);
    const idx = bookList.findIndex((ele) => ele.title === title);

    // If is Editing and title doesn't exist in bookList
    if (isEdit && (idx === -1 || idx === initIdx)) {
      setBookList((prev) => {
        const newArr = [...prev];
        newArr[initIdx] = formInputs;
        return [...newArr];
      });
      // If not Edit and not in bookList
    } else if (!isEdit && idx === -1) {
      setBookList((prev) => [...prev, formInputs]);
    } else return;

    setIsModal(false);
    setFormInputs({ ...emptyForm, bookId: uuid() });
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
        aria-label={`${isEdit ? 'Edit' : 'Add'} Book Form`}
        onSubmit={(e) => handleSubmit(e)}
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
          <button
            type="submit"
            className=""
            aria-label={`${isEdit ? 'Edit' : 'Add'} Book Submit`}
          >
            {`${isEdit ? 'Edit' : 'Add'} Form`}
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
