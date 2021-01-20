const MINE = '💣';

var gBoard;


var gGame = {
    isOn: false,
    firstClick: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gLevel = {
    size: 4,
    mines: 2,
    lives: 1
}; ///// later change according to user selected level

function init() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.size; j++) {
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

    ///first click of the game- places mines and sets game on
    if (!gGame.isOn && gGame.firstClick) {
        placeMines(gLevel.mines, i, j);
        gGame.isOn = true;
        gGame.firstClick = false;
        setMinesNegsCount();

        ///mine
    } else if (cell.isMine) {
        renderBombs();
        gameOver();
        return;
    }

    /// rest- as long as game is on and cell is not mine
    if (gGame.isOn) {
        ///// cell with mines around
        if (cell.minesAroundCount > 0) elCell.innerText = cell.minesAroundCount;
        ///// cell with no mines around- show neighboars
        else {
            renderNegs(gBoard, i, j);
        }
        /// in any case:
        elCell.style = 'background-color: gray;'
        cell.isShown = true;
        if (isWin()) gameOver('win');
    }
}

function gameOver(status) {
    gGame.isOn = false;
    document.querySelector('.restart').classList.remove('hidden');
    var resultShow = document.querySelector('.game-result');
    if (status === 'win') resultShow.innerText = 'won!'
    else resultShow.innerText = 'lost!'
}

function isWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) continue;
            if (!gBoard[i][j].isShown) return false;
        }
    }
    return true;
}


function restart() {
    document.querySelector('.restart').classList.add('hidden');
    document.querySelector('.game-result').innerText = '';
    gGame.isOn = false;
    gGame.firstClick = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    init();
}