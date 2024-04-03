import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// import { Auth0Provider } from '@auth0/auth0-react';
// import { ConvexReactClient } from "convex/react";
// import { ConvexProviderWithAuth0 } from "convex/react-auth0";


// const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
