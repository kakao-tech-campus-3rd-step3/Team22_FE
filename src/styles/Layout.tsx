interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[375px] h-[100%] bg-white shadow-lg rounded-xl overflow-hidden saturate-0">
        {children}
      </div>
    </div>
  )
}
