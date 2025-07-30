"use client";

import UI from "@/resource/ui";
import { useSettingStore } from "@/store/settingStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import WoodenButton from "../ui/WoodenButton";

const Settings = () => {
  const {
    isShowing,
    setIsShowing,
    soundVolume,
    musicVolume,
    quality,
    setSoundVolume,
    setMusicVolume,
    setQuality,
  } = useSettingStore();

  return (
    <AnimatePresence>
      {isShowing && (
        <div className="absolute top-0 left-0 min-w-screen min-h-screen bg-black/50 z-20">
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div
              style={{ backgroundImage: `url(${UI.BACKGROUND.boardImage})` }}
              className="relative w-[90vw] md:w-[600px] aspect-[600/512] bg-center bg-no-repeat bg-contain flex items-center justify-center"
            >
              <div className="absolute top-[17%] right-[4%]">
                <Button
                  backgroundImage={UI.BUTTON.outImage}
                  width={5}
                  height={5}
                  className="w-10 h-10"
                  onClick={() => setIsShowing(false)}
                />
              </div>
              <div className="flex flex-col items-center gap-y-5 mt-10">
                <div className="flex items-center gap-x-1 md:gap-x-5">
                  <Image
                    src={UI.ICON.soundIcon}
                    alt="Sound Icon"
                    width={100}
                    height={100}
                    className="md:w-12 md:h-12 w-8 h-8"
                  />
                  <p className="game-text-stroke md:text-xl text-md">MIN</p>
                  <ProgressBar
                    progress={soundVolume}
                    onChange={setSoundVolume}
                  />
                  <p className="game-text-stroke md:text-xl text-md">MAX</p>
                </div>
                <div className="flex items-center gap-x-1 md:gap-x-5">
                  <Image
                    src={UI.ICON.musicIcon}
                    alt="music Icon"
                    width={100}
                    height={100}
                    className="md:w-12 md:h-12 w-8 h-8"
                  />
                  <p className="game-text-stroke md:text-xl text-md">MIN</p>
                  <ProgressBar
                    progress={musicVolume}
                    onChange={setMusicVolume}
                  />
                  <p className="game-text-stroke md:text-xl text-md">MAX</p>
                </div>
                <div className="flex items-center gap-x-5 justify-around bg-[#DE922F] py-1 px-3 rounded-full">
                  <p className="game-text-stroke text-md sm:text-lg md:text-xl">
                    QUALITY
                  </p>
                  <div className="flex items-center">
                    <WoodenButton
                      className={`text-xs md:text-sm ${
                        quality !== "low" ? "grayscale" : ""
                      }`}
                      onClick={() => setQuality("low")}
                    >
                      LOW
                    </WoodenButton>
                    <WoodenButton
                      className={`text-xs md:text-sm ${
                        quality !== "medium" ? "grayscale" : ""
                      }`}
                      onClick={() => setQuality("medium")}
                    >
                      MED
                    </WoodenButton>
                    <WoodenButton
                      className={`text-xs md:text-sm ${
                        quality !== "high" ? "grayscale" : ""
                      }`}
                      onClick={() => setQuality("high")}
                    >
                      HIGH
                    </WoodenButton>
                  </div>
                </div>
                <Button
                  className="md:h-10 md:w-40 sm:h-8 sm:w-30 h-5 w-25"
                  height={40}
                  width={100}
                  onClick={() => setIsShowing(false)}
                >
                  OK
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Settings;
