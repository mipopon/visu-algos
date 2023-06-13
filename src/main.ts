import { Bfs } from "./solvers/bfs";
import { BoardGenerator } from "./board/board-generator";
import { Dfs } from "./solvers/dfs";
import { printBoard } from "./board/board-utils";

export class Main {
  boardGenerator = new BoardGenerator();

  test() {
    const board = this.boardGenerator.generate();
    printBoard(board);
    console.log(board);
  }

  async runBfs() {
    const board = this.boardGenerator.generate();
    const bfs = new Bfs(board);
    bfs.solve({ row: 0, col: 0 });
  }

  async runDfs() {
    const board = this.boardGenerator.generate();
    console.log(board);
    printBoard(board);
    const dfs = new Dfs(board);
    await dfs.solve({ row: 0, col: 0 });

    console.log(board);
    printBoard(board);
  }
}

const main = new Main();

main.runDfs();
