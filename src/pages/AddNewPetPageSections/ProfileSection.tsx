import { FaDog } from 'react-icons/fa'
import IconPlus from '@/components/common/IconPlus'

function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 bg-neutral-700 rounded-full flex items-center justify-center">
        <FaDog size={40} className="text-neutral-400" />
        <button className="absolute bottom-0 right-0 bg-white text-black rounded-full p-1.5 shadow-md">
          <IconPlus size={12} className="" />
        </button>
      </div>
      <div className="flex items-center gap-2 ">
        <input
          type="text"
          placeholder="멍멍이"
          className="text-center p-2 rounded-md text-lg w-28 h-auto focus:bg-neutral-700 focus:outline-none bg-neutral-700"
        />
      </div>
    </div>
  )
}
export default ProfileSection
