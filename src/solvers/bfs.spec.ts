import { Board } from "../../src/types";
import {
  nonSolvedBoard10,
  nonSolvedBoard20WithIsolatedIslands,
  solvedBoard10,
  solvedBoard20WithIsolatedIslands,
} from "../test-data/solved-boards";
import { Bfs } from "./bfs";

describe("BFS", () => {
  it("should visit all possible nodes", async () => {
    let board: Board = nonSolvedBoard10;
    let solvedBoard: Board = solvedBoard10;

    const bfs = new Bfs(board);

    const bfsSolvedBoard = await bfs.solve({ row: 0, col: 0 }, true);

    let allMatch = true;
    for (let i = 0; i < board[0].length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (solvedBoard[i][j] !== bfsSolvedBoard[i][j]) {
          allMatch = false;
          break;
        }
      }
    }

    expect(allMatch).toBeTruthy();
  });

  it("should visit all possible nodes and ignore isolated islands", async () => {
    let board: Board = nonSolvedBoard20WithIsolatedIslands;
    let solvedBoard: Board = solvedBoard20WithIsolatedIslands;

    const bfs = new Bfs(board);

    const bfsSolvedBoard = await bfs.solve({ row: 0, col: 0 }, true);

    let allMatch = true;
    for (let i = 0; i < board[0].length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (solvedBoard[i][j] !== bfsSolvedBoard[i][j]) {
          allMatch = false;
          break;
        }
      }
    }

    expect(allMatch).toBeTruthy();
  });
});
