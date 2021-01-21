
/////////////// renders 

function renderBoard(board) {
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var className = `cell cell${i}-${j}`
            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" 
            oncontextmenu="handleFlag(${i}, ${j}); return false;"> </td>`;
        }
    }
    strHTML += '</tr>';
    document.querySelector('.game-board table').innerHTML = strHTML;
}


function renderCell(i, j, value) {
    var elCell = document.querySelector(`.cell${i}-${j}`);
    elCell.innerHTML = value;
}

function renderBombs() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) renderCell(i, j, MINE);
        }
    }
}

function renderNegs(mat, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var currCell = mat[i][j];
            if (currCell.isMarked) continue;
            currCell.isShown = true;
            document.querySelector(`.cell${i}-${j}`).style = 'background-color: #e4d1d1;'
            renderCell(i, j, currCell.minesAroundCount);
        }
    }
}


/////////////// timer related functions

function startClock() {
    elTimer = document.querySelector('.timer');
    gTimeInterval = setInterval(function () {
        var timeArr = new Date(gGame.secsPassed * 1000).toString().split(':');
        var minutes = timeArr[1];
        var seconds = timeArr[2].split(' ')[0];
        elTimer.innerText = `${minutes}:${seconds}`;
        gGame.secsPassed++;
    }, 1000);
}

function stopClock() {
    clearInterval(gTimeInterval);
    gTimeInterval = null;
}

/////////////// others

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}