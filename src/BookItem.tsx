import React, { useRef, useState, Dispatch, SetStateAction } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid/esm';
import { IBookItem } from './contexts/BookList';

interface IBookItemProps {
  book: IBookItem;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setInitForm: Dispatch<SetStateAction<IBookItem>>;
}

export default function BookItem({
  book,
  setIsModal,
  setInitForm,
}: IBookItemProps) {
  const [bookDetails, setBookDetails] = useState(book);
  const { title, author, pagesRead, totalPages } = bookDetails;
  const varyRef = useRef<NodeJS.Timer | null>(null);
  let timerID: NodeJS.Timer;

  const startVaryPagesRead = (dir: 'down' | 'up') => {
    if (varyRef.current) return;

    timerID = setTimeout(() => {
      if (dir === 'up') {
        varyRef.current = setInterval(() => {
          setBookDetails((prev) => ({
            ...prev,
            pagesRead: prev.pagesRead + 1,
          }));
        }, 75);
      } else {
        varyRef.current = setInterval(() => {
          setBookDetails((prev) => ({
            ...prev,
            pagesRead: prev.pagesRead - 1,
          }));
        }, 75);
      }
    }, 300);
  };

  const stopVaryPagesRead = () => {
    clearTimeout(timerID);
    if (varyRef.current) {
      clearInterval(varyRef.current);
      varyRef.current = null;

      if (bookDetails.pagesRead / book.totalPages > 1) {
        setBookDetails((prev) => ({ ...prev, pagesRead: prev.totalPages }));
      }
      if (bookDetails.pagesRead < 0) {
        setBookDetails((prev) => ({ ...prev, pagesRead: 0 }));
      }

      // Add API Call to PUT new PageRead
    }
  };

  const handleClick = (dir: 'up' | 'down') => {
    if (dir === 'up') {
      if (pagesRead >= totalPages) {
        setBookDetails((prev) => ({
          ...prev,
          pagesRead: prev.totalPages,
        }));
        return;
      }
      setBookDetails((prev) => ({
        ...prev,
        pagesRead: prev.pagesRead + 1,
      }));
    } else {
      if (pagesRead <= 0) {
        setBookDetails((prev) => ({
          ...prev,
          pagesRead: 0,
        }));
        return;
      }
      setBookDetails((prev) => ({
        ...prev,
        pagesRead: prev.pagesRead - 1,
      }));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const parent = e.currentTarget.parentElement;
    const currtitle = parent?.firstElementChild?.innerHTML;

    // useContext

    // const idx = bookList.findIndex((ele) => ele.title === currtitle);

    // setBookList((prev) => {
    //   const newArr = [...prev];
    //   newArr.splice(idx, 1);
    //   return newArr;
    // });
  };

  const handleEdit = () => {
    setInitForm(bookDetails);
    setIsModal(true);
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
          aria-hidden="false"
          role="button"
          aria-label="Down Arrow"
          className="btn"
          onMouseDown={() => startVaryPagesRead('down')}
          onMouseUp={() => stopVaryPagesRead()}
          onMouseLeave={() => stopVaryPagesRead()}
          onClick={() => handleClick('down')}
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
          aria-hidden="false"
          role="button"
          aria-label="Up Arrow"
          className="btn"
          onMouseDown={() => startVaryPagesRead('up')}
          onMouseUp={() => stopVaryPagesRead()}
          onMouseLeave={() => stopVaryPagesRead()}
          onClick={() => handleClick('up')}
        />
      </div>

      <div className="flex w-full items-center gap-5 justify-evenly">
        <PencilSquareIcon
          role="button"
          className="!h-10 cursor-pointer btn"
          onClick={handleEdit}
          aria-hidden="false"
          aria-label="Edit Book"
        />
        <button
          type="button"
          className="bg-red-500 self-stretch rounded-lg p-1 flex-grow"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
