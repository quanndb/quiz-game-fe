"use client";
import "@/style/FlipCard.css"; // chứa CSS flip
import { motion } from "framer-motion";
import { useState } from "react";

export default function FlipCard({
  frontElement,
  backElement,
  className,
  onClick,
}: {
  frontElement?: React.ReactNode;
  backElement?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-container transition duration-300 ${className}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={onClick}
    >
      <motion.div
        className="flip-card"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-face front">{frontElement}</div>
        <div className="card-face back">{backElement}</div>
      </motion.div>
    </div>
  );
}
