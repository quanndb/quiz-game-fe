"use client";
import Image from "next/image";

const GameButton = ({
  isDisabled = false,
  alt = "default alt text",
  onClick,
  imageURL,
  width,
  height,
  className = "",
}: {
  isDisabled?: boolean;
  alt?: string;
  onClick?: () => void;
  imageURL: string;
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <button
      className={`${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-105"
      } transform transition-transform duration-200 ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <Image
          src={imageURL}
          alt={alt}
          width={width}
          height={height}
          className={`${isDisabled ? "grayscale" : ""}`}
          style={{ height: `auto`, width: `auto` }}
        />
      </div>
    </button>
  );
};

export default GameButton;
