import { render, screen, fireEvent } from '@testing-library/react';
import Modal, { emptyForm } from './Modal';
import { IBookItem, BookListProvider } from './contexts/BookList';

describe('Modal Tests', () => {
  const book: IBookItem = {
    title: 'Harry Potter',
    author: 'J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };
  const mockFn = vi.fn();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let modal: any;
  beforeEach(() => {
    modal = render(
      <BookListProvider>
        <Modal isModal setIsModal={mockFn} initForm={emptyForm} />
      </BookListProvider>
    );
  });

  it('Modal Structure', () => {
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
  });
  it('Modal Snapshot', () => {
    expect(modal).toMatchSnapshot();
  });

  it('No Pages Read more than Total Pages', () => {
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
    fireEvent.change(pagesReadInput, { target: { value: book.totalPages } });
    fireEvent.change(totalPagesInput, { target: { value: book.pagesRead } });

    let addBookSubmit = screen.getByRole('button', {
      name: 'Add Book Submit',
    });
    fireEvent.click(addBookSubmit);

    addBookSubmit = screen.getByRole('button', {
      name: 'Add Book Submit',
    });

    expect(addBookSubmit).not.toBe(null);
  });
});
