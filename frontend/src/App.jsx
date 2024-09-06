import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './app.css'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'


function App() {

  const router = createBrowserRouter([
    // регистрация
    {
      path: "/sign-up",
      element: (
        <SignUpPage/>
      ),
    },
    // вход
    {
      path: "/sign-in",
      element: (
       <SignInPage/>
      ),
    },
    // отправка данных
    {
      path: "/data",
      element: (
        <div>
          <h1>*Инпуты*</h1>
        </div>
      ),
    },
    // просмотр результатов
    {
      path: "/results",
      element: (
        <div>
          <h1>*Результаты*</h1>
        </div>
      ),
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
