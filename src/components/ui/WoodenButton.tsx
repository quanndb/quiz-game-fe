import UI from "@/resource/ui";

const WoodenButton = ({
  className,
  disable,
  onClick,
  children,
}: {
  className?: string;
  disable?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      style={{ backgroundImage: `url(${UI.BUTTON.woodenImage})` }}
      className={`bg-center bg-no-repeat bg-contain wooden-button-text cursor-pointer hover:scale-105 transform transition-transform duration-200 ${className} ${
        disable ? "cursor-not-allowed grayscale" : ""
      } w-[50px] h-[30px]  md:w-[100px] md:h-[50px]`}
    >
      {children}
    </button>
  );
};

export default WoodenButton;
