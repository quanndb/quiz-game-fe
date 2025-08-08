import { QUESTION_TYPE } from "@/lib/types/common.type";
import UI from "@/resource/ui";
import "@/style/QuestionTitle.css";
import Image from "next/image";

const QuestionTitle = ({
  type,
  children,
  className,
}: {
  type: QUESTION_TYPE;
  children: React.ReactNode;
  className?: string;
}) => {
  const getIcon = () => {
    switch (type) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return UI.ICON.questIcon;
      case QUESTION_TYPE.ORDERING_CERCILE:
        return UI.ICON.dragDropIcon;
      default:
        return UI.ICON.questIcon;
    }
  };

  return (
    <div className={`flex justify-center md:justify-start ${className}`}>
      <Image
        src={getIcon()}
        alt="question icon"
        width={100}
        height={100}
        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] animate-bounce"
      />
      <div className={`title text-md md:text-2xl `}>{children}</div>
    </div>
  );
};

export default QuestionTitle;
