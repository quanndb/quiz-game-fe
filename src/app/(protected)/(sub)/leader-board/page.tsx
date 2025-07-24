import { LEADER_BOARD } from "@/resource/leaderBoard";
import Image from "next/image";

const LeaderBoard = () => {
  return (
    <>
      <Image
        src={LEADER_BOARD.backgroundImage}
        alt="Leader Board"
        width={800}
        height={650}
      />
    </>
  );
};

export default LeaderBoard;
