window.onload = function(){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Lock
var lock = false;

//Controls
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;

//Colour of tiles
var colours = new Array();

//Game name
var nameWidth = 120;
var nameHeight = 120;
var nameOffsetTop = 15;
var nameOffsetLeft = 15;

//Score
var score = 0;
var scoreWidth = 155;
var scoreHeight = 120;
var scoreOffsetTop = 15;
var scoreOffsetLeft = 150;

//Board background
var boardWidth = 290;
var boardHeight = 290;
var boardOffsetTop = 175;
var boardOffsetLeft = 15;
var tileRowCount = 4;
var tileColumnCount = 4;
var tileWidth = 60;
var tileHeight = 60;
var tilePadding = 10;
var tileOffsetTop = 185;
var tileOffsetLeft = 25;
var board = [];

for(r=0; r<tileRowCount; r++) {
    board[r] = [];
    for(c=0; c<tileColumnCount; c++) {
        var tileX = (c*(tileWidth+tilePadding))+tileOffsetLeft;
        var tileY = (r*(tileHeight+tilePadding))+tileOffsetTop;
        board[r][c] = { 
        	x: tileX, 
        	y: tileY,
        	row: r,
        	col: c, 
        	number: 0, 
        };				
    }
}

function drawName() {
	ctx.beginPath();
	ctx.rect(nameOffsetLeft, nameOffsetTop, nameWidth, nameHeight);
	ctx.fillStyle = colours[11];
	ctx.fill();
	ctx.closePath();

	ctx.font = "48px Impact, Charcoal, sans-serif";
	ctx.textAlign = "center";
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
    // setup these to match your needs
    ctx.miterLimit = 2;
    ctx.lineJoin = "circle";
    ctx.lineWidth = 3;
    ctx.strokeText(2048, nameWidth/2+nameOffsetLeft, nameHeight/2+nameOffsetTop+18, 120);
    ctx.lineWidth = 1;
    ctx.fillText(2048, nameWidth/2+nameOffsetLeft, nameHeight/2+nameOffsetTop+18, 120);
}

function drawScore() {
	ctx.beginPath();
	ctx.rect(scoreOffsetLeft, scoreOffsetTop, scoreWidth, scoreHeight);
	ctx.fillStyle = "#BBADA0";
	ctx.fill();
	ctx.closePath();

	ctx.font = "30px Impact, Charcoal, sans-serif";
	ctx.textAlign = "center";
	ctx.fillStyle = "#CFC1B8";
    ctx.fillText("SCORE", scoreWidth/2+scoreOffsetLeft, scoreHeight/4+scoreOffsetTop+12.5, 120);
     ctx.fillText(score, scoreWidth/2+scoreOffsetLeft, 3*scoreHeight/4+scoreOffsetTop, 120);
}

function drawBoard() {
	//#BBADA0: background
	//#CFC1B8: blank
	ctx.beginPath();
	ctx.rect(boardOffsetLeft, boardOffsetTop, boardWidth, boardHeight);
	ctx.fillStyle = "#BBADA0";
	ctx.fill();
	ctx.closePath();

    for(r=0; r<tileRowCount; r++) {
        for(c=0; c<tileColumnCount; c++) {
        	var tile = board[r][c];
        	var tileX = (c*(tileWidth+tilePadding))+tileOffsetLeft;
        	var tileY = (r*(tileHeight+tilePadding))+tileOffsetTop;
        	ctx.beginPath();
        	ctx.rect(tileX, tileY, tileWidth, tileHeight);
        	ctx.fillStyle = "#CFC1B8";
        	ctx.fill();
        	ctx.closePath();
        }
    }
}

function drawTiles(){
	for(r=0; r<tileRowCount; r++) {
		for(c=0; c<tileColumnCount; c++) {
			var tile = board[r][c];
			if(tile.number > 1) {
        		//draw tile
        		ctx.beginPath();
        		ctx.rect(tile.x, tile.y, tileWidth, tileHeight);
        		ctx.fillStyle = colours[Math.log2(tile.number)-1];
        		ctx.fill();
        		ctx.closePath();
        		//draw number
        		ctx.font = "24px Impact, Charcoal, sans-serif";
     			ctx.textAlign = "center";
        		ctx.strokeStyle = "black";
        		ctx.fillStyle = "white";
        		// setup these to match your needs
        		ctx.miterLimit = 2;
        		ctx.lineJoin = "circle";
        		ctx.lineWidth = 3;
        		ctx.strokeText(tile.number, tile.x+tileWidth/2, tile.y+tileHeight/2+9,60);
        		ctx.lineWidth = 1;
        		ctx.fillText(tile.number, tile.x+tileWidth/2, tile.y+tileHeight/2+9,60);

        		//code from stackoverflow
        		//context.font = "40px Helvetica";

        	}
        }
    }
}

//Start Game
generateColours();
spawnRandomTile();
spawnRandomTile();

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard();
	drawTiles();
	drawScore();
	drawName();

	if(leftPressed) {
		moveLeft();
	}
	if(upPressed) {
		moveUp();
	}
	if(rightPressed) {
		moveRight();
	}
	if(downPressed) {
		moveDown();
	}
}

