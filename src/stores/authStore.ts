import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  accessToken: string | null
  username: string | null
  login: (token: string, username: string) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      username: null,
      email: null,
      login: (token: string, username: string) => set({ accessToken: token, username }),
      logout: () => set({ accessToken: null, username: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)

export default useAuthStore
