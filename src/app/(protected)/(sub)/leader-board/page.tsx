import UI from "@/resource/ui";
import Image from "next/image";

const LeaderBoard = () => {
  return (
    <>
      <Image
        src={UI.LEADER_BOARD.backgroundImage}
        alt="Leader Board"
        width={800}
        height={650}
        className="w-auto h-auto"
        priority
      />
    </>
  );
};

export default LeaderBoard;
