import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';

// Register Ionic PWA Elements — required for Capacitor Camera/other plugins to work on web
defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);