import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.scss'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css';
import { AuthProvider } from './contexts/AuthContext.tsx'
import '@mantine/notifications/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)