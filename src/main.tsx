import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './assets/css/index.css';
import './assets/css/layout.css';
import './assets/css/reset.css';

// Import and start MSW for development
if (process.env.NODE_ENV === 'development') {
  // Dynamically import the MSW worker to avoid including it in production builds
  import('../mocks/browser.js')
    .then(({ worker }) => worker.start())
    .catch((err) => console.error('Failed to start MSW', err));
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
