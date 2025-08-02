"use client";
import { useState } from "react";
import DragDropForest from "./drag";
import Find from "./find";
enum TAB {
  FIND = "FIND",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TYPING = "TYPING",
  ORDERING = "ORDERING",
  MATCHING = "MATCHING",
}

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
            className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200"
          >
            {tab}
          </button>
        ))}
      </div>
      {(() => {
        switch (tab) {
          case TAB.FIND:
            return <Find images={images} />;
          case TAB.ORDERING:
            return <DragDropForest />;
          default:
            return <Find images={images} />;
        }
      })()}
    </div>
  );
};

export default Test;
