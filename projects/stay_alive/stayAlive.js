var canvas = document.getElementById("myCanvas");



canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var cursorX;

var cursorY;

var squareSizeX = 10;

var squareSizeY = 10;

var circles = [];

var circleSize = 10;

var numberofCircles = 2;





function createSquare(x, y) {

  ctx.beginPath();

  ctx.rect(x, y, squareSizeX, squareSizeY);

  ctx.fillStyle = "#FF0000";

  ctx.fill();

  ctx.closePath();

}


function createCircle(x, y) {

  ctx.beginPath();

  ctx.arc(x, y, circleSize, 0, Math.PI * 2);

  ctx.fillStyle = "#0095DD";

  ctx.fill();

  ctx.closePath();

}


function getMousePos(canvas, evt) {

  var rect = canvas.getBoundingClientRect();

  return {

    x: evt.clientX - rect.left,

    y: evt.clientY - rect.top

  };

}

for (var i = 0; i < numberofCircles; i++) {
  addCircles();
}



var isGameOver = false;
var shouldDisplayMouseMove = true;

var noMoveTimer = 4;


function drawingLoop() {
  ctx.font = "25px Arial";
    ctx.textAlign = "center";
  if (isGameOver === false) {

    clearCanvas();
       for (var i = 0; i < circles.length; i++) {

      createCircle(circles[i][0], circles[i][1]);

    }

    createSquare(cursorX, cursorY);



    ctx.fillText("HOW LONG CAN YOU STAY ALIVE?", canvas.width / 2, 30);

    ctx.fillText(circles.length, canvas.width / 2, 60);

    if (shouldDisplayMouseMove === true) {
      ctx.fillText("MOVE YOUR MOUSE! YOU'LL DIE IN " + noMoveTimer, canvas.width / 2, canvas.height / 2);
    }
    }
  
}



function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function displayMoveText() {
  shouldDisplayMouseMove = true;
  if(shouldDisplayMouseMove){
    noMoveTimer = noMoveTimer - 1;
      
  

  if (noMoveTimer === 0) {
    clearCanvas();
    gameOver("YOU WERE IDLE FOR TOO LONG! KEEP MOVING YOUR MOUSE");
  }
  }
 
 
}
setInterval(displayMoveText, 2000);



function gameOver(text) {
 
  isGameOver = true;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}


canvas.addEventListener('mousemove', function(evt) {

 

  shouldDisplayMouseMove = false;
  noMoveTimer = 4;


  var mousePos = getMousePos(canvas, evt);



  cursorX = mousePos.x - squareSizeX / 2;

  cursorY = mousePos.y - squareSizeY / 2;



  for (var i = 0; i < circles.length; i++) {

    var closenessX = Math.abs(circles[i][0] - mousePos.x);

    var closenessY = Math.abs(circles[i][1] - mousePos.y);



    if (closenessX < circleSize && closenessY < circleSize) {

      console.clear();

      console.log("touched " + closenessX);


      gameOver("YOU DIED! CLICK TO TRY AGAIN");

    }

  }


});



canvas.addEventListener("click", function() {

  if (isGameOver) {

    circles = [];

    isGameOver = false;

  }

});







setInterval(drawingLoop, 1);

var intervalAddCircles = 500;



function addCircles() {



  var circlesX;

  var circlesY;

  var circleCoords = [0, 0];



  circlesX = Math.random() * (canvas.width - 10) + 10;

  circlesY = Math.random() * (canvas.height - 10) + 10;

  if(Math.abs(circlesX - cursorX) < 50 && Math.abs(circlesY - cursorY) < 50 ){
   
  } else{
    circleCoords[0] = circlesX;

  circleCoords[1] = circlesY;

  circles.push(circleCoords);
  }
 

}



var intervalID = setInterval(addCircles, 100);





window.addEventListener("resize", function() {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

});