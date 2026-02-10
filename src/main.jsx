import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorPage from './pages/ErrorPage.jsx'

import './index.css'
import { createBrowserRouter,
  RouterProvider
 } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout.jsx'
import MainContent from './components/MainContent.jsx'
import ProfileLayout from './Layouts/ProfileLayout.jsx'
import Details from './pages/ProfileSettings/Details.jsx'


const router = createBrowserRouter([
  {
    path:'',
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children:[{
      path:'',
      element:<MainContent/>
    },]
  },
  {
    path:'profile',
    element:<ProfileLayout/>,
    errorElement: <ErrorPage/>,
    children:[{
        path:'details',
        element:<Details/>
      },]
  }, 
     
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
