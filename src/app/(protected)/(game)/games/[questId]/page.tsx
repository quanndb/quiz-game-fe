import MultipleChoice from "@/components/common/MultipleChoice";
import Order from "@/components/common/Order";
import { QUESTION_TYPE } from "@/lib/types/common.type";
import { IQuestion } from "@/lib/types/topic.type";
import { notFound } from "next/navigation";

const QUESTION_DATA: IQuestion[] = [
  {
    _id: "1",
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    title: "Rừng lá kim chủ yếu phân bố ở khu vực nào?",
    mediaUrl: "/assets/resource1.png",
    resources: [
      {
        title: "string",
        value: "A. Vùng nhiệt đới",
      },
      {
        title: "string",
        value: "B. Vùng cận nhiệt đới",
      },
      {
        title: "string",
        value: "C. Vùng ôn đới lạnh",
      },
      {
        title: "string",
        value: "D. Vùng xích đạo",
      },
    ],
    answer: [["A. Vùng nhiệt đới"]],
  },
  {
    _id: "2",
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    title: "Chọn đáp án đúng",
    mediaUrl: "/assets/map1.png",
    description:
      "“........................................  là nơi sinh sống của các loài thực vật ngập mặn như đước, mắm, sú, ...”",
    resources: [
      {
        title: "string",
        value: "A. Rừng ngập mặn",
      },
      {
        title: "string",
        value: "B. Rừng tre nứa",
      },
      {
        title: "string",
        value: "C. Rừng nguyên sinh",
      },
      {
        title: "string",
        value: "D. Rừng rậm",
      },
    ],
    answer: [["A. Rừng ngập mặn"]],
  },
  {
    _id: "3",
    type: QUESTION_TYPE.ORDERING_CERCILE,
    title: "Sắp xếp trình tự các tầng cây trong rừng từ thấp đến cao",
    mediaUrl: "/assets/plant1.png",
    resources: [
      {
        title: "string",
        value: "Tầng cây bụi",
      },
      {
        title: "string",
        value: "Tầng tán chính",
      },
      {
        title: "string",
        value: "Tầng vượt tán",
      },
      {
        title: "string",
        value: "Tầng cỏ quyết",
      },
    ],
    answer: [["Tầng vượt tán"]],
  },
];

const questionComponentMap: Record<string, React.FC<{ question: unknown }>> = {
  [QUESTION_TYPE.MULTIPLE_CHOICE]: MultipleChoice as React.FC<{
    question: unknown;
  }>,
  [QUESTION_TYPE.ORDERING_CERCILE]: Order as React.FC<{
    question: unknown;
  }>,
  // thêm các loại khác nếu cần
};

const QuestionPage = async ({
  params,
}: {
  params: Promise<{ questId: string }>;
}) => {
  const { questId } = await params;
  const question = QUESTION_DATA.find((q) => q._id === questId);
  if (!question) return notFound();
  const Component = questionComponentMap[question?.type || ""] || null;

  return <div>{Component && <Component question={question} />}</div>;
};

export default QuestionPage;
