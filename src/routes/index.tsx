import MainPage from '@/pages/MainPage'
import { createFileRoute, redirect } from '@tanstack/react-router'
import useAuthStore from '@/stores/authStore'

export const Route = createFileRoute('/')({
  component: MainPage,
  loader: () => {
    const isLoggedIn = useAuthStore.getState().accessToken
    if (!isLoggedIn) {
      throw redirect({ to: '/login' })
    }
    return null
  },
})
