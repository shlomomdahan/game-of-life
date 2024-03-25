"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { generateGrid, updateGrid } from "@/components/Grid";

interface GridContextType {
  grid: number[][];
  cols: number;
  toggleCellState: (rowIdx: number, colIdx: number) => void;
  handleMouseDown: (rowIdx: number, colIdx: number) => void;
  handleMouseEnter: (rowIdx: number, colIdx: number) => void;
  handleMouseUp: () => void;
  handleStart: () => void;
  handleStop: () => void;
  handleClear: () => void;
  handleSpeedChange: (speed: number) => void;
  isRunning?: boolean;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

interface GridProviderProps {
  children: ReactNode;
}

export const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [cols, setCols] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const isRunningRef = useRef(isRunning);
  const intervalRef = useRef<number | null>(null);
  const [intervalSpeed, setIntervalSpeed] = useState(100);
  const intervalSpeedRef = useRef(intervalSpeed);

  useEffect(() => {
    const updateGridSize = () => {
      const { rows, cols } = calculateDimensions();
      setGrid(generateGrid(rows, cols));
      setCols(cols);
    };

    updateGridSize();

    window.addEventListener("resize", updateGridSize);

    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const toggleCellState = (rowIdx: number, colIdx: number) => {
    const newGrid = [...grid];
    newGrid[rowIdx][colIdx] = newGrid[rowIdx][colIdx] ? 0 : 1;
    setGrid(newGrid);
  };

  const handleMouseDown = (rowIdx: number, colIdx: number) => {
    setIsMouseDown(true);
    toggleCellState(rowIdx, colIdx);
  };

  const handleMouseEnter = (rowIdx: number, colIdx: number) => {
    if (isMouseDown) {
      toggleCellState(rowIdx, colIdx);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleClear = () => {
    handleStop();
    setGrid(generateGrid(grid.length, cols));
  };

  const handleSpeedChange = (speed: number) => {
    setIntervalSpeed(speed);
  };

  const handleStart = () => {
    if (!isRunningRef.current) {
      console.log("start");
      setIsRunning(true);
      isRunningRef.current = true; // Update the ref synchronously
      runAnimation();
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    isRunningRef.current = false; // Update the ref synchronously
  };

  const runAnimation = () => {
    let lastFrameTime = Date.now();

    const animate = () => {
      if (!isRunningRef.current) return; // Use the ref to check the running state

      const currentTime = Date.now();
      const delta = currentTime - lastFrameTime;

      if (delta >= intervalSpeedRef.current) {
        // Use the ref to get the current speed
        setGrid((g) => updateGrid(g));
        lastFrameTime = currentTime - (delta % intervalSpeedRef.current);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    isRunningRef.current = isRunning; // Update the ref whenever isRunning changes
  }, [isRunning]);

  useEffect(() => {
    intervalSpeedRef.current = intervalSpeed;
  }, [intervalSpeed]);

  const value = {
    grid,
    cols,
    toggleCellState,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleStart,
    handleStop,
    handleClear,
    handleSpeedChange,
    isRunning,
  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
};

const calculateDimensions = () => {
  const maxWidth = window.innerWidth * 0.8;
  const cellSize = 20;
  const cols = Math.floor(maxWidth / cellSize);
  const rows = Math.floor((window.innerHeight * 0.7) / cellSize);
  return { rows, cols };
};
