import React from 'react'

function InfoRow(props: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 py-3 ${props.className}`}>
      <span className="w-10 text-sm text-neutral-400 shrink-0">{props.label}</span>
      <div className="flex-1 flex items-center gap-2">{props.children}</div>
    </div>
  )
}

export default InfoRow
