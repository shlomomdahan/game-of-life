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
    "inline-flex items-center justify-center shadow-md rounded-full mb-3 sm:mb-5 font-bold p-2 sm:p-3 sm:px-5 px-4 cursor-pointer transform transition-all duration-150 ease-in-out text-sm sm:text-base text-white hover:scale-105";

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
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        }`}
        onClick={toggleStartStop}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <button
        className={`${baseButtonClass} bg-gradient-to-r from-purple-500 to-slate-500 hover:from-purple-600 hover:to-slate-600`}
        onClick={handleClear}
      >
        Clear
      </button>
      <div className="flex flex-col gap-2 items-center justify-center mb-3 sm:mb-8 ml-5">
        <span className="text-white font-semibold">Speed</span>
        <input
          type="range"
          min="2"
          max="500"
          defaultValue="350"
          step="2"
          onChange={onSpeedChange}
          className="w-full h-2 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg appearance-none cursor-pointer transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Controls;
