export default function MapSetting(props: { mapRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative w-full h-full">
      <div id="map" ref={props.mapRef} className="w-full h-full" />
    </div>
  )
}
