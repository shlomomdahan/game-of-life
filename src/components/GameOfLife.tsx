"use client";

import React, { useEffect } from "react";
import { useGrid } from "@/context/GridContext";
import Controls from "@/components/Controls";

const GameOfLife: React.FC = () => {
  const { grid, cols, handleMouseDown, handleMouseEnter, handleMouseUp } =
    useGrid();

  useEffect(() => {
    const mouseUpListener = () => handleMouseUp();
    window.addEventListener("mouseup", mouseUpListener);
    return () => window.removeEventListener("mouseup", mouseUpListener);
  }, [handleMouseUp]);

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex flex-col items-center justify-center h-screen p-30 ">
        {/* <div className="mb-5 mt-10 text-white font-semibold text-md sm:text-2xl">
          {"Conway's Game of Life"}
        </div> */}
        <h2 className="mt-5 mb-8 text-center text-xl sm:text-3xl font-medium dark:text-gray-50">
          Conways{" "}
          <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
            Game of Life
          </span>
        </h2>

        <Controls />

        <div
          className="grid gap-px shadow-lg mb-10"
          style={{
            gridTemplateColumns: `repeat(${cols}, 20px)`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                className={`cell ${cell ? "bg-black" : "bg-white"}`}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
