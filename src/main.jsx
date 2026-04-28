import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useSelector, useDispatch } from 'react-redux'
import { setUserStatus } from './Redux/UserStatus/UserStatus'
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
import SearchResultPage from './pages/searchResultPage/searchResultPage.jsx'
import BookPage from './pages/bookPage/BookPage.jsx'
import { store, persistor } from './Redux/Store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


function ThemeSync() {
  const darkModeState = useSelector((state) => state.darkMode.isDarkMode)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkModeState)
  }, [darkModeState])
  return null
}

function AuthSync() {
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          dispatch(setUserStatus({ isLoggedIn: true, userInfo: data.data.user, isAdmin: false }))
        }
      } catch {
        // no valid cookie, stay logged out
      }
    }
    checkAuth()
  }, [dispatch])
  return null
}

const router = createBrowserRouter([
  {
    path:'/',
    element: <LandingLayout/>,
    errorElement: <ErrorPage/>,
    children:[{
      path:'',
      element:<LandingPage/>
    }]
  },
  {
    path:'home',
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children:[{
      path:'',
      element:<MainContent/>
    },
  {
      path:'search?q=${search}',
      element:<SearchResultPage/>
    },{
      path:'book/:id',
      element:<BookPage/>
    }]
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
      <ThemeSync />
      <AuthSync />
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </PersistGate>
  </Provider>
)
