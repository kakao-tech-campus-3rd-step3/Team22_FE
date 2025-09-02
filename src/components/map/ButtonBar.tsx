export default function ButtonBar() {
  return (
    <div className='flex flex-col h-42 px-4 py-4 bg-black rounded-lg font-bold'>
      <div className='text-white my-1.5'>장소</div>
      <div className='text-white my-1.5'>위치</div>
      <button className='h-15 my-1.5 text-white bg-indigo-600 rounded-xl cursor-pointer'>주 산책 시작 위치설정하기</button>
    </div>
  )
}
