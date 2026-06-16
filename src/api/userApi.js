import axios from 'axios'

const api = axios.create({
  baseURL: '',
})

export async function login(userId, passwd) {
  const params = new URLSearchParams()
  params.append('userId', userId)
  params.append('passwd', passwd)
  const res = await api.post('/api/v1/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return res.data
}

export async function checkUserId(userId) {
  const res = await api.get('/api/v1/users/check-id', { params: { userId } })
  return res.data
}

export async function signup(data) {
  const res = await api.post('/api/v1/users/signup', data)
  return res.data
}
