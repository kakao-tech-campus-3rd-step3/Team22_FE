import { create } from 'zustand'

type SetupState = {
  isPetSettingDone: boolean
  isLocationSettingDone: boolean
  isRouteDrawDone: boolean
  setPetSettingDone: (value: boolean) => void
  setLocationSettingDone: (value: boolean) => void
  setRouteDrawDone: (value: boolean) => void
  resetAll: () => void
}

export const useSetupStore = create<SetupState>((set) => ({
  isPetSettingDone: false,
  isLocationSettingDone: false,
  isRouteDrawDone: false,
  setPetSettingDone: (value) => set({ isPetSettingDone: value }),
  setLocationSettingDone: (value) => set({ isLocationSettingDone: value }),
  setRouteDrawDone: (value) => set({ isRouteDrawDone: value }),
  resetAll: () =>
    set({
      isPetSettingDone: false,
      isLocationSettingDone: false,
      isRouteDrawDone: false,
    }),
}))
