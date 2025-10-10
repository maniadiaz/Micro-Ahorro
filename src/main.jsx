import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Loading from './app/components/Loading/Loading';
import './index.css'
import App from './App.jsx'
import './config/i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
