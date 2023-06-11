import { BoardManager } from "./board-manager";
import { sleep } from "./utils";

export class Solver {
  boardManager = new BoardManager();

  printBoard(showIndexes: boolean = false) {
    if (showIndexes) {
      this.boardManager.printBoardWithIndexes();
    } else {
      this.boardManager.printBoard();
    }
  }

  async randomRender() {
    let updates = 10;
    while (updates--) {
      this.boardManager.updatePlayerRandomly();
      this.boardManager.printBoard();

      await sleep(500);
    }
  }
}

const solver = new Solver();

const randomInitPos = true;

solver.boardManager.runBfs(randomInitPos);
