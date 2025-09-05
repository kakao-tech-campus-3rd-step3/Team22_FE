import { create } from 'zustand/react'

interface WalkTime {
  id: number;
  day: string;
  hour: string;
  minute: string;
}

interface MapSetupState {
  walkTimes: WalkTime[];
  address: string;
  place: string;
  setWalkTimes: (times: WalkTime[]) => void;
  setLocation: (address: string, place: string) => void;
}

export const useMapSetupStore = create<MapSetupState>((set) => ({
  walkTimes: [],
  address: '',
  place: '',
  setWalkTimes: (times) => set({ walkTimes: times }),
  setLocation: (address, place) => set({ address, place }),
}))
