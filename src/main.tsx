import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Announcements from './pages/Announcements.tsx'
import PastEvents from './pages/PastEvents.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/*', element: <NotFoundPage/>},
  {path: '/announcements', element: <Announcements/> },
  {path: '/past-events', element: <PastEvents/>},
  //{path: '/login', element: <LoginPage />},
  //{path: '/events'},
  //{path: '/events/:id'}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
