import { render, screen } from '@testing-library/react';
import App from './App';

describe('Main App', () => {
  it('App Structure', () => {
    render(<App />);
    const library = screen.getByRole('heading', { level: 1 });
    const addButton = screen.getByRole('button', { name: 'Add Book' });
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    expect(library.innerHTML).toBe('Library');
    expect(addButton.innerHTML).toBe('Add Book');
    expect(signInButton.innerHTML).toBe('Sign In');
  });
  it('Snap Shot', () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
  it.todo('Adding a Book', () => {});
  it.todo('Add Book Modal', () => {});

  it.todo('Signing In', () => {});
  it.todo('Signing Out', () => {});
});
