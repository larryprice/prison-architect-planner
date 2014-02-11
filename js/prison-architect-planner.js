var squareWidth = 32;
var squareHeight = 32;
var prisonWidth = 512;
var prisonHeight = 512;

var prisonCanvas;
var prisonContext;

function Square(row, column) {
  this.row = row;
  this.column = column;
}

window.onload = function() {
  prisonCanvas = document.getElementById("prison");
  prisonCanvas.width = prisonWidth + 1;
  prisonCanvas.height = prisonHeight + 1;
  prisonCanvas.addEventListener("mousedown", prisonMouseDown, false);
  prisonContext = prisonCanvas.getContext("2d");

  drawLines();
}

function drawLines() {
  drawVerticalLines();
  drawHorizontalLines();
  prisonContext.strokeStyle = "#ccc";
  prisonContext.stroke();
}

function drawVerticalLines() {
  for (var x = 0; x <= prisonWidth; x += squareWidth) {
    prisonContext.moveTo(0.5 + x, 0);
    prisonContext.lineTo(0.5 + x, prisonHeight);
  }
}

function drawHorizontalLines() {
  for (var y = 0; y <= prisonHeight; y += squareHeight) {
    prisonContext.moveTo(0, 0.5 + y);
    prisonContext.lineTo(prisonWidth, 0.5 + y);
  }
}

function paintSquare(e) {
  var square = getSquare(e);

  prisonContext.beginPath();
  prisonContext.fillStyle = "#000";
  prisonContext.fillRect(getX(square), getY(square), squareWidth, squareHeight);
}

function prisonMouseDown(e) {
  prisonCanvas.addEventListener("mousemove", prisonMouseMove, false);
  prisonCanvas.addEventListener("mouseup", prisonMouseUp, false);

  paintSquare(e);
}

function prisonMouseUp(e) {
  prisonCanvas.removeEventListener("mousemove", prisonMouseMove);
  prisonCanvas.removeEventListener("mouseup", prisonMouseUp);
}

function prisonMouseMove(e) {
  paintSquare(e);
}

function getY(square) {
  return square.row * squareWidth;
}

function getX(square) {
  return square.column * squareHeight;
}

function getSquare(e) {
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  x -= prisonCanvas.offsetLeft;
  y -= prisonCanvas.offsetTop;
  x = Math.min(x, prisonWidth);
  y = Math.min(y, prisonHeight);
  return new Square(Math.floor(y/squareHeight), Math.floor(x/squareWidth));
}
