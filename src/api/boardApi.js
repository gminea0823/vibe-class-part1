import axios from 'axios'
import useAuthStore from '../store/authStore'

const api = axios.create({ baseURL: '' })

function authHeader() {
  const token = useAuthStore.getState().token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getBoards(page, size = 10) {
  const res = await api.get('/api/v1/boards', { params: { page: page - 1, size } })
  return res.data
}

export async function getBoardDetail(boardId) {
  const res = await api.get(`/api/v1/boards/${boardId}`)
  return res.data
}

export async function createBoard(title, contents) {
  const res = await api.post('/api/v1/boards', { title, contents }, { headers: authHeader() })
  return res.data
}

export async function updateBoard(boardId, title, contents) {
  const res = await api.patch(`/api/v1/boards/${boardId}`, { title, contents }, { headers: authHeader() })
  return res.data
}

export async function deleteBoards(boardIds) {
  const res = await api.delete('/api/v1/boards', {
    params: { boardIds: boardIds.join(',') },
    headers: authHeader(),
  })
  return res.data
}
