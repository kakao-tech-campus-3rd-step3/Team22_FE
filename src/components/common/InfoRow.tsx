import React from 'react'

function InfoRow(props: {
  readonly label: string
  readonly children: React.ReactNode
  readonly className?: string
}) {
  return (
    <div className={`flex items-center gap-1 ${props.className}`}>
      {props.label && <span className="w-10 text-sm text-neutral-400">{props.label}</span>}
      <div className="flex-1 flex items-center gap-2">{props.children}</div>
    </div>
  )
}

export default InfoRow
