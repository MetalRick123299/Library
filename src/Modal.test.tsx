import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { IBookItem } from './BookItem';

describe('Modal Tests', () => {
  const book: IBookItem = {
    title: 'Harry Potter',
    author: 'J.K Rowling',
    pagesRead: 45,
    totalPages: 586,
  };
  const mockFunction = vi.fn();

  it('Modal Structure', () => {
    render(
      <Modal
        isModal
        setIsModal={mockFunction}
        setBookList={mockFunction}
        bookList={[book]}
      />
    );

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
    const modal = render(
      <Modal
        isModal
        setIsModal={mockFunction}
        setBookList={mockFunction}
        bookList={[book]}
      />
    );
    expect(modal).toMatchSnapshot();
  });

  it('Happy Path Submit', () => {});
  it('No Pages Read more than Total Pages', () => {
    render(
      <Modal
        isModal
        setIsModal={mockFunction}
        setBookList={mockFunction}
        bookList={[book]}
      />
    );

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

    const addBookSubmit = screen.getByRole('button', {
      name: 'Add Book Submit',
    });
    fireEvent.click(addBookSubmit);

    // expect form to throw error
  });
});
