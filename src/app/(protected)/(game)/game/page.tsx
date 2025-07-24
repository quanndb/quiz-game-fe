"use client";
import ImageBackgroundLayout from "@/components/layouts/ImageBackgroundLayout";
import useRouteLoader from "@/hooks/useRouteLoad";
import { useLoadingStore } from "@/store/loadingStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const Game = () => {
  const router = useRouteLoader();
  const { setLoading } = useLoadingStore();
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [chapter]);

  const handleSetChapter = (newChapter: number) => {
    if (newChapter === 5) {
      router.replace("/");
      return;
    }
    setChapter(newChapter);
  };
  return (
    <ImageBackgroundLayout imageURL={`/assets/map${chapter}.png`}>
      {/* Game content goes here */}
      <Image
        src={`/assets/chapter${chapter}.png`}
        alt={`Chapter ${chapter}`}
        width={560}
        height={178}
      />
      <button
        className="cursor-pointer bg-amber-500 p-4 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-colors"
        onClick={() => handleSetChapter(chapter + 1)}
      >
        Next Chapter (Current: {chapter})
      </button>
    </ImageBackgroundLayout>
  );
};

export default Game;