setInterval(draw, 10);

function moveUp() {
	if(lock){
		return;
	}
	lock = true;
	for(c = 0; c < tileColumnCount; c++) {
		var count = 0;
		var number = 0;
		for(r = 0; r < tileRowCount; r++) {
			var tile = board[r][c];
			if(tile.number > 0) {
				if(number === 0) {
					number = tile.number;
				} else if(tile.number === number) {
					count--;
					number = 0;
				} else {
					number = tile.number;
				}
				tile.row = count++;
				tile.col = c;
				//console.log("moving from "+r+","+c+" to "+tile.row+","+tile.col);
			}
		}
	}

	moveTiles();
}

function moveDown() {
	if(lock){
		return;
	}
	lock = true;
	for(c = 0; c < tileColumnCount; c++) {
		var count = 0;
		var number = 0;
		for(r = tileRowCount-1; r >= 0; r--) {
			var tile = board[r][c];
			if(tile.number > 0) {
				if(number === 0) {
					number = tile.number;
				} else if(tile.number === number) {
					count--;
					number = 0;
				} else {
					number = tile.number;
				}
				tile.row = 3-count++;
				tile.col = c;
				//console.log("moving from "+r+","+c+" to "+tile.row+","+tile.col);
			}
		}
	}

	moveTiles();
}

function moveLeft() {
	if(lock){
		return;
	}
	lock = true;
	for(r = 0; r < tileRowCount; r++) {
		var count = 0;
		var number = 0;
		for(c = 0; c < tileColumnCount; c++) {
			var tile = board[r][c];
			if(tile.number > 0) {
				if(number === 0) {
					number = tile.number;
				} else if(tile.number === number) {
					count--;
					number = 0;
				} else {
					number = tile.number;
				}
				tile.row = r;
				tile.col = count++;
				//console.log("moving from "+r+","+c+" to "+tile.row+","+tile.col);
			}
		}
	}

	moveTiles();
}

function moveRight() {
	if(lock){
		return;
	}
	lock = true;
	for(r = 0; r < tileRowCount; r++) {
		var count = 0;
		var number = 0;
		for(c = tileColumnCount-1; c >= 0; c--) {
			var tile = board[r][c];
			if(tile.number > 0) {
				if(number === 0) {
					number = tile.number;
				} else if(tile.number === number) {
					count--;
					number = 0;
				} else {
					number = tile.number;
				}
				tile.row = r;
				tile.col = 3-count++;
				//console.log("moving from "+r+","+c+" to "+tile.row+","+tile.col);
			}
		}
	}

	moveTiles();
}

