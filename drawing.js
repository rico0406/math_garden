const BACKGROUND_COLOR = "#000000";
const LINE_COLOR = "#FFFFFF";
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;
var canvas;
var context;

function prepareCanvas() {
    
    var isMouseClicked = false;

    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    document.addEventListener('mousedown', function (event) {
        
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetHeight;
        isMouseClicked = true;
    });

    document.addEventListener('mouseup', function (event) {
        isMouseClicked = false;
    });

    
    document.addEventListener('mousemove', function (event) {
        /* if (event.clientX < 0 || event.clientX > canvas.offsetLeft + canvas.clientWidth || event.clienty < 0 || event.clienty > canvas.offsetHeight + canvas.clientHeight){
            console.log(canvas.offsetLeft + canvas.clientWidth);
            isMouseClicked = false;
        } */            
        
        if (isMouseClicked) {
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.clientY - canvas.offsetHeight;

            draw();
        }
    })

    canvas.addEventListener('mouseleave', function(event){
        isMouseClicked = false;
    })   

    // Touch it!!!

    canvas.addEventListener('touchstart', function (event) {
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetHeight;
        isMouseClicked = true;
    });

    canvas.addEventListener('touchend', function (event) {
        isMouseClicked = false;
    });

    
    canvas.addEventListener('touchmove', function (event) {

        if (isMouseClicked) {
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetHeight;

            draw();
        }
        
    });
    
    canvas.addEventListener('touchcancela', function(event){
        isMouseClicked = false;
    })   

};

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = canvas.offsetLeft;
    currentY = canvas.offsetHight;
    previousX = 0;
    previousY = 0;
    context.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
};