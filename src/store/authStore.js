import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useAuthStore = create(
  persist(
    immer((set) => ({
      token: null,
      userId: null,
      name: null,
      isLoggedIn: false,
      setAuth: (data) =>
        set((state) => {
          state.token = data.accessToken
          state.userId = data.userId
          state.name = data.name
          state.isLoggedIn = true
        }),
      logout: () =>
        set((state) => {
          state.token = null
          state.userId = null
          state.name = null
          state.isLoggedIn = false
        }),
    })),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
