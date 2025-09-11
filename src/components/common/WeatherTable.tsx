import useLocation from '@/hooks/useLocation.tsx';
import useOpenWeather from '@/hooks/useOpenWeather.ts';

export default function WeatherTable() {
  const { location, status } = useLocation();
  const { weather } = useOpenWeather({ location });

  if (status === 'loading') {
    return <div>현재 위치를 찾는 중입니다...</div>;
  }

  if (status === 'denied') {
    return (
      <div className="text-center text-red-500 font-bold p-4">
        위치 권한을 허용해주세요.
      </div>
    );
  }

  if (!weather || !weather.list) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] max-w-lg h-72 overflow-auto rounded-lg no-scrollbar">
        <table className="min-w-full text-white bg-zinc-800">
          <thead className="bg-zinc-800 sticky top-0 font-bold">
          <tr>
            <th className="py-3 text-xs w-[20%]">시간별</th>
            <th className="py-3 text-xs w-[20%]">날씨</th>
            <th className="py-3 text-xs w-[20%]">온도℃</th>
            <th className="py-3 text-xs w-[20%]">강수확률%</th>
            <th className="py-3 text-xs w-[20%]">산책지수</th>
          </tr>
          </thead>
          <tbody>
          {weather.list.map((item) => {
            const dateInKST = new Date(item.dt_txt + ' UTC');

            const day = dateInKST.getDate();
            const hour = dateInKST.getHours();

            return (
              <tr key={item.dt_txt} className="text-center text-xs font-bold">
                <td className="py-2">{`${day}일 ${hour}시`}</td>
                <td className="py-2">{item.weather?.[0]?.description ?? '정보 없음'}</td>
                <td className="py-2">{(item.main.temp).toFixed(1)}</td>
                <td className="py-2">{(item.pop * 100).toFixed(0)}</td>
                <td className="py-2">{/* 산책지수 계산 */}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
