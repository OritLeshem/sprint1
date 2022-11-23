'use strict'
console.log("hello main")
var steps = 0

// Model:


function onInitGame() {
  gBoard = buildBoard()
  renderBoard(gBoard)

  countNeighbors(2, 3, gBoard)

}
function addNegInEachCell() {
  console.log("hello addnegineachcell")
  for (var i = 0; i < gSize; i++) {
    for (var j = 0; j < gSize; j++) {
      gBoard[i][j].miesAroundCount = countNeighbors(i, j, gBoard)
    }
  }
}
function buildBoard() {
  const board = []
  for (var i = 0; i < gSize; i++) {
    board[i] = []
    for (var j = 0; j < gSize; j++) {
      board[i][j] = { miesAroundCount: 0, isShown: false, isMine: false, isMarked: true }
    }
  }
  // board[3][3].isShown = true
  // board[2][2].isShown = true
  console.log(board)
  return board
}


function renderBoard(board) {
  const elBoard = document.querySelector('.board')
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]
      var cellClass = getClassName({ i: i, j: j })
      if (currCell.isShown === false) cellClass += ' unshown'
      strHTML += `\t<td class="cell ${cellClass}"  onclick="handleClick(this,${i},${j})" >\n`
      if (currCell.isShown === false) cellClass += 'unshown'
      else {
        if (currCell.isMine === true) strHTML += MINE
        if (currCell.miesAroundCount > 0) strHTML += currCell.miesAroundCount

      }

      strHTML += '\t</td>\n'
    }
    strHTML += '</tr>\n'
  }
  elBoard.innerHTML = strHTML
}

// Move the player to a specific location

var elSteps = document.querySelector('h2')

function handleClick(elCell, i, j) {
  if (steps === 0) {
    steps++
    gBoard[i][j].isShown = true
    elSteps.innerText = steps
    console.log("btn ", i, j, "was clicked for the first time")
    addRandomBoom(gBoard)
    addNegInEachCell()
    renderBoard(gBoard)

  }

  else {
    console.log(gBoard)
    steps++
    elSteps.innerText = steps
    gBoard[i][j].isShown = true

    console.log(gBoard)
    if (gBoard[i][j].miesAroundCount === 0) {
      revealNeg(i, j, gBoard)
      console.log("without neg")
    }
    renderBoard(gBoard)
  }
}


function revealNeg(cellI, cellJ, mat) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      console.log(mat[i][j], i, j)
      mat[i][j].isShown = true
    }
  }
  gBoard[cellI][cellJ].miesAroundCount = neighborsCount

  var elNeg = document.querySelector('h3')
  // elNeg.innerText = `neighbours : ${neighborsCount}`
  return neighborsCount
}


function checkGameOver() {
  var elGameOver = document.querySelector('h3')
  elGameOver.innerText = "GAME OVER"

}








// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

