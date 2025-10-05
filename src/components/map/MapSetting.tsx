export default function MapSetting(props: { mapRef: React.RefObject<HTMLDivElement | null> }) {
  const { mapRef } = props
  return (
    <div className="w-full h-full">
      <div id="map" ref={mapRef} className="w-full h-full" />
    </div>
  )
}
