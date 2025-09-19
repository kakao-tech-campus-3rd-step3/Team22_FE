import MyPage from '@/pages/MyPage'
import { createFileRoute, redirect } from '@tanstack/react-router'
import useAuthStore from '@/stores/authStore'

export const Route = createFileRoute('/mypage')({
  component: MyPage,
  beforeLoad: (context) => {
    const isLoggedIn = useAuthStore.getState().accessToken
    if (!isLoggedIn) {
      throw redirect({
        to: '/login',
        search: { redirect: context.location.href },
      })
    }
  },
})
