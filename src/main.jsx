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
import Settings from './pages/ProfileSettings/Settings.jsx'
import Books from './pages/ProfileSettings/Books.jsx'
import LandingLayout from './Layouts/LandingLayout.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import { store, persistor } from './Redux/Store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const router = createBrowserRouter([
  {
    path:'/',
    element: <LandingLayout/>,
    errorElement: <ErrorPage/>,
    children:[{
      path:'',
      element:<LandingPage/>
    },]
  },
  {
    path:'home',
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
        path:'',
        element:<Details/>
      },{
        path:'settings',
        element:<Settings/>
      },{
        path:'books',
        element:<Books/>
      }]
  }, 
     
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </PersistGate>
  </Provider>
)
