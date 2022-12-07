/* eslint-disable import/prefer-default-export */
import React, {
  createContext,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useContext,
} from 'react';

export type IBookItem = {
  title: string;
  author: string;
  pagesRead: number;
  totalPages: number;
};

const book: IBookItem = {
  title: 'Harry Potter',
  author: 'Maybe JK',
  pagesRead: 256,
  totalPages: 586,
};

export const books: IBookItem[] = [
  { ...book, title: 'Book Title 1' },
  { ...book, pagesRead: 0, title: 'Book Title 2' },
  { ...book, title: 'Book Title 3' },
  { ...book, pagesRead: book.totalPages, title: 'Book Title 4' },
  { ...book, title: 'Book Title 5' },
];

interface IBookListContext {
  bookList: IBookItem[];
  setBookList: Dispatch<SetStateAction<IBookItem[]>>;
}
export const BookListContext = createContext<IBookListContext>(null!);
BookListContext.displayName = 'BookListContext';

export function BookListProvider({ children }: { children: ReactNode }) {
  const [bookList, setBookList] = useState<IBookItem[]>(books);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BookListContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BookListContext.Provider>
  );
}
