import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../src/utility/AuthProvider';
import App from './App.tsx';

import './assets/css/index.css';
import './assets/css/layout.css';
import './assets/css/reset.css';

// Import and start MSW for development
// if (
//   process.env.NODE_ENV === 'development' &&
//   import.meta.env.VITE_ENABLE_MSW === 'true'
// ) {
//   // Dynamically import the MSW worker to avoid including it in production builds
//   import('../mocks/browser.js')
//     .then(({ worker }) => worker.start())
//     .catch((err) => console.error('Failed to start MSW', err));
// }

// WRAP <App> with <AuthProvider> to allow <AuthContext> available throughout app
// <AuthContext> handles authentication status (logged in or not)
// if installed @react/google-oauth, wrap everything inside GoogleOAuthProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
