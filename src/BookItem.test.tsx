import { getByRole, render, screen } from '@testing-library/react';
import BookItem, { IBookItem } from './BookItem';

describe('Book Item', () => {
  const book: IBookItem = {
    title: 'Harry Potter',
    author: 'J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };
  it('BookItem Structure', () => {
    render(<BookItem book={book} />);

    const title = screen.getByRole('heading', { name: book.title });
    const author = screen.getByText(book.author);
    const pagesElement = screen.getByText(
      `${book.pagesRead} / ${book.totalPages}`
    );
    // const progress = screen.getByRole('progressbar');
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(title.innerHTML).toBe(book.title);
    expect(author.innerHTML).toBe(book.author);
    expect(pagesElement.innerHTML).toBe(
      `${book.pagesRead} / ${book.totalPages}`
    );
    // expect(progress).toBe(progress);
    expect(deleteButton).toBe(deleteButton);
  });
  it('SnapShot', () => {
    const bookItem = render(<BookItem book={book} />);
    expect(bookItem).toMatchSnapshot();
  });

  it.todo('Progress Bar Shows % of current book read', () => {});
  it.todo('User allowed to easlity increases Pages Read', () => {});
  it.todo('Progress Bar Changes as Pages Read / Total Pages Change', () => {});
  it.todo('Delete Button deletes todo', () => {});
});
