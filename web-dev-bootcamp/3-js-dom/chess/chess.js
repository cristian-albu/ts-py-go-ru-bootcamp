const boardElement = document.getElementById("board");
let moveCounter = 0;

const pieceImages = {
  wPawn: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
  bPawn: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
  wRook: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
  bRook: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
  wKnight:
    "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
  bKnight:
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
  wBishop:
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
  bBishop:
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
  wQueen: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
  bQueen: "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
  wKing: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
  bKing: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
};

/**
 * Returns a function that determines the square color based on the index
 * @returns {(i:number)=> string}
 */
const squareColor = () => {
  let currentRow = 0;
  return (i) => {
    let currentSqColor = "";
    if (i % 8 === 0) currentRow++;
    if (currentRow % 2 === 0) {
      currentSqColor = i % 2 === 0 ? "black" : "white";
    } else {
      currentSqColor = i % 2 === 0 ? "white" : "black";
    }
    return currentSqColor;
  };
};

/**
 * Builds a chess piece. The position number and all the numbers
 * inside canMoveTo and canCapture must be between 0-63
 * @param {string} name
 * @param {"white"|"black"} color
 * @param {number} initialPosition
 * @param {(color:string, position:number) => [number[],number[]]} pieceView
 * @param {string} image
 * @returns {{name: string, color: string, position: number, canMoveTo: number[], canCapture: number[], image: string} }
 */
function pieceBuilder(name, color, initialPosition, pieceView, image) {
  let [canMoveTo, canCapture] = pieceView(color, initialPosition);
  return {
    name: name,
    color: color,
    position: initialPosition,
    canMoveTo: canMoveTo,
    canCapture: canCapture,
    pieceView: pieceView,
    image: image,
  };
}
/**
 * Check to see if number is bigger or equal with 0 and smaller or equal with 63
 * @param {number} num
 * @returns {boolean}
 */
function fitsInterval(num) {
  return num >= 0 && num <= 63;
}

/**
 * Returns a letter from a-h of the current file
 * @param {number} i
 * @returns {string}
 */
const determineFile = (i) => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  if (i % 8 === 0) return files[0];
  for (let j = 1; j < 8; j++) {
    if (i === j || (i - j) % 8 === 0) {
      return files[j];
    }
  }
};
/**
 * Builds a list of what a pawn can view and a list for what a pawn can capture
 * @param {"white"|"black"} color
 * @param {number} position
 * @returns {[number[], number[]]}
 */
function pawnView(color, position) {
  const canMoveTo = [];
  const canCapture = [];
  if (color === "white") {
    canMoveTo.push(position - 8);
    if (position <= 55 && position >= 47) canMoveTo.push(position - 16);

    canCapture.push(position - 7, position - 9);
  } else if (color === "black") {
    canMoveTo.push(position + 8);
    if (position <= 15 && position >= 8) canMoveTo.push(position + 16);

    canCapture.push(position + 7, position + 9);
  } else {
    console.log("Color must be: white | black");
  }
  return [canMoveTo, canCapture];
}

/**
 * Builds a list of what a bishop can view and a list for what a bishop can capture
 * @param {"black" | "white"} color
 * @param {number} position
 * @returns {[number[], number[]]}
 */
function bishopView(color, position) {
  if (color !== "white" && color !== "black") {
    console.log("Color must be white | black");
  }
  const canMoveTo = [];
  const canCapture = [];

  let stepsLeft = position % 8;

  for (let i = 1; i <= stepsLeft; i++) {
    let lDiagTop = position - 9 * i;
    let lDiagBtm = position + 7 * i;
    if (fitsInterval(lDiagTop)) canMoveTo.push(lDiagTop);
    if (fitsInterval(lDiagBtm)) canMoveTo.push(lDiagBtm);
  }

  for (let i = 1; i < 8 - stepsLeft; i++) {
    let rDiagTop = position + 9 * i;
    let rDiagBtm = position - 7 * i;
    if (fitsInterval(rDiagTop)) canMoveTo.push(rDiagTop);
    if (fitsInterval(rDiagBtm)) canMoveTo.push(rDiagBtm);
  }

  return [canMoveTo, canCapture];
}

/**
 * Builds a list of what a knight can view and a list for what a knight can capture
 * @param {"black" | "white"} color
 * @param {number} position
 * @returns {[number[], number[]]}
 */
