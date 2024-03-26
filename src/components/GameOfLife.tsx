"use client";

import React, { useEffect } from "react";
import { useGrid } from "@/context/GridContext";
import Controls from "@/components/Controls";
import { FaGithub } from "react-icons/fa";

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

      <div className="flex flex-col items-center justify-center h-screen p-5 md:p-30">
        <h2 className=" flex gap-3 mb-4 sm:mb-8 text-center text-xl sm:text-3xl font-medium text-purple-300">
          {"Conway's"}
          <span className="inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
            Game of Life
          </span>
          <a
            href="https://github.com/shlomomdahan/game-of-life"
            className="flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              className="h-8 w-8 sm:h-10 sm:w-10"
              style={{
                color: "rgba(255,255,255,0.85)",
              }}
            />
          </a>
        </h2>

        <Controls />

        <div
          className="grid gap-px shadow-lg sm:mb-10"
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
