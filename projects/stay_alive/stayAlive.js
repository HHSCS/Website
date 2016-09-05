var canvas = document.getElementById("myCanvas");
// ^ SETS UP THE CANVAS. THE CANVAS IS THE WINDOW WHERE ALL OBJECTS OF THE GAME ARE PLACED

resizeCanvas();
// ^ CALLS THE resizeCanvas() FUNCTION BELOW, WHICH EXECUTES ALL THE CODE INSIDE OF THE FUNCTION

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// ^ THIS FUNCTION SETS THE CANVAS WIDTH AND HEIGHT TO MATCH THE INNER WIDTH AND HEIGHT OF YOUR BROWSER

window.addEventListener("resize", function() {
    resizeCanvas();
});
// ^ THIS GETS TRIGGERED EVERY TIME THE USER RESIZES THE BROWSER WINDOW
// ^ IF YOU RESIZE THE BROWSER WINDOW, THE resizeCanvas() FUNCTION GETS CALLED AGAIN, ALLOWING IT TO MATCH THE CHNAGED WIDTH AND HEIGHT OF THE BROWSER

var ctx = canvas.getContext("2d");
// ^ SETS THE CONTEXT OF THE CANVAS, TELLING IT THAT WE'LL BE DRAWING 2D OBJECT ON IT.

var cursorX;
var cursorY;

var squareSizeX = 10;
var squareSizeY = 10;

var circles = [];
var circleSize = 10;
var numberofCircles = 2;
//^ INITIALIZES VARIABLE THAT WILL BE USED TO DETERMINE CERTAIN THINGS WE'LL BE USING TO MAKE THE GAME WORK

var isGameOver = false;
//^ THIS VARIABLE WILL BE USED TO DETERMINE WHEN THE GAME SHOULD STOP. THE GAME WILL CONTINUE DRAWING AS LONG AS THIS IS FALSE.

function createSquare(x, y) {
    // ^ THE x AND y VALUES GIVEN ABOVE ARE USED BELOW TO TELL WHERE THE SQUARE SHOULD BE DRAWN
    ctx.beginPath();
    ctx.rect(x, y, squareSizeX, squareSizeY);
    //^ THE x AND y VALUES ARE USED THERE TO DRAW THE OBJECT IN THAT SPOT
    ctx.fillStyle = "#FF0000";
    //^ THIS SETS THE COLOR OF THE OBJECT
    ctx.fill();
    //^ TELLS THAT THE OBJECT SHOULD BE FILLED INSIDE, INSTEAD OF ONLY HAVING AN OUTLINE
    ctx.closePath();
    //^ FINISHES THE DRAWING OF THE OBJECT
}
// ^ THIS IS THE BASIC FUNCTION THAT OS CALLED EACH TIME YOU WANT TO CREATE A NEW SQUARE

function createCircle(x, y) {
    // ^ THE x AND y VALUES GIVEN ABOVE ARE USED BELOW TO TELL WHERE THE CIRCLE SHOULD BE DRAWN
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2);
    //^ THE x AND y VALUES ARE USED THERE TO DRAW THE OBJECT IN THAT SPOT
    ctx.fillStyle = "#0095DD";
    //^ THIS SETS THE COLOR OF THE OBJECT
    ctx.fill();
    //^ TELLS THAT THE OBJECT SHOULD BE FILLED INSIDE, INSTEAD OF ONLY HAVING AN OUTLINE
    ctx.closePath();
    //^ FINISHES THE DRAWING OF THE OBJECT
}
// ^ THIS IS THE BASIC FUNCTION THAT OS CALLED EACH TIME YOU WANT TO CREATE A NEW CIRCLE

for (var i = 0; i < numberofCircles; i++) {
    addCircles();
}

function drawingLoop() {
    if (isGameOver == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < circles.length; i++) {
            createCircle(circles[i][0], circles[i][1]);
        }
        createSquare(cursorX - squareSizeX / 2, cursorY - squareSizeY / 2);
        ctx.font = "25px Arial";
        ctx.textAlign = "center";
        ctx.fillText("HOW LONG CAN YOU STAY ALIVE?", canvas.width / 2, 30);
        ctx.fillText(circles.length, canvas.width / 2, 60);
    }
}



canvas.addEventListener('mousemove', function(evt) {

    var mousePos = getMousePos(canvas, evt);
    cursorX = mousePos.x;
    cursorY = mousePos.y;
    // ^ EVERY TIME YOU MOVE YOUR MOUSE, THE cursorX and cursorY VARIABLES GET UPDATED WITH THE NEW MOUSE COORDINATES

    for (var i = 0; i < circles.length; i++) {
        var closenessX = Math.abs(circles[i][0] - mousePos.x);
        var closenessY = Math.abs(circles[i][1] - mousePos.y);
        if (closenessX < circleSize && closenessY < circleSize) {
            console.clear();
            console.log("touched " + closenessX);
            ctx.font = "30px Arial";
            isGameOver = true;
            ctx.fillText("YOU DIED! CLICK TO TRY AGAIN!", canvas.width / 2, canvas.height / 2);
        }
    }
});
// ^ EVERY TIME YOU MOVE YOUR MOUSE INSIDE THE CANVAS, THIS GETS CALLED

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//^ CALLING THIS FUNCTION RETURS BACK X AND Y VALUES FOR THE MOUSE POINTER COORDINATES

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
    circleCoords[0] = circlesX;
    circleCoords[1] = circlesY;
    circles.push(circleCoords);
}

var intervalID = setInterval(addCircles, 100);
