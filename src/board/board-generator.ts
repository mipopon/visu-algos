import { EMPTY_SYMBOL, WALL_SYMBOL } from "../constants";
import { Board } from "../types";
import { randomBetween } from "../utils";

const BOARD_SIZE = 10;
const WALL_COUNT = Math.floor(BOARD_SIZE / 1.25);
const WALL_MAX_SIZE = Math.floor(BOARD_SIZE / 3);
const WALL_MIN_SIZE = Math.floor(WALL_MAX_SIZE / 2);

export class BoardGenerator {
  generate(): Board {
    const board = this.generateEmptyBoard();
    return this.insertWalls(board);
  }

  private generateEmptyBoard(): Board {
    const board: Board = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      board[i] = Array(BOARD_SIZE).fill([]);
      for (let j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = EMPTY_SYMBOL;
      }
    }
    return board;
  }

  private insertWalls(board: Board): Board {
    let wallCount = 0;
    while (wallCount < WALL_COUNT) {
      const wallSize = randomBetween(WALL_MIN_SIZE, WALL_MAX_SIZE);
      const isHorizontal = randomBetween(0, 100) % 2 === 0;

      const initPos = {
        row: randomBetween(1, BOARD_SIZE - 2), // no borders
        col: randomBetween(1, BOARD_SIZE - 2),
      };

      if (isHorizontal) {
        for (let i = 0; i < wallSize; i++) {
          if (!board[initPos.row][initPos.col + i]) break; // out of bounds, wall hit the limit
          board[initPos.row][initPos.col + i] = WALL_SYMBOL;
        }
      } else {
        for (let i = 0; i < wallSize; i++) {
          if (!board[initPos.row + i]) break; // out of bounds, wall hit the limit
          board[initPos.row + i][initPos.col] = WALL_SYMBOL;
        }
      }

      wallCount++;
    }
    return board;
  }
}
