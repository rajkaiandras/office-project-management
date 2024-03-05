import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.jsx';

import { AuthContextProvider } from './contexts/auth-context.jsx';
import { ThemeContextProvider } from './contexts/theme-context.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
