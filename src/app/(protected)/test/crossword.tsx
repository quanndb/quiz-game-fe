import { cn } from "@/lib/utils/cn";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface GridSize {
  rows: number;
  cols: number;
}

export enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}
interface WordData {
  word: string;
  startX: number;
  startY: number;
  direction: Direction;
  highlight?: boolean;
}

interface CrosswordProps {
  gridSize: GridSize;
  words?: WordData[];
}

interface Cell {
  isWhite: boolean;
  wordNumber?: number;
  highlight?: boolean;
}

export default function Crossword({ gridSize, words = [] }: CrosswordProps) {
  const cellRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [selected, setSelected] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });

  const structure = useMemo(() => {
    const grid: Cell[][] = Array.from({ length: gridSize.rows }, () =>
      Array.from({ length: gridSize.cols }, () => ({ isWhite: false }))
    );

    words.forEach((word, i) => {
      const { startX, startY, direction, highlight } = word;
      for (let j = 0; j < word.word.length; j++) {
        const r = direction === "horizontal" ? startY : startY + j;
        const c = direction === "horizontal" ? startX + j : startX;
        if (r >= 0 && r < gridSize.rows && c >= 0 && c < gridSize.cols) {
          grid[r][c].isWhite = true;
          if (j === 0) grid[r][c].wordNumber = i + 1;
          if (highlight) grid[r][c].highlight = true;
        }
      }
    });

    return grid;
  }, [gridSize, words]);

  const [grid, setGrid] = useState<(string | null)[][]>(() =>
    structure.map((row) => row.map((cell) => (cell.isWhite ? "" : null)))
  );

  useEffect(() => {
    const key = `${selected.row}-${selected.col}`;
    cellRefs.current[key]?.focus();
  }, [selected]);

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    r: number,
    c: number
  ) => {
    const key = e.key;
    const update = (val: string | null) => {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = val;
        return next;
      });
    };

    const findNext = (
      dr: number,
      dc: number
    ): { row: number; col: number } | null => {
      let nr = r + dr,
        nc = c + dc;
      while (nr >= 0 && nr < gridSize.rows && nc >= 0 && nc < gridSize.cols) {
        if (structure[nr][nc].isWhite) return { row: nr, col: nc };
        nr += dr;
        nc += dc;
      }
      return null;
    };

    if (key === "Backspace") {
      e.preventDefault();
      update("");
      const prev = findNext(0, -1) || findNext(-1, gridSize.cols);
      if (prev) setSelected(prev);
    } else if (key === "Delete") {
      e.preventDefault();
      update("");
    } else if (key === "ArrowLeft") setSelected(findNext(0, -1) || selected);
    else if (key === "ArrowRight") setSelected(findNext(0, 1) || selected);
    else if (key === "ArrowUp") setSelected(findNext(-1, 0) || selected);
    else if (key === "ArrowDown") setSelected(findNext(1, 0) || selected);
    else if (/^[a-zA-Z0-9]$/.test(key)) {
      e.preventDefault();
      update(key.toUpperCase());
      const next = findNext(0, 1) || findNext(1, -gridSize.cols);
      if (next) setSelected(next);
    }
  };

  const handleCheck = () => {
    const isCorrect = words.every((word) => {
      const { startX, startY, direction } = word;
      for (let j = 0; j < word.word.length; j++) {
        const r = direction === "horizontal" ? startY : startY + j;
        const c = direction === "horizontal" ? startX + j : startX;
        if (grid[r][c] !== word.word[j]) return false;
      }
      return true;
    });
    alert(isCorrect ? "Correct!" : "Incorrect!");
  };

  const handleReset = () => {
    setGrid(() =>
      structure.map((row) => row.map((cell) => (cell.isWhite ? "" : null)))
    );
    setSelected({ row: 0, col: 0 });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="grid gap-1 p-4"
        style={{ gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)` }}
      >
        {structure.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r}-${c}`;
            if (!cell.isWhite) return <div key={key} className="w-10 h-10 " />;

            const selectedCell = selected.row === r && selected.col === c;

            return (
              <div
                key={key}
                className={`relative rounded-b-lg border-b-4 shadow-xl ${
                  cell.highlight ? "border-[#7c0b36]" : "border-[#6d5037]"
                }`}
              >
                <input
                  ref={(el) => {
                    cellRefs.current[key] = el;
                  }}
                  type="text"
                  value={grid[r][c] || ""}
                  onChange={() => {}}
                  onKeyDown={(e) => handleKey(e, r, c)}
                  onClick={() => setSelected({ row: r, col: c })}
                  maxLength={1}
                  className={cn(
                    "w-10 h-10 text-center font-bold border-2 rounded-md text-lg text-[#6c4f36] transition-all duration-200",
                    selectedCell
                      ? " bg-amber-100 shadow-md"
                      : cell.highlight
                      ? "border-[#910202] bg-[#a81313] text-white"
                      : "border-[#cca66c] bg-[#ffd38d] hover:bg-amber-100"
                  )}
                />
                {cell.wordNumber && (
                  <span className="absolute top-0 left-0 text-xs font-bold text-amber-800 bg-white rounded-br px-1">
                    {cell.wordNumber}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="flex gap-4 mt-4">
        {/* check, reset */}
        <button
          onClick={handleCheck}
          className="bg-amber-800 hover:bg-amber-700 text-white py-2 px-4 rounded"
        >
          Check
        </button>
        <button
          onClick={handleReset}
          className="bg-amber-800 hover:bg-amber-700 text-white py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
