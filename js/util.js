
function renderBoard(board) {
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var className = `cell cell${i - j}`
            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})"> </td>`;
        }
        strHTML += '</tr>';
    }
    document.querySelector('.game-board table').innerHTML = strHTML;
}

function renderCell(i, j, value) {
    var elCell = document.querySelector(`.cell${i}-${j}`);
    elCell.innerHTML = value;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
