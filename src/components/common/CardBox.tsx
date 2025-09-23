export default function CardBox(props: { onClick: () => void }) {
  const { onClick } = props
  return (
    <button className="bg-white rounded-lg space-y-4" onClick={onClick}>
      <img
        className="w-full h-48 rounded-lg object-cover"
        src={'https://cdn.travie.com/news/photo/first/201611/img_19431_1.jpg'}
      />
      <div className="flex flex-col px-4 py-2">
        <span className=" text-black">주경로 보기</span>
        <span className=" text-black">주경로 보기</span>
      </div>
    </button>
  )
}
