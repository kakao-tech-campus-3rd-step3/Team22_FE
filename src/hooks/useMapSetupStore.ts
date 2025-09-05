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
  latitude: number | null;
  longitude: number | null;
  setWalkTimes: (times: WalkTime[]) => void;
  setLocation: (address: string, place: string, lat: number, lng: number) => void;
}

export const useMapSetupStore = create<MapSetupState>((set) => ({
  walkTimes: [],
  address: '',
  place: '',
  latitude: null,
  longitude: null,
  setWalkTimes: (times) => set({ walkTimes: times }),
  setLocation: (address, place, lat, lng) => set({ address, place, latitude: lat, longitude: lng }),
}))
