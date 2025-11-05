import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import koLocale from '@fullcalendar/core/locales/ko'
import TextButton from '@/components/common/TextButton'
import ProfileSection from './AddNewPetPageSections/ProfileSection'
import { useNavigate } from '@tanstack/react-router'
import type { EventClickArg } from '@fullcalendar/core'

export default function PetInfoPage() {
  const walkTimes = 10
  const totalDistance = 20
  const walkDates = 30
  const navigate = useNavigate()

  const events = [
    { id: '1', title: '산책하기 좋은 날', date: '2025-10-15', color: '#3b82f6' },
    { id: '2', title: '비 오는 날', date: '2025-10-16', color: '#ef4444' },
  ]

  const [_, setCalendarDate] = useState(new Date())

  function handleModifyDoginfo() {
    navigate({ to: '/' })
  }

  function handleEventClick(clickInfo: EventClickArg) {
    const eventId = clickInfo.event.id
    navigate({ to: `/walk-history/${eventId}` })
  }

  return (
    <div className="flex flex-col gap-5 max-w-md mx-auto p-4">
      <ProfileSection name="멍멍이" />
      <TextButton onClick={handleModifyDoginfo} isSelected={false}>
        반려견 정보 수정하기
      </TextButton>

      <div className="w-full bg-neutral-900 rounded-xl shadow px-6 py-5 flex justify-between text-center">
        <div>
          <span className="text-lg">🕒</span>
          <div className="font-bold text-xl mt-1">{walkTimes ?? '-'}</div>
          <div className="text-xs mt-1 text-gray-400">총 산책시간</div>
        </div>
        <div>
          <span className="text-lg">🛣️</span>
          <div className="font-bold text-xl mt-1">{totalDistance ?? '-'}</div>
          <div className="text-xs mt-1 text-gray-400">총 산책거리</div>
        </div>
        <div>
          <span className="text-lg">📅</span>
          <div className="font-bold text-xl mt-1">{walkDates ?? '-'}</div>
          <div className="text-xs mt-1 text-gray-400">함께한 일수</div>
        </div>
      </div>

      <div className="bg-neutral-800 rounded-lg p-2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          dateClick={({ date }) => setCalendarDate(date)}
          height="auto"
          locale={koLocale}
          buttonText={{
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
            list: '일정',
          }}
        />
      </div>
    </div>
  )
}
