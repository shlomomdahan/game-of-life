export const rows = 40;
export const cols = 50;

export const generateGrid = (rows: number, cols: number) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array.from(Array(cols), () => 0));
  }
  return grid;
};

const positions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

export const updateGrid = (grid: number[][]) => {
  const newGrid = grid.map((row, i) =>
    row.map((cell, k) => {
      let neighbors = 0;
      positions.forEach(([x, y]) => {
        const newI = i + x;
        const newK = k + y;
        if (newI >= 0 && newI < grid.length && newK >= 0 && newK < row.length) {
          neighbors += grid[newI][newK] ?? 0;
        }
      });

      if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
        return 0; // Cell dies
      } else if (cell === 0 && neighbors === 3) {
        return 1; // Cell becomes alive
      }
      return cell; // No change
    })
  );
  return newGrid;
};
