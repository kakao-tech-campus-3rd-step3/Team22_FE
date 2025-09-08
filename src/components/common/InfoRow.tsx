import React from "react";

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function InfoRow({ label, children, className = "" }: InfoRowProps) {
  return (
    <div className={`flex items-center gap-3 py-3 ${className}`}>
      <span className="w-10 text-sm text-neutral-400 shrink-0">{label}</span>
      <div className="flex-1 flex items-center gap-2">{children}</div>
    </div>
  );
}

export default InfoRow;
