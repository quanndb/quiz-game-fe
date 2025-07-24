import Image from "next/image";

const Input = ({
  placeholder,
  type = "text",
  value = "",
  onChange,
  disable = false,
  className = "",
}: {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  className?: string;
}) => {
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disable}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black game-text w-[93%] h-[70%] text-sm sm:text-xl ${
          disable ? "cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default Input;
