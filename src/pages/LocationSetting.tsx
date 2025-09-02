import MapSetting from '@/components/map/MapSetting.tsx'
import { MapCenterMarker } from '@/components/map/MapCenterMarker.tsx'
import ButtonBar from '@/components/map/ButtonBar.tsx'

export default function LocationSetting() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <MapCenterMarker />
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 20,
        pointerEvents: 'auto',
      }}>
        <ButtonBar />
      </div>
      <MapSetting />
    </div>
  )
}
