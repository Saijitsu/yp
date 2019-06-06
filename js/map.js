/* BOARD Creation N*N ----------------------------------------------------------------
 NOTICE DU BOARD:
The convention when talking about a matrix is the use of "generic" variable names x and y.
In such discussions, x is always the column index (distance from the left)
and y is the row index (distance from the top).
So a y,x of [0][0] identifies the item at the top left.
[0][1] is the second item on the top row, [1][n] is on the second row and so forth. */
class Cell {
  constructor(contain, numberCell, y, x, freeCell, design) {
    this.contain = contain;
    this.numberCell = numberCell;
    this.y = y;
    this.x = x;
    this.freeCell = freeCell; // true by default
    this.design = design;
    this.highLightning = false; // false by default
  }
}

function boardCreation() {
  // Board creation
  board = new Array(columns);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(rows);
  }
  // Board Contain
  for (y = 0; y < (board.length); y++) for (x = 0; x < (board.length); x++) {
    currentCellPosition = x + y * board.length;
    // create the object and store a reference to the cell object so you can do something with it later
    let containTypeCell = containType(x, y, board.length, board, currentCellPosition);
    board[y][x] = containTypeCell;
    cellList.push(containTypeCell);
  }
}
