export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export const WINNING_LINES: readonly (readonly number[])[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function getWinningLine(board: Board): readonly number[] | null {
  return WINNING_LINES.find(([a, b, c]) => board[a] !== null && board[a] === board[b] && board[a] === board[c]) ?? null;
}

export function getGameResult(board: Board): Player | "draw" | null {
  const line = getWinningLine(board);
  if (line) return board[line[0]];
  return board.every((cell) => cell !== null) ? "draw" : null;
}
