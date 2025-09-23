export default function PlavorTextBox(props: { children: React.ReactNode }) {
  const { children } = props
  return <div className="w-full flex justify-center bg-zinc-800 rounded-lg p-2">{children}</div>
}
