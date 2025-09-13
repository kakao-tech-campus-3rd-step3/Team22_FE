import { FaHome, FaCog } from 'react-icons/fa'
import { IoMdWalk } from 'react-icons/io'
import { PiDog } from 'react-icons/pi'
import { Link } from '@tanstack/react-router'

export default function Navbar() {
  const iconSize = 24

  return (
    <nav className="w-full h-20 bg-neutral-900 flex justify-around items-center rounded-b-3xl">
      <Link
        to="/"
        className="flex flex-col items-center transition hover:text-cyan-400"
        activeProps={{
          className: 'text-cyan-400',
        }}
      >
        <FaHome size={iconSize} />
        <span className="text-xs mt-1">홈</span>
      </Link>

      <Link
        to="/add-new-pet"
        className="flex flex-col items-center transition hover:text-cyan-400"
        activeProps={{
          className: 'text-cyan-400',
        }}
      >
        <PiDog size={iconSize} />
        <span className="text-xs mt-1">반려견 정보</span>
      </Link>

      <Link
        to="/"
        className="flex flex-col items-center transition hover:text-cyan-400"
        activeProps={{
          className: 'text-cyan-400',
        }}
      >
        <IoMdWalk size={iconSize} />
        <span className="text-xs mt-1">산책시작</span>
      </Link>

      <Link
        to="/"
        className="flex flex-col items-center transition hover:text-cyan-400"
        activeProps={{
          className: 'text-cyan-400',
        }}
      >
        <FaCog size={iconSize} />
        <span className="text-xs mt-1">설정</span>
      </Link>
    </nav>
  )
}
