import { printBoard } from "../board/board-utils";
import { DESTINATION_SYMBOL, EMPTY_SYMBOL, VISITED_SYMBOL } from "../constants";
import { Board, Position } from "../types";
import { sleep } from "../utils";

export class Bfs {
  private board: Board = [];
  private solutionFound = false;
  private nodesVisited = 0;

  constructor(board: Board) {
    this.board = board;
  }

  async solve(pos: Position, silentRun = false): Promise<Board> {
    const solvedBoard = await this.bfs(pos, silentRun);

    if (silentRun) {
      return solvedBoard;
    }

    if (this.solutionFound) {
      console.log(
        `[BFS] Solution found after visiting ${this.nodesVisited} nodes`
      );
    } else {
      console.log(`[BFS] Visited all ${this.nodesVisited} possible nodes`);
    }
    return solvedBoard;
  }

  async bfs(pos: Position, silentRun = false): Promise<Board> {
    const queue: Position[] = [pos];

    while (queue.length) {
      const pos = queue.shift()!;

      if (this.board[pos.row][pos.col] === VISITED_SYMBOL) {
        continue;
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
          console.log(
            `Solution found after visiting ${this.nodesVisited} nodes`
          );
          return this.board;
        }

        if (this.board[pos.row + 1][pos.col] === EMPTY_SYMBOL) {
          queue.push({ row: pos.row + 1, col: pos.col });
        }
      }
      if (this.board[pos.row - 1]) {
        if (this.board[pos.row - 1][pos.col] === DESTINATION_SYMBOL) {
          this.solutionFound = true;
          console.log(
            `Solution found after visiting ${this.nodesVisited} nodes`
          );
          return this.board;
        }

        if (this.board[pos.row - 1][pos.col] === EMPTY_SYMBOL) {
          queue.push({ row: pos.row - 1, col: pos.col });
        }
      }
      if (this.board[pos.row][pos.col + 1]) {
        if (this.board[pos.row][pos.col + 1] === DESTINATION_SYMBOL) {
          this.solutionFound = true;
          console.log(
            `Solution found after visiting ${this.nodesVisited} nodes`
          );
          return this.board;
        }

        if (this.board[pos.row][pos.col + 1] === EMPTY_SYMBOL) {
          queue.push({ row: pos.row, col: pos.col + 1 });
        }
      }
      if (this.board[pos.row][pos.col - 1]) {
        if (this.board[pos.row][pos.col - 1] === DESTINATION_SYMBOL) {
          this.solutionFound = true;
          console.log(
            `Solution found after visiting ${this.nodesVisited} nodes`
          );
          return this.board;
        }

        if (this.board[pos.row][pos.col - 1] === EMPTY_SYMBOL) {
          queue.push({ row: pos.row, col: pos.col - 1 });
        }
      }
    }
    return this.board;
  }
}
