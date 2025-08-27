import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin + '/discover',
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
      useRefreshTokens
      onRedirectCallback={() => {
        window.history.replaceState({}, document.title, '/discover');
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
