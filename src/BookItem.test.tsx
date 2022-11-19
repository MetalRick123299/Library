import { cleanup, getByRole, render, screen } from '@testing-library/react';
import BookItem, { IBookItem } from './BookItem';

describe('Book Item', () => {
  const book: IBookItem = {
    title: 'Harry Potter',
    author: 'J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };
  const book2: IBookItem = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pagesRead: 104,
    totalPages: 208,
  };
  const book3: IBookItem = {
    title: 'The Lightning Thief',
    author: 'Rick Riordan',
    pagesRead: 372,
    totalPages: 375,
  };
  const bookArray = [book, book2, book3];

  it('BookItem Structure', () => {
    render(<BookItem book={book} />);

    const title = screen.getByRole('heading', { name: book.title });
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

  it('SnapShot', () => {
    const bookItem = render(<BookItem book={book} />);
    expect(bookItem).toMatchSnapshot();
  });

  it('Progress Bar Shows % of current book read', () => {
    bookArray.forEach((currBook) => {
      render(<BookItem book={currBook} />);

      const percentRead = `${
        parseFloat((currBook.pagesRead / currBook.totalPages).toFixed(4)) * 100
      }%`;
      const progressbar = screen.getByText(percentRead);

      expect(progressbar.innerHTML).toContain(percentRead);
      expect(progressbar.innerHTML).toContain(`style="width: ${percentRead};`);
    });
  });
  it.todo('Multiple books', () => {});

  it.todo('User allowed to easlity increases Pages Read', () => {});
  it.todo('Progress Bar Changes as Pages Read / Total Pages Change', () => {});

  it.todo('Delete Button deletes todo', () => {});
  it.todo('Modal for Edit Book', () => {});
  it.todo('Edit Todo Works', () => {});
});
