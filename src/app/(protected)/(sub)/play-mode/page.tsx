"use client";
import GameButton from "@/components/ui/GameButton";
import useRouteLoader from "@/hooks/useRouteLoader";
import { PLAY_MODE } from "@/resource/playMode";
import UI from "@/resource/ui";
import { useToastStore } from "@/store/toastStore";
import Image from "next/image";

const PlayMode = () => {
  const router = useRouteLoader();
  const { showToastSuccess } = useToastStore();

  const handleClick = (isAvailable: boolean) => {
    if (!isAvailable) {
      return showToastSuccess(
        "Chế độ chơi vẫn đang được phát triển, bạn vui lòng đợi chúng tớ nhé!"
      );
    }
    router.push("/charactors");
  };

  return (
    <div>
      <Image
        src={UI.TITLE.playmodeTitle}
        alt="Play Mode Title"
        width={508}
        height={184}
      />
      <div className="flex flex-col items-center space-y-5 p-5">
        {PLAY_MODE.modes.map((mode) => (
          <GameButton
            key={mode.id}
            alt={mode.name}
            imageURL={mode.image}
            width={550}
            height={178}
            className="max-w-[500px]"
            onClick={() => handleClick(mode.isAvailable)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayMode;
