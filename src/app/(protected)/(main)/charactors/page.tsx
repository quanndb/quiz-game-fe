"use client";
import FlipCard from "@/components/common/FlipCard";
import Button from "@/components/ui/Button";
import useRouteLoader from "@/hooks/useRouteLoad";
import { CHARACTOR_MENU } from "@/resource/charactor";
import Image from "next/image";
import { useState } from "react";

const CharactorSelection = () => {
  const router = useRouteLoader();
  const [selectedCharactor, setSelectedCharactor] = useState<string | null>(
    null
  );

  const handleSelectCharactor = (charactorName: string) => {
    if (selectedCharactor === charactorName) {
      setSelectedCharactor(null);
      return;
    }
    setSelectedCharactor(charactorName);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {CHARACTOR_MENU.charactors.map((charactor, index) => (
          <FlipCard
            key={index}
            frontElement={
              <Image
                src={charactor.frontImage}
                alt={`${charactor.name} Front`}
                width={335}
                height={463}
                className="w-auto h-auto"
              />
            }
            backElement={
              <Image
                src={charactor.backImage}
                alt={`${charactor.name} Back`}
                width={335}
                height={463}
                className="w-auto h-auto"
              />
            }
            className={`${
              selectedCharactor !== charactor.name && selectedCharactor
                ? "grayscale"
                : "cursor-pointer"
            } ${selectedCharactor === charactor.name ? "scale-110" : ""}`}
            onClick={() => handleSelectCharactor(charactor.name)}
          />
        ))}
      </div>
      <div className={`flex justify-center items-center mt-8`}>
        <Button
          width={300}
          height={60}
          disabled={!selectedCharactor}
          onClick={() => router.push("/game")}
          backgroundImage="/assets/selectCharactor.svg"
          className="w-auto h-auto"
        ></Button>
      </div>
    </>
  );
};

export default CharactorSelection;
