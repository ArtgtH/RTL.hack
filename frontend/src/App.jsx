import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import viteLogo from '/vite.svg'


function App() {

  const router = createBrowserRouter([
    // регистрация
    {
      path: "/sign-up",
      element: (
        <div>
          <h1>Sign Up</h1>
        </div>
      ),
    },
    // вход
    {
      path: "/sign-in",
      element: (
        <div>
          <h1>Sign In</h1>
        </div>
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
