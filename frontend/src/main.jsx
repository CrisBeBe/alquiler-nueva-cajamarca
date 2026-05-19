import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { AnuncioProvider } from './context/AnuncioContext'
import { ConfigProvider } from './context/ConfigContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider>
          <AnuncioProvider>
            <App />
            <ToastContainer position="bottom-right" autoClose={3000} />
          </AnuncioProvider>
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
