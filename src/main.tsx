import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "modern-normalize";
import "izitoast/dist/css/iziToast.min.css";
import App from './components/App/App';
import "./styles/reset.css";
import "./styles/variables.css";

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);