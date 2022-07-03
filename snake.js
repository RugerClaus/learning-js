// pulls up header text automatically on page load
$(document).ready(function () {
    $('h1').fadeIn(3000).removeClass('none');
});
//this is the javascript for the snake game.
class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

const body = document.body; //talks to the body element
const canvas = document.querySelector('#canvas'); //talks to the canvas element
const ctx = canvas.getContext('2d');//gets context of canvas to draw on screen
let speed = 4;// base speed variable of snake

const snakeParts = [];
let tailLength = 2;

let tileCount = 20;//number of tiles on screen
let headX = 10;//snake width
let headY = 10;//snake height
let tileSize = tileCount -2;//size of tiles where apple spawns
let xv = 0;// x axis velocity
let yv = 0;//y axis velocity
let ax = 10;//apple position x axis
let ay = 10;//apple position y axis
let score = -1;

function isGameOver(){
    let gameOver = false;
    
    if(yv === 0 && xv === 0){
        return false;
    }

    //walls code
    if(headX < 0){
        gameOver = true;
    }
    if(headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Helvetica";
        ctx.fillText("Game over!", canvas.width / 6.5, canvas.height / 2);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        if(gameover){
            ctx.fillStyle = "white";
            ctx.font = "50px Helvetica";
            ctx.fillText("Game over!", canvas.width / 6.5, canvas.height / 2);
            
        }
    }
}

//draws game loop
function drawGame(){
    //game loop
    changeSnakePosition();

    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
}
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '15px Helvetica';
    ctx.fillText("Score: " + score, canvas.width -65,15);
}
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//function to call snake once game has started
function drawSnake(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);
    ctx.fillStyle = 'green'
    for(let i = 0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x *tileCount,part.y*tileCount,tileSize,tileSize)
    }

    //functionality of snake growth goes here
    snakeParts.push(new SnakePart(headX,headY)); //put a segment at the end of the snake next to the head
    while(snakeParts.length > tailLength){
        snakeParts.shift(); //remove the furthest item from the snake parts if we have more than our tailSize.
    }


}
body.addEventListener('keydown', keyDown);

function keyDown(event){
    switch(event.keyCode) {
        case 37:
            if(xv == 1)
            return;
            yv = 0;
            xv = -1
            break;
        case 38:
            if(yv == 1)
            return;
            yv= -1;
            xv = 0;
            break;
        case 39:
            if(xv == -1)
            return;
            yv = 0;
            xv = 1
            break;
        case 40:
            if(yv == -1)
            return;
            yv = 1;
            xv = 0;  
    }
}
function changeSnakePosition(){
    headX = headX + xv;
    headY = headY + yv;
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(ax*tileCount,ay*tileCount,tileSize,tileSize)
}
function checkAppleCollision(){
    if(ax === headX && ay == headY){
        ax = Math.floor(Math.random()*tileCount);
        ay = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        speed++;
    }
}
drawGame();
