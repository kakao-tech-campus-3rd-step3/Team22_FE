// stores/uiStore.ts
import { create } from 'zustand'

interface UIState {
  showNavbar: boolean
  setShowNavbar: (show: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  showNavbar: true, // 기본 보여주기
  setShowNavbar: (show) => set({ showNavbar: show }),
}))
