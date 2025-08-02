// components/DragDropForest.tsx
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useState } from "react";

const LAYERS = [
  "TẦNG DƯỚI TÁN",
  "TẦNG TÁN CHÍNH",
  "TẦNG CỎ QUYẾT",
  "TẦNG CÂY BỤI",
  "TẦNG VƯỢT TÁN",
];

export default function DragDropForest() {
  const [slots, setSlots] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [pool, setPool] = useState(LAYERS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const from = active.data.current?.from;
    const layer = active.id;

    const toIndex = parseInt(over.id.toString().replace("slot-", ""));

    if (from === "pool") {
      // Nếu kéo từ pool và slot đích đã có item, thì swap với item trong slot
      if (slots[toIndex]) {
        const oldItem = slots[toIndex];
        const newPool = pool.filter((item) => item !== layer);
        newPool.push(oldItem); // đưa item cũ về pool
        const newSlots = [...slots];
        newSlots[toIndex] = layer.toString();
        setPool(newPool);
        setSlots(newSlots);
      } else {
        const newPool = pool.filter((item) => item !== layer);
        const newSlots = [...slots];
        newSlots[toIndex] = layer.toString();
        setPool(newPool);
        setSlots(newSlots);
      }
    } else if (from === "slot") {
      const fromIndex = parseInt(active.data.current?.slotIndex);
      if (fromIndex === toIndex) return;

      const newSlots = [...slots];
      const temp = newSlots[toIndex];
      newSlots[toIndex] = newSlots[fromIndex];
      newSlots[fromIndex] = temp;
      setSlots(newSlots);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Drag pool */}
      <div className="flex gap-4 mt-4 justify-center flex-wrap">
        {pool.map((layer) => (
          <Draggable key={layer} id={layer} from="pool">
            <div className="bg-white rounded px-4 py-2 shadow">{layer}</div>
          </Draggable>
        ))}
      </div>

      {/* Slots */}
      <div className="flex flex-col items-center mt-10 gap-2">
        {[4, 3, 2, 1, 0].map((i) => (
          <Droppable key={i} id={`slot-${i}`}>
            <div className="border border-dashed border-gray-400 w-64 h-10 flex items-center justify-center bg-orange-100">
              {slots[i] ? (
                <Draggable id={slots[i]!} from="slot" slotIndex={i}>
                  <div className="bg-yellow-600 rounded px-3 py-1 shadow text-center">
                    {slots[i]}
                  </div>
                </Draggable>
              ) : (
                <span className="text-sm text-black">( {i + 1} )</span>
              )}
            </div>
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}

function Draggable({
  id,
  children,
  from,
  slotIndex,
}: {
  id: string;
  children: React.ReactNode;
  from: "pool" | "slot";
  slotIndex?: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { from, slotIndex },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 100,
        position: "relative" as const,
      }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
}

function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? "black" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
