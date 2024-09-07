import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './app.css'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import DataPage from './components/DataPage/DataPage'
import Provider from './components/Provider/Provider'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import ResultPage from './components/ResultPage/ResultPage'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
      <Provider>
        <Header/>
        <Outlet/>
      </Provider>,
      children: [
        {
          index: true,
          element: <></>
        },
        // регистрация
        {
          path: "sign-up",
          element: (
            <SignUpPage/>
          ),
        },
        // вход
        {
          path: "sign-in",
          element: (
          <SignInPage/>
          ),
        },
        // отправка данных
        {
          path: "data",
          element: (
            <DataPage />
          ),
        },
        // просмотр результатов
        {
          path: "results",
          element: (
            <ResultPage/>
          )
        },
      ]
    },
  ])

  return (
    <>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </>
  )
}

export default App
