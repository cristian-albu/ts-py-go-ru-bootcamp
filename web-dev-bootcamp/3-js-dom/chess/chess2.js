const pieceImages = {
    w_pawn: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
    b_pawn: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
    w_rook: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
    b_rook: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    w_knight: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
    b_knight: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    w_bishop: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
    b_bishop: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    w_queen: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
    b_queen: "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
    w_king: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
    b_king: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
};

const boardElement = document.getElementById("board");
const infoElement = document.getElementById("infoBox");
function buildBoard() {
    const board = [];
    for (let i = 0, j = 0; i < 64; i++) {
        if (i > 0 && i % 8 === 0) j++;
        const square = {
            position: i,
            row: j,
            col: i % 8,
            child: null,
            color: j % 2 === 0 ? (i % 2 === 0 ? "white" : "black") : i % 2 !== 0 ? "white" : "black",
        };

        const squareElement = document.createElement("button");
        squareElement.setAttribute("id", i);
        squareElement.classList.add("square", square.color);
        squareElement.innerText = i;
        boardElement.appendChild(squareElement);
        board.push(square);
    }

    return board;
}

const board = buildBoard();

function buildPiece(name, position, row, col, color, getMoves) {
    const [viewList, moveList, captureList] = getMoves(row, col, color);
    const piece = {
        name: `${color}_${col}_${name}`,
        position,
        row,
        col,
        color,
        viewList,
        moveList,
        captureList,
        getMoves,
    };

    const pieceElement = document.createElement("button");
    pieceElement.setAttribute("id", piece.name);
    pieceElement.setAttribute("class", "piece");
    pieceElement.style.backgroundImage = `url(${pieceImages[`${color[0]}_${name}`]})`;

    document.getElementById(position).appendChild(pieceElement);
    board[position].child = piece;
}

function pawnView(row, col, color) {
    const moveList = [];
    const captureList = [];

    let isWhite = color === "white";
    let move1 = isWhite ? (row - 1) * 8 + col : (row + 1) * 8 + col;
    let move2 = isWhite ? (row - 2) * 8 + col : (row + 2) * 8 + col;
    let move2Row = isWhite ? 6 : 1;

    // Move list
    if (board[move1].child === null) {
        moveList.push(move1);
        if (row === move2Row && board[move2].child === null) moveList.push(move2);
    }
    // Capture list
    if (board[move1 - 1].child && board[move1 - 1].child.color !== color && col !== 0) captureList.push(move1 - 1);

    if (board[move1 + 1].child && board[move1 + 1].child.color !== color && col !== 7) captureList.push(move1 + 1);

    return [[], moveList, captureList];
}

function initializeBoard() {
    for (let i = 0; i < 64; i++) {
        if (i > 7 && i < 16) buildPiece("pawn", i, board[i].row, board[i].col, "black", pawnView);
        if (i > 47 && i < 56) buildPiece("pawn", i, board[i].row, board[i].col, "white", pawnView);
    }
}
initializeBoard();

const moveMemory = [];

boardElement.addEventListener("click", (event) => {
    // Cleanup
    document.querySelectorAll(".selectable").forEach((e) => e.classList.remove("selectable"));
    document.querySelectorAll(".capturable").forEach((e) => e.classList.remove("capturable"));
    infoElement.innerHTML = "";
    if (moveMemory.length > 1) moveMemory.shift();

    // Data
    const pieceElement = event.target.parentElement.id !== "board" ? event.target : null;
    const squareIndex = pieceElement ? Number(event.target.parentElement.id) : Number(event.target.id);
    const square = board[squareIndex];
    const piece = square.child ?? null;

    moveMemory.push({ piece, squareIndex });

    if (pieceElement && piece) {
        piece.moveList.forEach((e) => {
            document.getElementById(e).classList.add("selectable");
        });

        piece.captureList.forEach((e) => {
            document.getElementById(e).classList.add("capturable");
        });
    }

    // move
    if (moveMemory.length === 2 && moveMemory[0].piece && moveMemory[0].piece.moveList.includes(squareIndex)) {
        board[squareIndex].child = moveMemory[0].piece;

        let movedPieceSquare = board[squareIndex];
        let movedPiece = movedPieceSquare.child;
        const [viewList, moveList, captureList] = movedPiece.getMoves(
            movedPieceSquare.row,
            movedPieceSquare.col,
            movedPiece.color
        );
        movedPiece.viewList = viewList;
        movedPiece.moveList = moveList;
        movedPiece.captureList = captureList;
        let element = document.getElementById(moveMemory[0].piece.name);
        document.getElementById(squareIndex).appendChild(element);
        board[moveMemory[0].squareIndex].child = null;
    }

    // capture
    if (moveMemory.length === 2 && moveMemory[0].piece && moveMemory[0].piece.captureList.includes(squareIndex)) {
        console.log(true);
    }

    // Info
    board.map((e) => {
        let infoData = document.createElement("p");
        infoData.innerText = e.child ? `${e.position}: ${e.child.name}` : `${e.position}: empty`;
        infoElement.appendChild(infoData);
    });
});
