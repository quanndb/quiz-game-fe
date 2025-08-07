"use client";
import UI from "@/resource/ui";
import { useLoadingStore } from "@/store/loadingStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingIndicator = () => {
  const { isLoading } = useLoadingStore();
  const [visible, setVisible] = useState(false);
  const [hideWithEffect, setHideWithEffect] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setHideWithEffect(false);
    } else {
      // Trigger blur+fade out
      setHideWithEffect(true);

      // After animation ends, hide it completely
      const timeout = setTimeout(() => {
        setVisible(false);
        setHideWithEffect(false);
      }, 1000); // 500ms matches your transition duration

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center
        bg-black bg-opacity-50 transition-all duration-500
        ${hideWithEffect ? "opacity-0 blur-sm" : "opacity-100 blur-0"}
      `}
    >
      <Image
        src={UI.LOADING.resourceUrl}
        alt="loading"
        width={1000}
        height={400}
        className="w-[28%]"
        unoptimized
      />
    </div>
  );
};

export default LoadingIndicator;
