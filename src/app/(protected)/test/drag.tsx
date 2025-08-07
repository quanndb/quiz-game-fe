import { Draggable, Droppable } from "@/components/common/DragDrop";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";

export function Example() {
  const [parent, setParent] = useState<unknown>();
  const draggable = <Draggable id="draggable" />;

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        const { target } = event.operation;

        if (event.canceled) return;

        setParent(target ? target.id : undefined);
      }}
    >
      <section>
        <div>{parent == null ? draggable : null}</div>
        <Droppable id="dropzone">
          {parent === "dropzone" ? draggable : null}
        </Droppable>
      </section>
    </DragDropProvider>
  );
}
