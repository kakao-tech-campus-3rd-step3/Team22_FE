export {};

declare global {
  interface KakaoLatLng {
    getLat(): number;
    getLng(): number;
  }

  interface KakaoMapOptions {
    center: KakaoLatLng;
    level: number;
  }

  interface KakaoMap {
    getCenter(): KakaoLatLng;
  }

  interface KakaoMarkerOptions {
    position: KakaoLatLng;
    map?: KakaoMap;
    image?: string;
    title?: string;
  }

  interface KakaoMarker {
    setMap(map: KakaoMap | null): void;
    getPosition(): KakaoLatLng;
  }

  interface KakaoCustomOverlayOptions {
    position: KakaoLatLng;
    content: HTMLElement | string;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
  }

  interface KakaoCustomOverlay {
    setMap(map: KakaoMap | null): void;
    setPosition(position: KakaoLatLng): void;
  }

  interface Window {
    kakao: {
      maps: {
        load(callback: () => void): void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (
          container: HTMLElement | null,
          options: KakaoMapOptions,
        ) => KakaoMap;
        Marker: new (options: KakaoMarkerOptions) => KakaoMarker;

        CustomOverlay: new (
          options: KakaoCustomOverlayOptions
        ) => KakaoCustomOverlay;
      };
    };
  }
}
