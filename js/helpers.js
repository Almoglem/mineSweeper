
'use strict'

/// sneak peek

var gSneakPeekOn = false;

function sneakPeekOn() {
    if (gLevel.hints === 0) return;
    if (!gGame.isOn) return;
    gSneakPeekOn = true;
    gLevel.hints--;

    var elLightBulbs = document.querySelector('.sneak-peek');
    if (gLevel.size === 4) {
        elLightBulbs.innerText = '✖️';
        return;
    }

    if (gLevel.hints === 2) elLightBulbs.innerText = '💡💡✖️'
    else if (gLevel.hints === 1) elLightBulbs.innerText = '💡✖️✖️'
    else elLightBulbs.innerText = '✖️✖️✖️'
}

function showSneakPeek(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            var currCell = gBoard[i][j];
            if (currCell.isShown || currCell.isMarked) continue;

            if (currCell.isMine) renderCell(i, j, MINE);
            else if (currCell.minesAroundCount) renderCell(i, j, currCell.minesAroundCount);
            else renderCell(i, j, ' ');
            var elCell = document.querySelector(`.cell${i}-${j}`);
            elCell.classList.add('peeked');

            setTimeout(renderCell, 1000, i, j, ' ');
            setTimeout(removeClass, 1000, i, j, 'peeked');

        }
    }
    gSneakPeekOn = false;
}





//// SAFE CLICK
/// make a loop to find cells who are not mines and are not shown (if (cell.isMine || cell.isShown) continue; )
/// push the i and j into an object {i: i, j: j} in an array safeCells
/// safeCells = [] ||| loop part ||| safeCells.push({i: i, j: j});
/// randomly pick an object from the array using getRandomInt: 
/// var safeCellIdx = safeCells[getRandomInt(0, safeCells.length)]
/// we will receive an object {i: i, j: j}
/// manipulate DOM of gBoard[safeCell.i][safeCell.j] to appear in certain color
///then return to normal color after few seconds using a timeout function


