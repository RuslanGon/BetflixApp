import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import ToggleColorMode from './context/ToggleColorMode.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToggleColorMode>
    <BrowserRouter>
    <CssBaseline />
    <App />
    </BrowserRouter>
    </ToggleColorMode>
  </StrictMode>,
)
