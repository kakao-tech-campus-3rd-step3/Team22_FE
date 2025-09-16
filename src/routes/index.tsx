import MainPage from '@/pages/MainPage'
import { createFileRoute, redirect } from '@tanstack/react-router'
import useAuthStore from '@/stores/authStore'

export const Route = createFileRoute('/')({
  component: MainPage,
  loader: () => {
    const isLoggedIn = useAuthStore.getState().isLoggedIn
    if (!isLoggedIn) {
      console.log('으아아아ㅏ')
      throw redirect({ to: '/login' })
    }
    return null
  },
})
