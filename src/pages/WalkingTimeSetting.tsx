import ButtonBar from '@/components/common/ButtonBar.tsx';
import WeatherTable from '@/components/common/WeatherTable.tsx';
import WalkTimeScheduler from '@/components/common/WalkTimeScheduler.tsx';
import { useNavigate } from '@tanstack/react-router'

export default function WalkingTimeSetting() {
  const navigate = useNavigate({ from: '/walking-time'});

  const handleSetTime = () => {
    console.log('세팅 완료 페이지')
    navigate({
      to: '/map-setup',
    });
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex-1 overflow-y-auto no-scrollbar pt-20 pb-20">
        <WeatherTable />

        <WalkTimeScheduler />

        <div className="w-full flex justify-center my-4">
          <div
            className="w-[90%] max-w-lg px-4 py-3 text-center text-white text-sm leading-relaxed font-bold bg-zinc-800 rounded-lg shadow-md">
            시간을 모두 상세하게 설정해주세요.<br />
            최고의 산책길인지도 판단해드릴게요.
          </div>
        </div>
      </div>

      <ButtonBar
        buttonText="주 산책 시간 설정하기"
        onButtonClick={handleSetTime}
      >
        <div className="text-white my-1.5">해당 시간에 알림 경로 추천 알림 받기</div>
      </ButtonBar>
    </div>
  );
}