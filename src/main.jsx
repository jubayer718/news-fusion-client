import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Router/routes.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import PrivateRoute from './Router/PrivateRoute/PrivateRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
       <AuthProvider>

   <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
   
  </StrictMode>,
)
