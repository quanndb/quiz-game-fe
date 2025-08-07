"use client";
import GameOption, { OPTION_TYPE } from "@/components/common/GameOption";
import QuestionTitle from "@/components/common/QuestionTitle";
import Button from "@/components/ui/Button";
import { IQuestion, IResource } from "@/lib/models/topic.type";
import { useToastStore } from "@/store/toastStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const Order = ({ question }: { question: IQuestion }) => {
  const { showToastError, showToastSuccess } = useToastStore();
  const [selected, setSelected] = useState<{
    value: string;
    isCorrect: boolean | null;
  }>({
    value: "",
    isCorrect: null,
  });

  useEffect(() => {
    if (selected.isCorrect === null) {
      return;
    } else {
      if (!selected.isCorrect)
        showToastError("Đáp án sai rồi, bạn thử lại nhé");
      else showToastSuccess("Đáp án chính xác");
    }
  }, [selected]);

  const handleSelect = (choiceValue: string) => {
    setSelected((prev) => {
      if (prev.value === choiceValue) return prev;
      return {
        value: choiceValue,
        isCorrect: null,
      };
    });
  };

  const handleSubmit = () => {
    setSelected((prev) => ({
      ...prev,
      isCorrect: prev.value === question.answer[0],
    }));
  };

  const getOptionStatus = (choice: IResource) => {
    const isSelected = selected.value === choice.value;

    if (selected.isCorrect === null) {
      return isSelected ? OPTION_TYPE.SELECTED : OPTION_TYPE.NORMAL;
    }

    if (selected.isCorrect === true && choice.value === question.answer[0]) {
      return OPTION_TYPE.CORRECT;
    }

    if (selected.isCorrect === false && isSelected) {
      return OPTION_TYPE.INCORRECT;
    }

    return OPTION_TYPE.NORMAL;
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="md:grid md:grid-cols-2 flex flex-col-reverse items-center gap-5 md:gap-10">
        <div className="flex flex-col gap-2 md:gap-10 max-w-[600px]">
          <div className="flex flex-col md:gap-5">
            <QuestionTitle type={question.type}>{question.title}</QuestionTitle>
            {question.description && (
              <p className="text-lg text-wrap font-bold text-center text-black">
                {question.description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5 md:gap-8">
            {question?.resources?.map((choice) => (
              <GameOption
                key={choice.value}
                className="w-full text-left"
                type={getOptionStatus(choice)}
                onClick={() => handleSelect(choice.value)}
              >
                {choice.value}
              </GameOption>
            ))}
          </div>
        </div>
        <Image
          src={question.mediaUrl || ""}
          alt="resource"
          width={600}
          height={400}
        />
      </div>
      <Button className="mt-5 w-[200px] h-[50px]" onClick={handleSubmit}>
        Trả lời
      </Button>
    </div>
  );
};

export default Order;
