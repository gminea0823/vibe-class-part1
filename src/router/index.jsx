import { createBrowserRouter } from 'react-router'
import MainPage from '../page/MainPage'
import Maine from '../page/maine'
import Board from '../page/Board'
import BoardDetail from '../page/BoardDetail'
import Members from '../page/Members'
import Login from '../page/login'
import Join from '../page/Join'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { index: true, element: <Maine /> },
      { path: 'board', element: <Board /> },
      { path: 'board/:boardId', element: <BoardDetail /> },
      { path: 'members', element: <Members /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/join',
    element: <Join />,
  },
])

export default router
