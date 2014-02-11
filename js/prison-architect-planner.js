var squareWidth = 32;
var squareHeight = 32;

var prisonCanvas;
var prisonContext;

window.onload = function() {
  prisonCanvas = document.getElementById("prison");
  prisonCanvas.width = 513;
  prisonCanvas.height = 513;
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
  for (var x = 0; x <= prisonCanvas.width; x += squareWidth) {
    prisonContext.moveTo(0.5 + x, 0);
    prisonContext.lineTo(0.5 + x, prisonCanvas.height);
  }
}

function drawHorizontalLines() {
  for (var y = 0; y <= prisonCanvas.height; y += squareHeight) {
    prisonContext.moveTo(0, 0.5 + y);
    prisonContext.lineTo(prisonCanvas.width, 0.5 + y);
  }
}
