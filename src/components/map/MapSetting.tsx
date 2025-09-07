import React from 'react';

interface MapSettingProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
}

export default function MapSetting({ mapRef }: MapSettingProps) {
  return (
    <div className="relative w-full h-full">
      <div id='map' ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
