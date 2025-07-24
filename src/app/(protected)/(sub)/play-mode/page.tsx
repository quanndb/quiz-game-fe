"use client";
import GameButton from "@/components/ui/GameButton";
import useRouteLoader from "@/hooks/useRouteLoad";
import { PLAY_MODE } from "@/resource/playMode";
import Image from "next/image";

const PlayMode = () => {
  const router = useRouteLoader();
  return (
    <div>
      <Image
        src={"/assets/playModeTitle.png"}
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
            width={560}
            height={178}
            onClick={() => router.push("/charactors")}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayMode;
