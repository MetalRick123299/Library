import { fireEvent, render, screen } from '@testing-library/react';
import { v4 as uuid } from 'uuid';
import BookItem from './BookItem';
import { IBookItem, BookListProvider } from './contexts/BookList';

describe('Book Item', () => {
  const mockFn = vi.fn();

  const book: IBookItem = {
    bookId: uuid(),
    title: 'Harry Potter',
    author: 'J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };
  const book2: IBookItem = {
    bookId: uuid(),
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pagesRead: 104,
    totalPages: 208,
  };
  const book3: IBookItem = {
    bookId: uuid(),
    title: 'The Lightning Thief',
    author: 'Rick Riordan',
    pagesRead: 372,
    totalPages: 375,
  };
  const bookArray = [book, book2, book3];

  it('BookItem Structure', () => {
    render(
      <BookListProvider>
        <BookItem book={book} setInitForm={mockFn} setIsModal={mockFn} />
      </BookListProvider>
    );

    const title = screen.getByRole('heading', { level: 2, name: book.title });
    const author = screen.getByText(book.author);
    const pagesElement = screen.getByText(
      `${book.pagesRead} / ${book.totalPages}`
    );
    const progress = screen.getByText(
      `${parseFloat((book.pagesRead / book.totalPages).toFixed(4)) * 100}%`
    );
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(title.innerHTML).toBe(book.title);
    expect(author.innerHTML).toBe(book.author);
    expect(pagesElement.innerHTML).toBe(
      `${book.pagesRead} / ${book.totalPages}`
    );
    expect(progress).toBe(progress);
    expect(deleteButton).toBe(deleteButton);
  });
  it('Multiple books', () => {
    bookArray.forEach((currBook) => {
      render(
        <BookListProvider>
          <BookItem book={currBook} setInitForm={mockFn} setIsModal={mockFn} />
        </BookListProvider>
      );

      const title = screen.getByRole('heading', {
        level: 2,
        name: currBook.title,
      });
      const author = screen.getByText(currBook.author);
      const pagesElement = screen.getByText(
        `${currBook.pagesRead} / ${currBook.totalPages}`
      );
      const progress = screen.getByText(
        `${((currBook.pagesRead / currBook.totalPages) * 100).toFixed(2)}%`
      );

      expect(title.innerHTML).toBe(currBook.title);
      expect(author.innerHTML).toBe(currBook.author);
      expect(pagesElement.innerHTML).toContain(
        `${currBook.pagesRead} / ${currBook.totalPages}`
      );
      expect(progress).toBe(progress);
    });
  });

  it('SnapShot', () => {
    const bookItem = render(
      <BookListProvider>
        <BookItem book={book} setInitForm={mockFn} setIsModal={mockFn} />
      </BookListProvider>
    );
    expect(bookItem).toMatchSnapshot();
  });

  it('Progress Bar Shows % of current book read', () => {
    bookArray.forEach((currBook) => {
      render(
        <BookListProvider>
          <BookItem book={currBook} setInitForm={mockFn} setIsModal={mockFn} />
        </BookListProvider>
      );

      const percentRead = `${(
        (currBook.pagesRead / currBook.totalPages) *
        100
      ).toFixed(2)}%`;
      const progressbar = screen.getByText(percentRead);

      expect(progressbar.innerHTML).toContain(percentRead);
      expect(progressbar.innerHTML).toContain(`style="width: ${percentRead};`);
    });
  });
  // Do => 11/26/2022
  it('Progress Bar Click', () => {
    render(
      <BookListProvider>
        <BookItem book={book} setInitForm={mockFn} setIsModal={mockFn} />
      </BookListProvider>
    );
    const pagesElement = screen.getByText(
      `${book.pagesRead} / ${book.totalPages}`
    );
    const upButton = screen.getByRole('button', { name: 'Up Arrow' });
    const downButton = screen.getByRole('button', { name: 'Down Arrow' });
    expect(pagesElement.innerHTML).toBe('45 / 586');
    fireEvent.click(upButton);
    expect(pagesElement.innerHTML).toBe('46 / 586');

    fireEvent.click(downButton);
    expect(pagesElement.innerHTML).toBe('45 / 586');

    fireEvent.click(downButton);
    fireEvent.click(downButton);
    fireEvent.click(upButton);
    expect(pagesElement.innerHTML).toBe('44 / 586');
  });
  it.todo('Progress Bar Hold and Limit Holds (USE CYPRESS)', () => {
    // Hold Up for 3 seconds
    // Check if current pages read = pagesRead + 40
    // Hold Down for 3 seconds
    // Check if current pages read = pagesRead
    // Hold Up for 6 seconds
    // Check if current pages read = pagesRead + 80
  });
  it('Does not pass limits less than 0 CLICK ONLY', () => {
    render(
      <BookListProvider>
        <BookItem
          book={{ ...book, pagesRead: 0 }}
          setInitForm={mockFn}
          setIsModal={mockFn}
        />
      </BookListProvider>
    );
    const pagesElement = screen.getByText(`${0} / ${book.totalPages}`);
    const downButton = screen.getByRole('button', { name: 'Down Arrow' });
    expect(pagesElement.innerHTML).toBe('0 / 586');
    fireEvent.click(downButton);
    expect(pagesElement.innerHTML).toBe('0 / 586');
  });
  it('Does not pass limits greater than totalPages CLICK ONLY', () => {
    render(
      <BookListProvider>
        <BookItem
          book={{ ...book, pagesRead: book.totalPages }}
          setInitForm={mockFn}
          setIsModal={mockFn}
        />
      </BookListProvider>
    );
    const pagesElement = screen.getByText(
      `${book.totalPages} / ${book.totalPages}`
    );
    const upButton = screen.getByRole('button', { name: 'Up Arrow' });
    expect(pagesElement.innerHTML).toBe('586 / 586');
    fireEvent.click(upButton);
    expect(pagesElement.innerHTML).toBe('586 / 586');
  });
});
