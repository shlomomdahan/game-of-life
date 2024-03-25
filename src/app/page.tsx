import React from "react";
import { GridProvider } from "@/context/GridContext";
import GameOfLife from "@/components/GameOfLife";

export default function Home() {
  return (
    <main>
      <GridProvider>
        <GameOfLife />
      </GridProvider>
    </main>
  );
}
