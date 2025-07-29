import Image from "next/image";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  disable?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, type = "text", disable = false, className = "", ...props },
    ref
  ) => {
    const inputClass = `
    absolute inset-0
    px-4 py-2
    text-black text-sm sm:text-xl game-text
    bg-transparent
    ${disable ? "cursor-not-allowed" : ""}
    ${className}
  `;

    return (
      <div className={`relative ${disable ? "cursor-not-allowed" : ""}`}>
        <label className="sr-only">{placeholder}</label>
        <Image
          src="/assets/input.svg"
          alt="input"
          width={700}
          height={100}
          className={className}
        />
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disable}
          className={inputClass}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