function moveTiles(){

	var t = setInterval(move, 10);
	var finished = false;
	var moved = false;

	function move(){
		if(finished){
			clearInterval(t);
			updatePosition();
			if(moved){
				spawnRandomTile();
			}
			lock = false;
		} else {
			finished = true;
			for(r=0; r<tileRowCount; r++) {
				for(c=0; c<tileColumnCount; c++) {
					var tile = board[r][c];
					if(tile.number > 1) {
    	    			//move tile towards new position
    	    			var speed = 5;
    	    			tileX = (tile.col*(tileWidth+tilePadding))+tileOffsetLeft;
    	    			tileY = (tile.row*(tileHeight+tilePadding))+tileOffsetTop;
    	    			if(tile.x < tileX) {
    	    				tile.x+=speed;
    	    				finished = false;
    	    				moved = true;
    	    			} else if(tile.x > tileX) {
    	    				tile.x-=speed;
    	    				finished = false;
    	    				moved = true;
    	    			} else if(tile.y < tileY) {
    	    				tile.y+=speed;
    	    				finished = false;
    	    				moved = true;
    	    			} else if(tile.y > tileY) {
    	    				tile.y-=speed;
    	    				finished = false;
    	    				moved = true;
    	    			}	
    	    		}
    	    	}
    		}
    	}
	}
}

//Check if tiles are still moving
function isStillMoving(){
	for(r=0; r<tileRowCount; r++) {
		for(c=0; c<tileColumnCount; c++) {
			var t = board[r][c];
			if(t.number > 0 && (t.row != r || t.col != c)){
				return true;				
			}
		}
	}
	return false;
}

function updatePosition(){
	var temp = [];
	for(r=0; r<tileRowCount; r++) {
    	temp[r] = [];
    	for(c=0; c<tileColumnCount; c++) {
        	var tileX = (c*(tileWidth+tilePadding))+tileOffsetLeft;
        	var tileY = (r*(tileHeight+tilePadding))+tileOffsetTop;
        	temp[r][c] = { 
        		x: tileX, 
        		y: tileY,
        		row: r,
        		col: c, 
        		number: 0, 
        	};				
    	}
	}

	for(r = 0; r < tileRowCount; r++) {
		for(c = 0; c < tileColumnCount; c++) {
			var tile = board[r][c];
			if(tile.number > 0){
				if(temp[tile.row][tile.col].number === 0) {
					temp[tile.row][tile.col] = tile;
				} else {
					temp[tile.row][tile.col].number *= 2;
					score += temp[tile.row][tile.col].number;
				}
			}
		}
	}

	for(r = 0; r < tileRowCount; r++) {
		for(c = 0; c < tileColumnCount; c++) {
			board[r][c] = temp[r][c];
		}
	}
}

function spawnRandomTile() {
	var number = 2+2*Math.floor(2*Math.random());
	var count = 0;
	var blanks = new Array();

	for(i = 0; i < tileColumnCount; i++) {
		for(j = 0; j < tileRowCount; j++) {
			var tile = board[i][j];
			if(tile.number === 0) {
				blanks.splice(0,0,tile);
			}
		}
	}

	if(blanks.length != 0) {
		var rand = Math.floor(blanks.length*Math.random());
		var randTile = blanks[rand%(blanks.length)];
		
		randTile.number = number;
	}
}

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == LEFT) {
		leftPressed = true;
	} 
	else if(e.keyCode == UP) {
		upPressed = true;
	}
	else if(e.keyCode == DOWN) {
		downPressed = true;
	}
	else if(e.keyCode == RIGHT) {
		rightPressed = true;	
	}
}

function keyUpHandler(e) {
	if(e.keyCode == LEFT) {
		leftPressed = false;
	} 
	else if(e.keyCode == UP) {
		upPressed = false;
	}
	else if(e.keyCode == DOWN) {
		downPressed = false;
	}
	else if(e.keyCode == RIGHT) {
		rightPressed = false;
	}
}

function generateColours() {
	for(i = 0; i < 20; i++) {
		colours[i] = randomColour();
	}
}

function randomColour() {
	return "rgba("+Math.floor(256*Math.random())+", "+Math.floor(256*Math.random())+", "+Math.floor(256*Math.random())+", 1)";
}

};
