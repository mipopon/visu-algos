import { printBoard } from "../board/board-utils";
import { EMPTY_SYMBOL, VISITED_SYMBOL } from "../constants";
import { Board, Position } from "../types";
import { sleep } from "../utils";

export class Bfs {
  private board: Board = [];

  constructor(board: Board) {
    this.board = board;
  }

  async solve(pos: Position, silentRun = false): Promise<Board> {
    const queue: Position[] = [pos];

    while (queue.length) {
      const pos = queue.shift()!;

      if (this.board[pos.row][pos.col] === VISITED_SYMBOL) {
        continue;
      }

      this.board[pos.row][pos.col] = VISITED_SYMBOL;

      if (!silentRun) {
        await sleep(75);
        printBoard(this.board);
      }

      if (
        this.board[pos.row + 1] &&
        this.board[pos.row + 1][pos.col] === EMPTY_SYMBOL
      ) {
        queue.push({ row: pos.row + 1, col: pos.col });
      }
      if (
        this.board[pos.row - 1] &&
        this.board[pos.row - 1][pos.col] === EMPTY_SYMBOL
      ) {
        queue.push({ row: pos.row - 1, col: pos.col });
      }
      if (
        this.board[pos.row][pos.col + 1] &&
        this.board[pos.row][pos.col + 1] === EMPTY_SYMBOL
      ) {
        queue.push({ row: pos.row, col: pos.col + 1 });
      }
      if (
        this.board[pos.row][pos.col - 1] &&
        this.board[pos.row][pos.col - 1] === EMPTY_SYMBOL
      ) {
        queue.push({ row: pos.row, col: pos.col - 1 });
      }
    }
    return this.board;
  }
}
