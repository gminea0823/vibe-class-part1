import { createBrowserRouter } from 'react-router'
import MainPage from '../page/MainPage'
import Maine from '../page/maine'
import Board from '../page/Board'
import Members from '../page/Members'
import Login from '../page/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { index: true, element: <Maine /> },
      { path: 'board', element: <Board /> },
      { path: 'members', element: <Members /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
