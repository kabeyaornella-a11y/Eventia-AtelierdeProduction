import { createRoot } from 'react-dom/client';
import { setBaseUrl } from '@workspace/api-client-react';

import App from './App';
import './index.css';

// Configure l'URL de l'API (Railway en prod, relatif en dev)
const apiBase = import.meta.env.VITE_API_BASE ?? '';
setBaseUrl(apiBase || null);

// Pour les fetch manuels dans les pages
(window as any).__API_BASE__ = apiBase;

createRoot(document.getElementById('root')!).render(<App />);
