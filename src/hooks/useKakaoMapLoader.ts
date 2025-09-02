import { useEffect, useState } from "react";

export default function useKakaoMapLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_JS_KEY
    }&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true); // SDK 준비 완료
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return loaded;
}
