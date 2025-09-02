import React from 'react'

export const LocationDotIcon = () => {
  return (
    <div className="w-12 h-12 relative">
      <div className="w-12 h-12 left-0 top-0 absolute bg-blue-100/60 rounded-full" />
      <div
        className="w-5 h-5 left-[15px] top-[15px] absolute bg-white rounded-full border border-blue-600 blur-[0.70px]" />
      <div className="w-3 h-3 left-[19px] top-[19px] absolute bg-blue-600 rounded-full" />
    </div>
  )
}
