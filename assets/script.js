var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 460;
    
var x = canvas.width/2;
var y = canvas.height-30;
var r = 10;

var dx = 2;
var dy = -2;

var pw = 90;
var ph = 15;
var px = (canvas.width-pw)/2;

var rp = false;
var lp = false;

var lives = 7;
var score = 0;

var brc = 4;
var bcc = 15;
var bw = 75;
var bh = 20;
var bp = 10;
var bt = 40;
var bl = 20;

var bricks = [];
for(var c=0; c<bcc; c++) {
    bricks[c] = [];
    for(var cc=0; cc<brc; cc++) {
        bricks[c][cc] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rp = true;
    }
    else if(e.keyCode == 37) {
        lp = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rp = false;
    }
    else if(e.keyCode == 37) {
        lp = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        px = relativeX - pw/2;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function collisionDetection() {
    for(var c=0; c<bcc; c++) {
        for(var cc=0; cc<brc; cc++) {
            var b = bricks[c][cc];
            if(b.status == 1) {
                if(x > b.x && x < b.x+bw && y > b.y && y < b.y+bh) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(dx>0){
                        dx+=0.3;
                    }
                    else{
                        dx-=0.3;
                    }
                    if(dy>0){
                        dy+=0.3;
                    }
                    else{
                        dy-=0.3;
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(px, canvas.height-ph, pw, ph);
    ctx.fillStyle = "#A9A9A9";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<bcc; c++) {
        for(var cc=0; cc<brc; cc++) {
            if(bricks[c][cc].status==1)
            {
                var brickX = (c*(bw+bp))+bl;
                var brickY = (cc*(bh+bp))+bt;
                bricks[c][cc].x = brickX;
                bricks[c][cc].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, bw, bh);
                ctx.fillStyle = "#CB4154";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-80, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if(score == bcc*brc) {
        alert("YOU WIN, CONGRATULATIONS! & Your score is: " + score + " Click OK to reload game..!");
        document.location.reload();
    }
    if(x + dx > canvas.width-r || x + dx < r) {
        dx = -dx;
    }
    if(y + dy < r) {
        dy = -dy;
    } 
    else if(y + dy > canvas.height-r) {
        if(x > px && x < px + pw) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER & Your score is: " + score + " Click OK to reload game..!");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                px = (canvas.width-pw)/2;
            }
        }
    }
    if(rp && px <canvas.width-pw) {
        px += 15;
    }
    else if(lp && px>0) {
        px -= 15;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
draw();

// setInterval(draw, 10);
// ask button when new live comes;
// change colour when hits brick;
// show shinchans in the place of lives in canvass;
/*window.onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10, 150, 180);
}*/