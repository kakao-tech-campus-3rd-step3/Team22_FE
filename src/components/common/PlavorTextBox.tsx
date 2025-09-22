export default function PlavorTextBox(props: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center bg-zinc-800 rounded-lg p-2">{props.children}</div>
  )
}
