import { useEffect, useRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { LocationDotIcon } from '@/assets/icons/LocationDotIcon.tsx'

interface UseKakaoMapProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  location: { latitude: number; longitude: number } | null;
  loaded: boolean;
}

export default function useKakaoMap({ mapRef, location, loaded }: UseKakaoMapProps) {
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (!mapRef?.current || !location || !loaded) return;

    const currentPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);

    const mapOptions = {
      center: currentPosition,
      level: 3
    }
    const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

    const customOverlayContent = document.createElement('div');
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: currentPosition,
      content: customOverlayContent,
      xAnchor: 0.5,
      yAnchor: 0.5,
    });
    customOverlay.setMap(map);

    rootRef.current = createRoot(customOverlayContent);
    rootRef.current?.render(<LocationDotIcon />);

    return () => {
      if (rootRef.current) {
        rootRef.current?.unmount();
        rootRef.current = null;
      }
      customOverlay.setMap(null);
    }
  }, [mapRef, location, loaded])
}
