export default function StatusIcon({
  status,
  icon,
}: {
  status: 'success' | 'warning' | 'error'
  icon: React.ReactNode
}) {
  let colorClass = ''
  switch (status) {
    case 'success':
      colorClass = 'text-green-500'
      break
    case 'warning':
      colorClass = 'text-yellow-400'
      break
    case 'error':
      colorClass = 'text-red-600'
      break
    default:
      colorClass = 'text-gray-400'
  }

  return <div className={colorClass}>{icon}</div>
}
