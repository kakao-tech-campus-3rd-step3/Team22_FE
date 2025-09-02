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

  // KakaoMap 인터페이스가 비어있지 않도록 수정
  // 지도 인스턴스가 가지는 대표적인 메서드를 하나 추가합니다.
  interface KakaoMap {
    getCenter(): KakaoLatLng;
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
      };
    };
  }
}
