import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  accessToken: string | null
  username: string | null
  email: string | null
  login: (token: string, username: string, email: string) => void
  logout: () => void
  setUsername: (username: string) => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      username: null,
      email: null,
      login: (token: string, username: string, email: string) =>
        set({ accessToken: token, username, email }),
      logout: () => {
        localStorage.clear()
      },
      setUsername: (username: string) => set({ username }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)

export default useAuthStore
