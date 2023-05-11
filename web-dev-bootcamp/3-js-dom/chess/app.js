const boardElement = document.querySelector("#board");

const wPieces = {
  white_rookQ: "a1",
  white_knightQ: "b1",
  white_bishopQ: "c1",
  white_queen: "d1",
  white_king: "e1",
  white_bishopK: "f1",
  white_knightK: "g1",
  white_rookK: "h1",
  white_aPawn: "a2",
  white_bPawn: "b2",
  white_cPawn: "c2",
  white_dPawn: "d2",
  white_ePawn: "e2",
  white_fPawn: "f2",
  white_gPawn: "g2",
  white_hPawn: "h2",
};

const bPieces = {
  black_rookQ: "a8",
  black_knightQ: "b8",
  black_bishopQ: "c8",
  black_king: "d8",
  black_queen: "e8",
  black_bishopK: "f8",
  black_knightK: "g8",
  black_rookK: "h8",
  black_aPawn: "a7",
  black_bPawn: "b7",
  black_cPawn: "c7",
  black_dPawn: "d7",
  black_ePawn: "e7",
  black_fPawn: "f7",
  black_gPawn: "g7",
  black_hPawn: "h7",
};

const allPieces = [...Object.entries(wPieces), ...Object.entries(bPieces)];

function buildBoard() {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const board = [];

  for (let i = 8; i > 0; i--) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const piece = allPieces.filter(
        (e) => e[1] === `${letters[j]}${i}`
      )[0] || [""];

      if (piece[0].includes("black")) {
        piece.push("blackPiece");
      } else {
        piece.push("whitePiece");
      }

      if (piece[0].includes("king")) piece.push("king");
      if (piece[0].includes("queen")) piece.push("queen");
      if (piece[0].includes("rook")) piece.push("rook");
      if (piece[0].includes("knight")) piece.push("knight");
      if (piece[0].includes("bishop")) piece.push("bishop");
      if (piece[0].includes("Pawn")) piece.push("pawn");

      const square = {
        name: `${letters[j]}${i}`,
        color:
          j % 2 === 0
            ? i % 2 === 0
              ? "white"
              : "black"
            : i % 2 === 0
            ? "black"
            : "white",
        piece: piece,
      };
      row.push(square);
    }
    board.push(row);
  }

  return board;
}

const board = buildBoard();

function displayBoard(board) {
  for (row of board) {
    for (square of row) {
      let squareElement = document.createElement("button");
      squareElement.setAttribute("id", square.name);
      squareElement.setAttribute("class", `square ${square.color}`);
      squareElement.tabIndex = -1;

      if (square.piece[0]) {
        let pieceElement = document.createElement("button");
        pieceElement.setAttribute("id", square.piece[0]);
        pieceElement.setAttribute(
          "class",
          `${square.piece[2]} ${square.piece[3]}`
        );

        squareElement.appendChild(pieceElement);
      }

      boardElement.appendChild(squareElement);
    }
  }
}

displayBoard(board);

function handleSelectionSquares(current, squares) {
  if (current) {
    squares.forEach((e) => {
      if (
        e.children[0] === undefined ||
        document.querySelector(".current").classList[0] !==
          e.children[0].classList[0]
      ) {
        e.classList.add("selectable");
        e.tabIndex = 0;
      }
    });
  }
}

const boardEdgeIndexesLeft = [0, 8, 16, 24, 32, 40, 48, 56, 64];
const boardEdgeIndexesRight = boardEdgeIndexesLeft.slice(1).map((e) => e - 1);

function handleWPawn(pawnSquare, pieceIndex, squares) {
  let allowedSq = [squares[pieceIndex - 8]];

  if (!boardEdgeIndexesLeft.includes(pieceIndex)) {
    allowedSq.push(squares[pieceIndex - 9]);
  }

  if (!boardEdgeIndexesRight.includes(pieceIndex))
    allowedSq.push(squares[pieceIndex - 7]);

  if (pieceIndex >= 48) {
    allowedSq.push(squares[pieceIndex - 16]);
  }

  handleSelectionSquares(pawnSquare, allowedSq);
}

function handleBPawn(pawnSquare, pieceIndex, squares) {
  let allowedSq = [squares[pieceIndex + 8]];

  if (!boardEdgeIndexesLeft.includes(pieceIndex)) {
    allowedSq.push(squares[pieceIndex + 7]);
  }

  if (!boardEdgeIndexesRight.includes(pieceIndex))
    allowedSq.push(squares[pieceIndex + 9]);

  if (pieceIndex <= 16) {
    allowedSq.push(squares[pieceIndex + 16]);
  }

  handleSelectionSquares(pawnSquare, allowedSq);
}

function handleWBishop(pawnSquare, pieceIndex, squares) {
  let allowedSq = [];

  let maxLeftSteps = pieceIndex % 8;
  let maxRightSteps = 8 - maxLeftSteps - 1;
  console.log(
    `Max steps left: ${maxLeftSteps}, max steps right: ${maxRightSteps}`
  );

  console.log(`Current ${pieceIndex}`);
  for (
    let i = pieceIndex - 7, j = pieceIndex + 9, steps = 0;
    steps < maxRightSteps;
    steps++
  ) {
    if (i >= 0 && i <= 64) allowedSq.push(squares[i]);
    if (j >= 0 && j <= 64) allowedSq.push(squares[j]);

    i -= 7;
    j += 9;
  }

  for (
    let i = pieceIndex + 7, j = pieceIndex - 9, steps = 0;
    steps < maxLeftSteps;
    steps++
  ) {
    if (i >= 0 && i <= 64) allowedSq.push(squares[i]);
    if (j >= 0 && j <= 64) allowedSq.push(squares[j]);
    console.log(`i: ${i} j: ${j}`);

    i += 7;
    j -= 9;
  }

  handleSelectionSquares(pawnSquare, allowedSq);
}

function handlePiece(pieceSquare) {
  let squares = document.querySelectorAll(".square");

  let pieceIndex = -1;

  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("selectable");
    squares[i].tabIndex = -1;
    if (pieceSquare && squares[i].id === pieceSquare.parentElement.id) {
      pieceIndex = i;
    }
  }

  if (pieceSquare && pieceIndex >= 0) {
    switch (pieceSquare.getAttribute("class")) {
      case "whitePiece pawn current":
        handleWPawn(pieceSquare, pieceIndex, squares);
        break;
      case "blackPiece pawn current":
        handleBPawn(pieceSquare, pieceIndex, squares);
        break;
      case "whitePiece bishop current":
        handleWBishop(pieceSquare, pieceIndex, squares);
        break;
      case "blackPiece bishop current":
        handleWBishop(pieceSquare, pieceIndex, squares);
        break;
    }
  }
}

let currentSelection = null;
let targetSquare = null;
boardElement.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("selectable") &&
    currentSelection !== targetSquare
  ) {
    targetSquare = event.target;
  } else {
    targetSquare = null;
  }

  if (event.target === currentSelection) {
    currentSelection = null;
    event.target.classList.remove("current");
  } else if (!event.target.classList.contains("square")) {
    document
      .querySelectorAll(".current")
      .forEach((e) => e.classList.remove("current"));
    currentSelection = event.target;
    event.target.classList.add("current");
  } else {
    currentSelection = null;
    event.target.classList.remove("current");
  }

  handlePiece(currentSelection);

  if (targetSquare) {
    targetSquare.appendChild(document.querySelector(".current"));
  }
});
