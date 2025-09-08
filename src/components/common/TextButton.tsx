import type { ReactNode } from "react"; // ReactNode 타입을 임포트

interface TextButtonProps {
  onClick: () => void;
  isSelected: boolean; // 선택되었는지 여부를 직접 boolean으로 받음
  children: ReactNode; // 버튼에 표시될 내용을 children으로 받음
}

function TextButton({ onClick, isSelected, children }: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-2 rounded-md text-sm transition-colors ${
        isSelected
          ? "bg-blue-600 text-white"
          : "bg-neutral-700 text-neutral-300"
      }`}
    >
      {children}
    </button>
  );
}

export default TextButton;
