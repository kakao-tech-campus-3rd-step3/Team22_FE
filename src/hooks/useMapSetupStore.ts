import { create } from 'zustand/react'

interface WalkTime {
  id: number;
  day: string;
  hour: string;
  minute: string;
}

type NewWalkTime = Omit<WalkTime, 'id'>;

interface MapSetupState {
  walkTimes: WalkTime[];
  address: string;
  place: string;
  latitude: number | null;
  longitude: number | null;
  setLocation: (address: string, place: string, lat: number, lng: number) => void;
  addWalkTime: (newTime: NewWalkTime) => boolean;
  removeWalkTime: (idToRemove: number) => void;
}

export const useMapSetupStore = create<MapSetupState>((set, get) => ({
  walkTimes: [],
  address: '',
  place: '',
  latitude: null,
  longitude: null,
  setLocation: (address, place, lat, lng) => set({ address, place, latitude: lat, longitude: lng }),

  addWalkTime: (newTime) => {
    const { walkTimes } = get();

    const isDuplicate = walkTimes.some(
      (time) =>
        time.day === newTime.day &&
        time.hour === newTime.hour &&
        time.minute === newTime.minute
    );

    if (isDuplicate) {
      console.warn("중복된 시간을 추가하려고 합니다.");
      return false;
    }

    set((state) => ({
      walkTimes: [...state.walkTimes, { ...newTime, id: Date.now() }],
    }));
    return true;
  },

  removeWalkTime: (idToRemove) => {
    set((state) => ({
      walkTimes: state.walkTimes.filter((time) => time.id !== idToRemove),
    }));
  },
}));
