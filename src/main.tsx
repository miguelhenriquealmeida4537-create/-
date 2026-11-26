import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App'
import '@/styles/globals.css'

const root = document.getElementById('root')
if (!root) throw new Error('Elemento #root não encontrado em index.html')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Build de produção: o HTML já vem pré-renderizado → o React só "hidrata".
// Desenvolvimento (npm run dev): renderização normal no navegador.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
