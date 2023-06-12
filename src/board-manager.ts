import { randomBetween, sleep } from "./utils";

const BOARD_SIZE = 40;
const NOF_WALLS = Math.floor(BOARD_SIZE / 1.25);
const WALL_MAX_SIZE = Math.floor(BOARD_SIZE / 3);
const WALL_MIN_SIZE = Math.floor(WALL_MAX_SIZE / 2);

const EMPTY_SYMBOL = "\x1b[32m▓\x1b[0m";
const WALL_SYMBOL = "\x1b[31m▓\x1b[0m";
const VISITED_SYMBOL = "\x1b[34m▓\x1b[0m";

export type BoardConfig = {
  size?: number;
  numOfWalls?: number;
};

export type Board = string[][];

export class BoardManager {
  private readonly boardSize: number = BOARD_SIZE;
  private readonly numOfWalls: number = NOF_WALLS;
  board: Board = [];

  constructor(boardConfig?: BoardConfig) {
    if (boardConfig) {
      if (boardConfig.size) {
        this.boardSize = boardConfig.size;
      }
      if (boardConfig.numOfWalls) {
        this.numOfWalls = boardConfig.numOfWalls;
      }
    }
    this.generateEmptyBoard();
    this.insertWalls();
  }

  private generateEmptyBoard(): Board {
    console.log("=== Board Configs ===");
    console.log(`Size: ${this.boardSize} x ${this.boardSize}`);
    console.log(
      `Walls: ${this.numOfWalls} of size between ${WALL_MIN_SIZE}-${WALL_MAX_SIZE}`
    );
    console.log("=== Board Configs ===");
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = Array(this.boardSize).fill([]);
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = EMPTY_SYMBOL;
      }
    }
    return this.board;
  }

  private insertWalls() {
    let wallCount = 0;
    while (wallCount < this.numOfWalls) {
      const wallSize = randomBetween(WALL_MIN_SIZE, WALL_MAX_SIZE);
      const isHorizontal = randomBetween(0, 100) % 2 === 0;
      console.log(
        `Inserting a ${isHorizontal ? "horizontal" : "vertical"} wall number ${
          wallCount + 1
        }, size ${wallSize}`
      );

      const initRow = randomBetween(1, this.boardSize - 2); // no borders
      const initCol = randomBetween(1, this.boardSize - 2); // no borders
      console.log(`init row and col ${initRow}x${initCol}`);

      if (isHorizontal) {
        for (let i = 0; i < wallSize; i++) {
          if (!this.board[initRow][initCol + i]) break; // out of bounds, wall hit the limit
          this.board[initRow][initCol + i] = WALL_SYMBOL;
        }
      } else {
        for (let i = 0; i < wallSize; i++) {
          if (!this.board[initRow + i]) break; // out of bounds, wall hit the limit
          this.board[initRow + i][initCol] = WALL_SYMBOL;
        }
      }

      wallCount++;
    }
  }

  private getRandomEmptyPosition(): number[] {
    let randCol = 0;
    let randRow = 0;
    while (true) {
      randCol = randomBetween(0, this.boardSize - 1);
      randRow = randomBetween(0, this.boardSize - 1);

      if (this.board[randRow][randCol] === EMPTY_SYMBOL) {
        break;
      }
    }
    return [randRow, randCol];
  }

  updatePlayerRandomly() {
    const [randCol, randRow] = this.getRandomEmptyPosition();
    this.board[randRow][randCol] = VISITED_SYMBOL;
  }

  async runDfs(row: number, col: number) {
    this.board[row][col] = VISITED_SYMBOL;
    await sleep(100);
    // console.clear();
    this.printBoard();

    if (this.board[row + 1] && this.board[row + 1][col] === EMPTY_SYMBOL) {
      await this.runDfs(row + 1, col);
    }
    if (this.board[row - 1] && this.board[row - 1][col] === EMPTY_SYMBOL) {
      await this.runDfs(row - 1, col);
    }
    if (this.board[row][col + 1] && this.board[row][col + 1] === EMPTY_SYMBOL) {
      await this.runDfs(row, col + 1);
    }
    if (this.board[row][col - 1] && this.board[row][col - 1] === EMPTY_SYMBOL) {
      await this.runDfs(row, col - 1);
    }
  }

  async runBfs(randomInit: boolean = false) {
    let init = [0, 0];

    if (randomInit) {
      init = this.getRandomEmptyPosition();
    }

    const queue: number[][] = [init];

    while (queue.length) {
      const pos = queue.shift()!;
      const row = pos[0];
      const col = pos[1];

      if (this.board[row][col] === VISITED_SYMBOL) {
        continue;
      }

      this.board[row][col] = VISITED_SYMBOL;
      await sleep(75);
      // console.clear();
      this.printBoard();

      if (this.board[row + 1] && this.board[row + 1][col] === EMPTY_SYMBOL) {
        queue.push([row + 1, col]);
      }
      if (this.board[row - 1] && this.board[row - 1][col] === EMPTY_SYMBOL) {
        queue.push([row - 1, col]);
      }
      if (
        this.board[row][col + 1] &&
        this.board[row][col + 1] === EMPTY_SYMBOL
      ) {
        queue.push([row, col + 1]);
      }
      if (
        this.board[row][col - 1] &&
        this.board[row][col - 1] === EMPTY_SYMBOL
      ) {
        queue.push([row, col - 1]);
      }
    }
  }

  printBoardWithIndexes() {
    let board = "";
    for (let i = 0; i < this.boardSize; i++) {
      if (i === 0) {
        board += "  ";
        for (let k = 0; k < this.boardSize; k++) {
          board += ` ${k < 10 ? " " : ""}${k}`;
        }
      }
      board += "\n";
      for (let j = 0; j < this.boardSize; j++) {
        if (j === 0) board += `${i < 10 ? " " : ""}${i}`;
        board += "  " + this.board[i][j];
      }
    }
    console.log(board);
  }

  printBoard() {
    let board = "";
    for (let i = 0; i < this.boardSize; i++) {
      board += "\n";
      for (let j = 0; j < this.boardSize; j++) {
        board += " " + this.board[i][j];
      }
    }
    console.log(board);
  }
}
