import React from 'react';
import { StrictMode } from 'react';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<StrictMode>
  <App />
</StrictMode>);