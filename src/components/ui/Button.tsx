"use client";
import UI from "@/resource/ui";
import Image from "next/image";
import { useState } from "react";

const Button = ({
  children,
  type = "button",
  backgroundImage = UI.BUTTON.defaultButtonImage,
  width = 260,
  height = 80,
  disabled = false,
  className = "",
  onClick,
}: {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  backgroundImage?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (isActive: boolean) => {
    if (!disabled) {
      setIsMouseDown(isActive);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <button
      className={`${
        disabled
          ? "grayscale cursor-not-allowed"
          : "cursor-pointer hover:brightness-70 transform transition-all duration-200"
      } ${className} relative ${
        isMouseDown ? "scale-95" : ""
      } flex items-center justify-center`}
      onClick={handleClick}
      onMouseDown={() => handleMouseDown(true)}
      onMouseUp={() => handleMouseDown(false)}
      onMouseLeave={() => handleMouseDown(false)}
      type={type}
    >
      <Image
        src={backgroundImage}
        alt="Button Icon"
        width={width}
        height={height}
        style={{ height: `auto`, width: `auto` }}
      />
      <span className="font-bold absolute top-1/2 left-1/2 game-button-text -translate-x-1/2 -translate-y-1/2 uppercase">
        {children}
      </span>
    </button>
  );
};

export default Button;
