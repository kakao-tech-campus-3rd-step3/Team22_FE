import { useEffect } from 'react'
import { useUIStore } from '@/stores/uiStore.ts'

export const useCloseBar = () => {
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)

  useEffect(() => {
    setShowNavbar(false)
  }, [setShowNavbar])
}

export const useShowBar = () => {
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)

  useEffect(() => {
    setShowNavbar(true)
  }, [setShowNavbar])
}
