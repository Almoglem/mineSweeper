const MINE = '💣';

var gBoard;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function init() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    gGame.isOn = false;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([]);
        for (var j = 0; j < 4; j++) {
            var cell = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i].push(cell);
        }
    }
    return board;
}


function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) continue;
            var minesCount = countMines(gBoard, i, j);
            gBoard[i][j].minesAroundCount = minesCount;
        }
    }
}

function countMines(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var currCell = mat[i][j];
            if (currCell.isMine) count++;
        }
    }
    return count;
}

function placeMines(num, iExclude, jExclude) {
    var mineCount = 0;
    while (mineCount < num) {
        var i = getRandomInt(0, gBoard.length);
        var j = getRandomInt(0, gBoard[0].length);

        if (gBoard[i][j].isMine) continue;
        if (i === iExclude && j === jExclude) continue;

        gBoard[i][j].isMine = true;
        mineCount++;
    }
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (!gGame.isOn) {
        placeMines(2, i, j);
        gGame.isOn = true;
        setMinesNegsCount();
    } else if (cell.isMine) {
        elCell.innerHTML = MINE;
        return;
        ///show all mines (render whole board)
        /// game over
    }
    if (cell.minesAroundCount > 0) elCell.innerText = cell.minesAroundCount;
}