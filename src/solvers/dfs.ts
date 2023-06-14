import { printBoard } from "../board/board-utils";
import { DESTINATION_SYMBOL, EMPTY_SYMBOL, VISITED_SYMBOL } from "../constants";
import { Board, Position } from "../types";
import { sleep } from "../utils";

export class Dfs {
  private board: Board = [];
  private solutionFound = false;
  private nodesVisited = 0;

  constructor(board: Board) {
    this.board = board;
  }

  async solve(pos: Position, silentRun = false): Promise<Board> {
    const solvedBoard = await this.dfs(pos, silentRun);

    if (silentRun) {
      return solvedBoard;
    }

    if (this.solutionFound) {
      console.log(
        `[DFS] Solution found after visiting ${this.nodesVisited} nodes`
      );
    } else {
      console.log(`[DFS] Visited all ${this.nodesVisited} possible nodes`);
    }
    return solvedBoard;
  }

  async dfs(pos: Position, silentRun = false): Promise<Board> {
    if (this.solutionFound) {
      return this.board;
    }

    this.board[pos.row][pos.col] = VISITED_SYMBOL;
    this.nodesVisited++;

    if (!silentRun) {
      await sleep(75);
      printBoard(this.board);
    }

    if (this.board[pos.row + 1]) {
      if (this.board[pos.row + 1][pos.col] === DESTINATION_SYMBOL) {
        this.solutionFound = true;
        return this.board;
      }

      if (this.board[pos.row + 1][pos.col] === EMPTY_SYMBOL) {
        await this.dfs({ row: pos.row + 1, col: pos.col }, silentRun);
      }
    }
    if (this.board[pos.row - 1]) {
      if (this.board[pos.row - 1][pos.col] === DESTINATION_SYMBOL) {
        this.solutionFound = true;
        return this.board;
      }

      if (this.board[pos.row - 1][pos.col] === EMPTY_SYMBOL) {
        await this.dfs({ row: pos.row - 1, col: pos.col }, silentRun);
      }
    }
    if (this.board[pos.row][pos.col + 1]) {
      if (this.board[pos.row][pos.col + 1] === DESTINATION_SYMBOL) {
        this.solutionFound = true;
        return this.board;
      }

      if (this.board[pos.row][pos.col + 1] === EMPTY_SYMBOL) {
        await this.dfs({ row: pos.row, col: pos.col + 1 }, silentRun);
      }
    }
    if (this.board[pos.row][pos.col - 1]) {
      if (this.board[pos.row][pos.col - 1] === DESTINATION_SYMBOL) {
        this.solutionFound = true;
        return this.board;
      }

      if (this.board[pos.row][pos.col - 1] === EMPTY_SYMBOL) {
        await this.dfs({ row: pos.row, col: pos.col - 1 }, silentRun);
      }
    }
    return this.board;
  }
}
