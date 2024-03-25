"use client";

import React from "react";
import { useGrid } from "@/context/GridContext";

const Controls = () => {
  const { handleStart, handleStop, handleClear, handleSpeedChange, isRunning } =
    useGrid();

  const onSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const min = 2;
    const max = 500;
    const value = Number(event.target.value);
    const invertedValue = max + min - value;
    handleSpeedChange(invertedValue);
  };

  const baseButtonClass =
    "shadow-lg rounded-xl mb-3 sm:mb-5 font-bold p-2 sm:p-2 sm:px-4 rounded transform transition duration-150 ease-in-out text-sm sm:text-base text-white";

  const toggleStartStop = () => {
    if (isRunning) {
      handleStop();
    } else {
      handleStart();
    }
  };

  return (
    <div className="flex flex-row gap-4 items-center justify-center mb-6">
      <button
        className={`${baseButtonClass} ${
          isRunning
            ? "bg-red-500 hover:bg-red-700"
            : "bg-green-500 hover:bg-green-700"
        }`}
        onClick={toggleStartStop}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <button
        className={`${baseButtonClass} bg-blue-500 hover:bg-blue-700`}
        onClick={handleClear}
      >
        Clear
      </button>
      <div className="flex flex-col gap-1 items-center justify-center mb-4">
        <span className="inline-flex items-center pl-2 text-white">Speed</span>
        <input
          type="range"
          min="2"
          max="500"
          defaultValue="350"
          step="2"
          onChange={onSpeedChange}
          className="mb-4 h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
      </div>
    </div>
  );
};

export default Controls;
