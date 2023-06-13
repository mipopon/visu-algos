import { Bfs } from "./solvers/bfs";
import { BoardGenerator } from "./board/board-generator";
import { Dfs } from "./solvers/dfs";

export class Main {
  boardGenerator = new BoardGenerator();

  async runBfs() {
    const board = this.boardGenerator.generate();
    const bfs = new Bfs(board);
    bfs.solve({ row: 0, col: 0 });
  }

  async runDfs() {
    const board = this.boardGenerator.generate();
    const dfs = new Dfs(board);
    dfs.solve({ row: 0, col: 0 });
  }
}

const main = new Main();

main.runBfs();
