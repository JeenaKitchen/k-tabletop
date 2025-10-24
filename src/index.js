import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Modal from 'react-modal';
import './index.css';
import App from './App';

// Set the app element for react-modal
Modal.setAppElement('#root');

const rootElement = document.getElementById('root');

// Use hydrate for pre-rendered content, createRoot for client-side only
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} 