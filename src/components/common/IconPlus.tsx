function IconPlus({ size = 12, className = "" }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      className={className}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32s-32 14.33-32 32v144H64c-17.67 0-32 14.33-32 32s14.33 32 32 32h144v144c0 17.67 14.33 32 32 32s32-14.33 32-32V272h144c17.67 0 32-14.33 32-32s-14.33-32-32-32z"></path>
    </svg>
  );
}
export default IconPlus;
