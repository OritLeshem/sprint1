'use script'
const MINE = '💣'
var gBoard
var gSize = 4
var TEST = '💣'

console.log("hello utilis")
// countUpNegs(2, 2, gBoard)

function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      if (mat[i][j].isMine === true) neighborsCount++
    }
  }
  gBoard[cellI][cellJ].miesAroundCount = neighborsCount
  // console.log('board' + cellI + cellJ + " = " + gBoard[cellI][cellJ].miesAroundCount)
  // console.log(neighborsCount)
  var elNeg = document.querySelector('h3')
  // elNeg.innerText = `neighbours : ${neighborsCount}`
  return neighborsCount
}

function addRandomBoom() {
  console.log('add boom')
  gBoard[3][3].isMine = true
  gBoard[2][2].isMine = true
  renderBoard(gBoard)

}