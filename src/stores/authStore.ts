import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isLoggedIn: boolean
  accessToken: string | null
  username: string | null // string | null로 명확하게
  login: (token: string, username: string) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      username: null,
      login: (token: string, username: string) =>
        set({ isLoggedIn: true, accessToken: token, username }),
      logout: () => set({ isLoggedIn: false, accessToken: null, username: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)

export default useAuthStore
