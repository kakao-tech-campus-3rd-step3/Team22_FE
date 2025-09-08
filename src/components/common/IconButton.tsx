import type { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  isSelected?: boolean;
}

function IconButton({ icon, onClick, isSelected }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full transition-colors duration-200 ${
        isSelected
          ? "bg-blue-600 text-white"
          : "bg-neutral-700 text-neutral-300"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
    </button>
  );
}

export default IconButton;