function knightView(color, position) {
  if (color !== "white" && color !== "black") {
    console.log("Color must be white | black");
  }
  const canMoveTo = [];
  const canCapture = [];
  let stepsLeft = position % 8;
  const moveList = [];

  // top left
  if (stepsLeft > 0 && position > 15) moveList.push(position - 17);

  // upper left
  if (stepsLeft > 1 && position > 7) moveList.push(position - 10);

  // top right
  if (stepsLeft < 7 && position > 15) moveList.push(position - 15);

  // upper right
  if (stepsLeft < 6 && position > 7) moveList.push(position - 6);

  // bottom left
  if (stepsLeft > 0 && position < 55) moveList.push(position + 15);

  // lower left
  if (stepsLeft > 1 && position < 48) moveList.push(position + 6);

  // bottom right
  if (stepsLeft < 7 && position < 55) moveList.push(position + 17);

  // lower right
  if (stepsLeft < 6 && position < 48) moveList.push(position + 10);

  moveList.forEach((e) => {
    if (fitsInterval(e)) {
      canMoveTo.push(e);
    }
  });

  return [canMoveTo, canCapture];
}

/**
 * Builds a list of what a rook can view and a list for what a rook can capture
 * @param {"black" | "white"} color
 * @param {number} position
 * @returns {[number[], number[]]}
 */
function rookView(color, position) {
  const canMoveTo = [];
  const canCapture = [];
  return [canMoveTo, canCapture];
}

/**
 * Builds a list of what a queen can view and a list for what a queen can capture
 * @param {"black" | "white"} color
 * @param {number} position
 * @returns {[number[], number[]]}
 */
function queenView(color, position) {
  const canMoveTo = [];
  const canCapture = [];
  return [canMoveTo, canCapture];
}

/**
 * Builds a list of what a king can view and a list for what a king can capture
 * @param {"black" | "white"} color
 * @param {number} position
 * @returns {[number[], number[]]}
 */
function kingView(color, position) {
  const canMoveTo = [];
  const canCapture = [];
  return [canMoveTo, canCapture];
}

/**
 * Returns a pieceBuilder function for each of the initial places of the pieces
 * @param {number} i
 * @returns {pieceBuilder}
 */
function initializePieces(i) {
  let clr = i < 16 ? "black" : "white";
  let p = i < 16 ? "b" : "w";

  switch (true) {
    case i === 0 || i === 7:
      return pieceBuilder(
        `${p}Rook`,
        clr,
        i,
        rookView,
        pieceImages[`${p}Rook`]
      );
    case i === 1 || i === 6:
      return pieceBuilder(
        `${p}Knight`,
        clr,
        i,
        knightView,
        pieceImages[`${p}Knight`]
      );
    case i === 2 || i === 5:
      return pieceBuilder(
        `${p}Bishop`,
        clr,
        i,
        bishopView,
        pieceImages[`${p}Bishop`]
      );
    case i === 3:
      return pieceBuilder(
        `${p}Queen`,
        clr,
        i,
        pawnView,
        pieceImages[`${p}Queen`]
      );
    case i === 4:
      return pieceBuilder(
        `${p}King`,
        clr,
        i,
        pawnView,
        pieceImages[`${p}King`]
      );
    case i > 7 && i < 16:
      return pieceBuilder(
        `${p}Pawn`,
        clr,
        i,
        pawnView,
        pieceImages[`${p}Pawn`]
      );
    case i > 47 && i < 56:
      return pieceBuilder(
        `${p}Pawn`,
        clr,
        i,
        pawnView,
        pieceImages[`${p}Pawn`]
      );
    case i === 56 || i === 63:
      return pieceBuilder(
        `${p}Rook`,
        clr,
        i,
        rookView,
        pieceImages[`${p}Rook`]
      );
    case i === 57 || i === 62:
      return pieceBuilder(
        `${p}Knight`,
        clr,
        i,
        knightView,
        pieceImages[`${p}Knight`]
      );
    case i === 58 || i === 61:
      return pieceBuilder(
        `${p}Bishop`,
        clr,
        i,
        bishopView,
        pieceImages[`${p}Bishop`]
      );
    case i === 60:
      return pieceBuilder(
        `${p}King`,
        clr,
        i,
        pawnView,
        pieceImages[`${p}King`]
      );
    case i === 59:
      return pieceBuilder(
        `${p}Queen`,
        clr,
        i,
        pawnView,
        pieceImages[`${p}Queen`]
      );
    default:
      return null;
  }
}

