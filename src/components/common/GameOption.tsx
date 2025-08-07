import "@/style/Option.css";

export enum OPTION_TYPE {
  NORMAL,
  SELECTED,
  CORRECT,
  INCORRECT,
}

const GameOption = ({
  type = OPTION_TYPE.NORMAL,
  children,
  onClick,
  className,
}: {
  type?: OPTION_TYPE;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`option px-5 py-5 game-text font-semibold ${OPTION_TYPE[
        type
      ].toLowerCase()} rounded-lg shadow-md/40 pointer 
      hover:scale-105 transform transition-all duration-500 text-md md:text-lg
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GameOption;
