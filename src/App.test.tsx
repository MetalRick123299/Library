import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { IBookItem } from './BookItem';

describe('Main App', () => {
  const book: IBookItem = {
    title: 'Harry Potter',
    author: 'Not J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let app: any;
  beforeEach(() => {
    app = render(<App />);
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

  it.todo('No Same Named Books', () => {});
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
        item.parentElement?.firstElementChild?.innerHTML === title.innerHTML
    );
    fireEvent.click(deleteButtons[idx]);

    expect(screen.queryByRole('heading', { level: 2, name: book.title })).toBe(
      null
    );
  });

  // Do => 12/01/22 -> Firebase Update
  it.todo('Signing In', () => {});
  it.todo('Signing Out', () => {});
});
