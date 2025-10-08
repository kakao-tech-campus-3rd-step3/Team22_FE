export default function CardBox(props: { onClick: () => void }) {
  const { onClick } = props
  return (
    <div className="bg-white rounded-lg space-y-4" onClick={onClick}>
      <img className="w-full h-48 rounded-lg object-cover" src={'assets/intro_1.png'} />
      <div className="flex flex-col px-4 py-2">
        <span className=" text-black">서비스 이용안내</span>
      </div>
    </div>
  )
}
