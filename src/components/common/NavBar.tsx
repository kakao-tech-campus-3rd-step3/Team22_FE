import { FaHome, FaCog } from 'react-icons/fa'
import { IoMdWalk } from 'react-icons/io'
import { PiDog } from 'react-icons/pi'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useLocation } from '@tanstack/react-router'

const NAV_ITEMS = [
  { to: '/', label: '홈', Icon: FaHome },
  { to: '/add-new-pet', label: '반려견 정보', Icon: PiDog },
  { to: '/route-draw', label: '산책시작', Icon: IoMdWalk },
  { to: '/mypage', label: '설정', Icon: FaCog },
]

function NavItem({
  to,
  label,
  Icon,
}: {
  to: string
  label: string
  Icon: React.ComponentType<{ size?: number }>
}) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={clsx(
        'flex flex-col items-center transition',
        isActive ? 'text-cyan-400' : 'hover:text-cyan-400',
      )}
    >
      <Icon size={24} />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}

export default function Navbar() {
  return (
    <nav className="w-full h-full bg-neutral-900 flex justify-around items-center rounded-b-3xl p-3">
      {NAV_ITEMS.map(({ to, label, Icon }) => (
        <NavItem key={to} to={to} label={label} Icon={Icon} />
      ))}
    </nav>
  )
}
