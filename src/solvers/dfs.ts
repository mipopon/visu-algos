import { printBoard } from "../board/board-utils";
import { EMPTY_SYMBOL, VISITED_SYMBOL } from "../constants";
import { Board, Position } from "../types";
import { sleep } from "../utils";

export class Dfs {
  private board: Board = [];

  constructor(board: Board) {
    this.board = board;
  }

  async solve(pos: Position) {
    this.board[pos.row][pos.col] = VISITED_SYMBOL;

    await sleep(75);
    printBoard(this.board);

    if (
      this.board[pos.row + 1] &&
      this.board[pos.row + 1][pos.col] === EMPTY_SYMBOL
    ) {
      await this.solve({ row: pos.row + 1, col: pos.col });
    }
    if (
      this.board[pos.row - 1] &&
      this.board[pos.row - 1][pos.col] === EMPTY_SYMBOL
    ) {
      await this.solve({ row: pos.row - 1, col: pos.col });
    }
    if (
      this.board[pos.row][pos.col + 1] &&
      this.board[pos.row][pos.col + 1] === EMPTY_SYMBOL
    ) {
      await this.solve({ row: pos.row, col: pos.col + 1 });
    }
    if (
      this.board[pos.row][pos.col - 1] &&
      this.board[pos.row][pos.col - 1] === EMPTY_SYMBOL
    ) {
      await this.solve({ row: pos.row, col: pos.col - 1 });
    }
  }
}
