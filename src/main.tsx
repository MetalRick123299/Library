import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookListProvider } from './contexts/BookList';
import './css-reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* BookListProvider Needs to Be Here */}
    <BookListProvider>
      <App />
    </BookListProvider>
  </React.StrictMode>
);
