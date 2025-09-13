import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'

export default function MainPage() {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[90%]  h-fit">
          <InfoRow label="">
            <div className="flex flex-col bg-neutral-800 rounded-lg shadow-xl p-6 w-full">
              <span>meem3443</span>
              <div className="flex"></div>
            </div>
          </InfoRow>
        </div>
      </div>
      <WeatherTable />
      <div className=" bg-white rounded-lg space-y-4 w-[90%]">
        <img
          className="w-full h-3/4 rounded-lg"
          src={'https://cdn.travie.com/news/photo/first/201611/img_19431_1.jpg'}
        />
        <div className="flex flex-col">
          <span className=" text-black">주경로 보기</span>
          <span className=" text-black">주경로 보기</span>
        </div>
      </div>
    </>
  )
}
