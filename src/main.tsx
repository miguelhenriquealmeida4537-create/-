import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import '@/styles/globals.css'

const root = document.getElementById('root')
if (!root) throw new Error('Elemento #root não encontrado em index.html')

// Apenas em desenvolvimento: expõe o GSAP para inspeção (removido do build de produção).
if (import.meta.env.DEV) {
  Object.assign(window, { __motionDebug: { gsap, ScrollTrigger } })
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
