export {};

declare global {
  interface KakaoPoint {
    x: number;
    y: number;
  }

  interface KakaoSize {
    width: number;
    height: number;
  }

  interface KakaoMarkerImageOptions {
    offset?: KakaoPoint;
  }

  type KakaoMarkerImage = object;

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
    panTo(position: KakaoLatLng): void;
  }

  interface KakaoMarkerOptions {
    position: KakaoLatLng;
    map?: KakaoMap;
    image?: KakaoMarkerImage;
    title?: string;
  }

  interface KakaoMarker {
    setMap(map: KakaoMap | null): void;
    getPosition(): KakaoLatLng;
    setPosition(position: KakaoLatLng): void;
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

  type KakaoStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

  interface KakaoAddress {
    address_name: string;
  }

  interface KakaoRoadAddress {
    address_name: string;
  }

  interface KakaoGeocodeResult {
    address: KakaoAddress;
    road_address: KakaoRoadAddress | null;
  }

  interface KakaoPlaceResult {
    place_name: string;
    distance: string;
  }

  interface KakaoPagination {
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    current: number;
    nextPage(): void;
    prevPage(): void;
    gotoPage(page: number): void;
  }

  interface IKakaoGeocoder {
    coord2Address(
      lng: number,
      lat: number,
      callback: (result: KakaoGeocodeResult[], status: KakaoStatus) => void
    ): void;
  }

  interface IKakaoPlaces {
    keywordSearch(
      keyword: string,
      callback: (result: KakaoPlaceResult[], status: KakaoStatus, pagination: KakaoPagination) => void,
      options?: {
        location?: KakaoLatLng;
        radius?: number;
      }
    ): void;
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

        Size: new (width: number, height: number) => KakaoSize;
        Point: new (x: number, y: number) => KakaoPoint;

        MarkerImage: new (
          src: string,
          size: KakaoSize,
          options?: KakaoMarkerImageOptions,
        ) => KakaoMarkerImage;

        services: {
          Status: {
            OK: 'OK';
            ZERO_RESULT: 'ZERO_RESULT';
            ERROR: 'ERROR';
          };
          Geocoder: new () => IKakaoGeocoder;
          Places: new () => IKakaoPlaces;
        };

        event: {
          addListener(target: KakaoMap | KakaoMarker | KakaoCustomOverlay, type: string, handler: () => void): void;
          removeListener(target: KakaoMap | KakaoMarker | KakaoCustomOverlay, type: string, handler: () => void): void;
        }
      };
    };
  }
}
