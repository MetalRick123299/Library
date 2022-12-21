import { fireEvent, render, screen } from '@testing-library/react';
import { v4 as uuid } from 'uuid';
import App from './App';
import { IBookItem, BookListProvider, books } from './contexts/BookList';

describe('Main App', () => {
  const book: IBookItem = {
    bookId: uuid(),
    title: 'Harry Potter',
    author: 'Not J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };

  const addBook = (bookInput: IBookItem) => {
    const addBookButton = screen.getByRole('button', { name: 'Add Book' });
    fireEvent.click(addBookButton);

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const authorInput = screen.getByRole('textbox', { name: /author/i });
    const pagesReadInput = screen.getByRole('spinbutton', {
      name: /Pages Read/i,
    });
    const totalPagesInput = screen.getByRole('spinbutton', {
      name: /Total Pages/i,
    });

    fireEvent.change(titleInput, { target: { value: bookInput.title } });
    fireEvent.change(authorInput, { target: { value: bookInput.author } });
    fireEvent.change(pagesReadInput, {
      target: { value: bookInput.pagesRead },
    });
    fireEvent.change(totalPagesInput, {
      target: { value: bookInput.totalPages },
    });

    const addBookSubmit = screen.getByRole('button', {
      name: 'Add Book Submit',
    });
    fireEvent.click(addBookSubmit);
  };

  const editBook = (bookInput: IBookItem, editButton: HTMLElement) => {
    fireEvent.click(editButton);

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const authorInput = screen.getByRole('textbox', { name: /author/i });
    const pagesReadInput = screen.getByRole('spinbutton', {
      name: /Pages Read/i,
    });
    const totalPagesInput = screen.getByRole('spinbutton', {
      name: /Total Pages/i,
    });

    fireEvent.change(titleInput, { target: { value: bookInput.title } });
    fireEvent.change(authorInput, { target: { value: bookInput.author } });
    fireEvent.change(pagesReadInput, {
      target: { value: bookInput.pagesRead },
    });
    fireEvent.change(totalPagesInput, {
      target: { value: bookInput.totalPages },
    });

    const editBookSubmit = screen.getByRole('button', {
      name: 'Edit Book Submit',
    });
    fireEvent.click(editBookSubmit);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let app: any;
  beforeEach(() => {
    app = render(
      <BookListProvider>
        <App />
      </BookListProvider>
    );
  });

  it('App Structure', () => {
    const library = screen.getByRole('heading', { level: 1 });
    const addButton = screen.getByRole('button', { name: 'Add Book' });
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    expect(library.innerHTML).toBe('Library');
    expect(addButton.innerHTML).toBe('Add Book');
    expect(signInButton.innerHTML).toBe('Sign In');
  });
  it('Snap Shot', () => {
    expect(app).toMatchSnapshot();
  });

  it('Add Book Modal Appears / Disappears on Click', () => {
    let modal = screen.queryByRole('form', { name: 'Add Book Form' });
    expect(modal).toBe(null);

    const addBookButton = screen.getByRole('button', { name: 'Add Book' });
    fireEvent.click(addBookButton);

    modal = screen.queryByRole('form', { name: 'Add Book Form' });
    expect(modal).not.toBe(null);

    const closeButton = screen.getByRole('button', {
      name: 'Close Form Button',
    });
    fireEvent.click(closeButton);
    modal = screen.queryByRole('form', { name: 'Add Book Form' });
    expect(modal).toBe(null);
  });
  it('Adding a Book', () => {
    addBook(book);

    const title = screen.getByRole('heading', { level: 2, name: book.title });
    const author = screen.getByText(book.author);
    const pagesElement = screen.getByText(
      `${book.pagesRead} / ${book.totalPages}`
    );
    const progress = screen.getByText(
      `${parseFloat((book.pagesRead / book.totalPages).toFixed(4)) * 100}%`
    );

    expect(title.innerHTML).toBe(book.title);
    expect(author.innerHTML).toBe(book.author);
    expect(pagesElement.innerHTML).toBe(
      `${book.pagesRead} / ${book.totalPages}`
    );
    expect(progress).toBe(progress);
  });

  it('No Same Named Books', () => {
    addBook(book);
    addBook(book);

    const modal = screen.queryByRole('form', { name: /add book form/i });
    expect(modal).not.toBe(null);
  });
  it('Deleting a Book', () => {
    const addBookButton = screen.getByRole('button', { name: 'Add Book' });
    fireEvent.click(addBookButton);

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    const authorInput = screen.getByRole('textbox', { name: /author/i });
    const pagesReadInput = screen.getByRole('spinbutton', {
      name: /Pages Read/i,
    });
    const totalPagesInput = screen.getByRole('spinbutton', {
      name: /Total Pages/i,
    });

    fireEvent.change(titleInput, { target: { value: book.title } });
    fireEvent.change(authorInput, { target: { value: book.author } });
    fireEvent.change(pagesReadInput, { target: { value: book.pagesRead } });
    fireEvent.change(totalPagesInput, { target: { value: book.totalPages } });

    const addBookSubmit = screen.getByRole('button', {
      name: 'Add Book Submit',
    });
    fireEvent.click(addBookSubmit);

    const title = screen.getByRole('heading', { level: 2, name: book.title });
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    const idx = deleteButtons.findIndex(
      (item) =>
        item.parentElement?.parentElement?.firstElementChild?.innerHTML ===
        title.innerHTML
    );
    fireEvent.click(deleteButtons[idx]);

    expect(screen.queryByRole('heading', { level: 2, name: book.title })).toBe(
      null
    );
  });

  it('Edit Book -> Happy Path', () => {
    addBook({ ...book, title: 'timmy' });

    let title = screen.getByRole('heading', { level: 2, name: 'timmy' });
    let author = screen.getByText(book.author);
    let pagesElement = screen.getByText(
      `${book.pagesRead} / ${book.totalPages}`
    );
    expect(title.innerHTML).toBe('timmy');
    expect(author.innerHTML).toBe(book.author);
    expect(pagesElement.innerHTML).toBe(
      `${book.pagesRead} / ${book.totalPages}`
    );

    const editButton = screen.getByRole('button', { name: /edit book/i });
    editBook(book, editButton);

    title = screen.getByRole('heading', { level: 2, name: book.title });
    author = screen.getByText(book.author);
    pagesElement = screen.getByText(`${book.pagesRead} / ${book.totalPages}`);
    expect(title.innerHTML).toBe(book.title);
    expect(author.innerHTML).toBe(book.author);
    expect(pagesElement.innerHTML).toBe(
      `${book.pagesRead} / ${book.totalPages}`
    );
  });
  it('Edit Book -> No Same Name', () => {
    addBook({ ...book, title: 'not' });
    addBook(book);

    const editButton = screen.getAllByRole('button', { name: /edit book/i });
    editBook(book, editButton[0]);
    const editBookSubmit = screen.getByRole('button', {
      name: 'Edit Book Submit',
    });
    expect(editBookSubmit).not.toBe(null);
  });

  // // Do => 12/16/22 -> Firebase Update
  // it.todo('Signing In', () => {});
  // it.todo('Signing Out', () => {});
});
