export default function StatusIcon({
  status,
  icon,
}: {
  readonly status: 'success' | 'warning' | 'error'
  readonly icon: React.ReactNode
}) {
  const colorMap: Record<typeof status, string> = {
    success: 'text-green-500',
    warning: 'text-yellow-400',
    error: 'text-red-600',
  }
  const colorClass = colorMap[status] || 'text-gray-400'

  return <div className={colorClass}>{icon}</div>
}
