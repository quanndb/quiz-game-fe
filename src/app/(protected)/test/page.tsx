"use client";
import { useState } from "react";
import Crossword, { Direction } from "./crossword";
import { Example } from "./drag";
import Find from "./find";

const images = [
  "/assets/avatar1.png",
  "/assets/avatar2.png",
  "/assets/avatar3.png",
  "/assets/avatar4.png",
  "/assets/avatar5.png",
  "/assets/avatar6.png",
  "/assets/avatar7.png",
  "/assets/avatar8.png",
  "/assets/avatar9.png",
];

const words = [
  {
    word: "CAYTHONG",
    startX: 2,
    startY: 0,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "CONHO",
    startX: 2,
    startY: 1,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "UMINH",
    startX: 5,
    startY: 2,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "BAOTON",
    startX: 4,
    startY: 3,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "ANTOAN",
    startX: 4,
    startY: 4,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "THIENNHIEN",
    startX: 5,
    startY: 5,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "CONKHI",
    startX: 1,
    startY: 6,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "KHICO2",
    startX: 3,
    startY: 7,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "TREKKING",
    startX: 3,
    startY: 8,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "LINHTRUONG",
    startX: 3,
    startY: 9,
    direction: Direction.HORIZONTAL,
  },
  {
    word: "THUANTHIEN",
    startX: 5,
    startY: 0,
    direction: Direction.VERTICAL,
    highlight: true,
  },
];

enum TAB {
  FIND = "FIND",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TYPING = "TYPING",
  ORDERING = "ORDERING",
  MATCHING = "MATCHING",
  CROSS_WORD = "CROSS_WORD",
}

const Test = () => {
  const [tab, setTab] = useState(TAB.FIND);
  return (
    <div>
      <div className="flex gap-x-3">
        {/* loop TAB enum then render tab button */}
        {Object.values(TAB).map((tab) => (
          <button
            key={tab}
            onClick={() => setTab(tab as TAB)}
            className="bg-white text-black px-4 py-2 rounded-md pointer hover:bg-gray-200"
          >
            {tab}
          </button>
        ))}
      </div>
      {(() => {
        switch (tab) {
          case TAB.FIND:
            return <Find images={images} />;
          case TAB.CROSS_WORD:
            return (
              <Crossword gridSize={{ rows: 10, cols: 15 }} words={words} />
            );
          case TAB.ORDERING:
            return <Example />;
          default:
            return <Find images={images} />;
        }
      })()}
    </div>
  );
};

export default Test;
