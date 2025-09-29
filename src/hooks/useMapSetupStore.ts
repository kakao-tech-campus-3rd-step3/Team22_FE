import { create } from 'zustand/react'
import { persist, type PersistStorage } from 'zustand/middleware'

interface WalkTime {
  id: number
  day: string
  hour: string
  minute: string
}

type NewWalkTime = Omit<WalkTime, 'id'>

interface MapSetupState {
  walkTimes: WalkTime[]
  address: string
  place: string
  latitude: number
  longitude: number
  setLocation: (address: string, place: string, lat: number, lng: number) => void
  addWalkTime: (newTime: NewWalkTime) => boolean
  removeWalkTime: (idToRemove: number) => void
}

const localStorageWrapper: PersistStorage<MapSetupState> = {
  getItem: (name) => {
    const stored = localStorage.getItem(name)
    return stored ? Promise.resolve(JSON.parse(stored)) : Promise.resolve(null)
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
    return Promise.resolve()
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
    return Promise.resolve()
  },
}

export const useMapSetupStore = create<MapSetupState>()(
  persist(
    (set, get) => ({
      walkTimes: [],
      address: '',
      place: '',
      latitude: 0,
      longitude: 0,
      setLocation: (address, place, lat, lng) =>
        set({ address, place, latitude: lat, longitude: lng }),

      addWalkTime: (newTime) => {
        const { walkTimes } = get()
        const isDuplicate = walkTimes.some(
          (time) =>
            time.day === newTime.day &&
            time.hour === newTime.hour &&
            time.minute === newTime.minute,
        )
        if (isDuplicate) {
          console.warn('중복된 시간을 추가하려고 합니다.')
          return false
        }
        set((state) => ({
          walkTimes: [...state.walkTimes, { ...newTime, id: Date.now() }],
        }))
        return true
      },

      removeWalkTime: (idToRemove) => {
        set((state) => ({
          walkTimes: state.walkTimes.filter((time) => time.id !== idToRemove),
        }))
      },
    }),
    {
      name: 'map-setup-storage',
      storage: localStorageWrapper,
    },
  ),
)
