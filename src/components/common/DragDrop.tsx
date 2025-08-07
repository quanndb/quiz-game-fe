import { useDraggable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";

export function Draggable({ id }: { id: string }) {
  const { ref } = useDraggable({
    id,
  });

  return <button ref={ref}>Draggable</button>;
}

import { useDroppable } from "@dnd-kit/react";

export function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 300,
        backgroundColor: isDropTarget ? "#1eb99d25" : "#ffffff",
        border: "3px solid",
        borderColor: isDropTarget ? "#1eb99d" : "#00000020",
        borderRadius: 10,
      }}
    >
      {children}
    </div>
  );
}

export function Sortable({ id, index }: { id: number; index: number }) {
  const { ref } = useSortable({ id, index });

  return <button ref={ref}>Item {id}</button>;
}
