"use client";

import UI from "@/resource/ui";
import React, { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  progress: number; // 0 to 1
  onChange?: (newProgress: number) => void;
  className?: string;
}

const ProgressBar = ({ progress, onChange, className }: ProgressBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalProgress, setInternalProgress] = useState(progress);

  useEffect(() => {
    if (!isDragging) {
      setInternalProgress(progress);
    }
  }, [progress, isDragging]);

  const clamp = (value: number) => Math.max(0, Math.min(value, 1));

  const handleUpdate = (e: MouseEvent | React.MouseEvent) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = clamp(x / rect.width);
    setInternalProgress(newProgress);
    onChange?.(newProgress);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleUpdate(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleUpdate(e);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={barRef}
      className={`relative w-30 md:w-50 h-4 md:h-7 overflow-hidden rounded-full pointer ${
        className ?? ""
      }`}
      style={{
        backgroundImage: `url(${UI.PROGRESS_BAR.barImage})`,
        backgroundSize: "cover",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-[3%] h-[70%] bg-yellow-400 transition-all duration-100 rounded-md"
        style={{
          width: `${clamp(internalProgress) * 94}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