/**
 * Places the pieces on the board and adds each piece as a child object in the board array
 * @param {number} i
 */
function placePiece(i) {
  const currSquare = document.getElementById(i);
  const currPiece = initializePieces(i);

  if (currPiece) {
    board[i].child = currPiece;
    let currPieceElement = document.createElement("button");
    if (currPiece.name.includes("Pawn")) {
      currPieceElement.setAttribute("id", `${board[i].file}_${currPiece.name}`);
    } else {
      currPieceElement.setAttribute("id", currPiece.name);
    }

    currPieceElement.setAttribute("class", "piece");
    currPieceElement.setAttribute("color", currPiece.color);
    currPieceElement.style.backgroundImage = `url(${currPiece.image})`;

    currSquare.appendChild(currPieceElement);
  }
}

function isPined() {
  return true;
}

function isChecked() {
  return true;
}

/**
 * Builds the squares of the board and the local board array with the square objects
 */
function buildBoard() {
  const determineSquareColor = squareColor();

  for (let i = 0; i < 64; i++) {
    let currentSquareData = {
      id: i,
      file: determineFile(i),
      color: determineSquareColor(i),
      child: null,
      selectable: false,
      capturable: false,
    };

    board.push(currentSquareData);

    const currSquareElement = document.createElement("button");
    currSquareElement.setAttribute("id", board[i].id);
    currSquareElement.classList.add("square", board[i].color);

    boardElement.appendChild(currSquareElement);

    placePiece(i);
  }
}

/**
 * Rebuild the HTML elements from the board array data.
 * Also recalculates the squares where the pice can move
 */
function reRenderBoard() {
  currentSelectableSquares = [];
  boardElement.innerHTML = "";
  board.forEach((e) => {
    const currSquareElement = document.createElement("button");
    currSquareElement.setAttribute("id", e.id);
    currSquareElement.classList.add("square", e.color);
    e.selectable = false;
    if (e.child) {
      let [canMoveTo, canCapture] = e.child.pieceView(
        e.child.color,
        Number(e.id)
      );
      e.child.canCapture = canCapture;
      e.child.canMoveTo = canMoveTo;

      const currentPiece = document.createElement("button");
      currentPiece.setAttribute("id", e.child.name);
      currentPiece.setAttribute("class", "piece");
      currentPiece.setAttribute("color", e.child.color);
      currentPiece.style.backgroundImage = `url(${e.child.image})`;

      currSquareElement.appendChild(currentPiece);
    }

    boardElement.appendChild(currSquareElement);
  });
}

const board = [];
buildBoard();

let isPieceSelected = false;
let selectHistory = [];
let currSelectedPieceSquare = null;
let currentSelectableSquares = [];
let currentCapturableSquare = [];

boardElement.addEventListener("click", (event) => {
  const selectionIsPiece = isNaN(Number(event.target.id));
  const selectedSquareId = Number(
    selectionIsPiece ? event.target.parentElement.id : event.target.id
  );

  selectHistory.push(selectedSquareId);

  if (selectHistory.length > 2) selectHistory.shift();

  currentSelectableSquares.forEach((e) => {
    let curr = document.getElementById(e);
    curr.classList.remove("selectable");
  });

  selectionIsPiece ? (isPieceSelected = true) : (isPieceSelected = false);

  isPieceSelected
    ? (currSelectedPieceSquare = board[selectedSquareId])
    : (currSelectedPieceSquare = null);

  if (isPieceSelected) {
    currentSelectableSquares = [...currSelectedPieceSquare.child.canMoveTo];

    currentSelectableSquares.forEach((e) => {
      if (!board[e].child) {
        board[e].selectable = true;
        let curr = document.getElementById(e);
        curr.classList.add("selectable");
      }
    });
  }

  // Move the piece to the target place
  if (selectHistory.length === 2 && board[selectHistory[1]].selectable) {
    let temp = board[selectHistory[0]].child;
    board[selectHistory[0]].child = board[selectHistory[1]].child;
    board[selectHistory[1]].child = temp;
    reRenderBoard();
    selectHistory = [];
  }
});
