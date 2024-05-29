import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css';
import { AuthProvider } from './services/AuthContext.tsx'
import '@mantine/notifications/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: []
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)