import { EMPTY_SYMBOL, VISITED_SYMBOL } from "../constants";
import { Board, Position } from "../types";
import { randomBetween } from "../utils";

export function printBoard(board: Board) {
  let boardToPrint = "";
  for (let i = 0; i < board[0].length; i++) {
    boardToPrint += "\n";
    for (let j = 0; j < board[0].length; j++) {
      boardToPrint += " " + board[i][j];
    }
  }
  console.log(boardToPrint);
}

export function printBoardWithIndexes(board: Board) {
  let boardToPrint = "";
  for (let i = 0; i < board[0].length; i++) {
    if (i === 0) {
      boardToPrint += "  ";
      for (let k = 0; k < board[0].length; k++) {
        boardToPrint += ` ${k < 10 ? " " : ""}${k}`;
      }
    }
    boardToPrint += "\n";
    for (let j = 0; j < board[0].length; j++) {
      if (j === 0) boardToPrint += `${i < 10 ? " " : ""}${i}`;
      boardToPrint += "  " + board[i][j];
    }
  }
  console.log(boardToPrint);
}

export function resetBoard(board: Board) {
  for (let i = 0; i < board[0].length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === VISITED_SYMBOL) {
        board[i][j] = EMPTY_SYMBOL;
      }
    }
  }
}

export function getRandomEmptyPosition(board: Board): Position {
  let randCol = 0;
  let randRow = 0;
  let tries = 1000;
  while (tries--) {
    randCol = randomBetween(0, board[0].length - 1);
    randRow = randomBetween(0, board[0].length - 1);

    if (board[randRow][randCol] === EMPTY_SYMBOL) {
      break;
    }
  }
  return { row: randRow, col: randCol };
}
