import React from "react";
const ButtonComponent: React.FC<{ onClick: () => void; className: string }> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`px-6 py-4 rounded hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
