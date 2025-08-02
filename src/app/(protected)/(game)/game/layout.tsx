"use client";
import ImageBackgroundLayout from "@/components/layouts/ImageBackgroundLayout";
import Button from "@/components/ui/Button";
import Image from "next/image";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackgroundLayout imageURL={`/assets/map1.png`}>
      {/* Game content goes here */}

      <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
        {/* Logo */}
        <div className="w-full flex justify-center absolute top-0">
          <Image
            src={`/assets/chapter1Logo.png`}
            alt={`Chapter 1`}
            width={560}
            height={178}
            className="w-[400px] h-auto"
            priority
          />
        </div>
        {/* Scroll */}
        <div className="flex items-center justify-center w-full">
          <Image
            src={`/assets/paper.png`}
            alt={`Chapter 1`}
            width={1400}
            height={650}
            className="w-full h-[35 0px] md:h-auto"
            priority
          />
          <div className="absolute p-5">{children}</div>
          <div className="flex w-full justify-between absolute">
            <Button
              backgroundImage={`/assets/leftArrow.svg`}
              width={128}
              height={128}
              className="w-[10%] md:w-[5%] h-auto"
            />
            <Button
              backgroundImage={`/assets/rightArrow.svg`}
              width={128}
              height={128}
              className="w-[10%] md:w-[5%] h-auto"
            />
          </div>
        </div>
      </div>
    </ImageBackgroundLayout>
  );
};

export default GameLayout;
