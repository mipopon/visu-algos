import { Bfs } from "./solvers/bfs";
import { BoardGenerator } from "./board/board-generator";
import { Dfs } from "./solvers/dfs";
import { getRandomEmptyPosition, printBoard } from "./board/board-utils";

export class Main {
  boardGenerator = new BoardGenerator();

  test() {
    const board = this.boardGenerator.generate();
    printBoard(board);
    console.log(board);
  }

  async runBfs() {
    const board = this.boardGenerator.generate();

    const randomDestination = getRandomEmptyPosition(board);
    this.boardGenerator.setDestination(board, randomDestination);

    const bfs = new Bfs(board);

    const randomInit = getRandomEmptyPosition(board);
    bfs.solve(randomInit);
  }

  async runDfs() {
    const board = this.boardGenerator.generate();

    const randomDestination = getRandomEmptyPosition(board);
    this.boardGenerator.setDestination(board, randomDestination);

    const dfs = new Dfs(board);

    const randomInit = getRandomEmptyPosition(board);
    await dfs.solve(randomInit);
  }
}

const main = new Main();

main.runBfs();
