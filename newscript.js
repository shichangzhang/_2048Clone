window.onload = function(){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Colour of tiles
var colours = new Array();

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
        	isNew: true 
        };
    }
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
            
            //draw background
        	var tile = board[r][c];
        	var tileX = (c*(tileWidth+tilePadding))+tileOffsetLeft;
        	var tileY = (r*(tileHeight+tilePadding))+tileOffsetTop;
        	ctx.beginPath();
        	ctx.rect(tileX, tileY, tileWidth, tileHeight);
        	ctx.fillStyle = "#CFC1B8";
        	ctx.fill();
        	ctx.closePath();

        	if(tile.number > 1) {
        		if(tile.isNew) {
        		    //set tile position
        		    tile.x = tileX;
        		    tile.y = tileY;
        		    tile.isNew = false;
        		} else {
        			//move tile towards new position
        			var speed = 5;
        			tileX = (tile.col*(tileWidth+tilePadding))+tileOffsetLeft;
        			tileY = (tile.row*(tileHeight+tilePadding))+tileOffsetTop;
        			if(tile.x < tileX) {
        				tile.x+=speed;
        			} else if(tile.x > tileX) {
        				tile.x-=speed;
        			} else if(tile.y < tileY) {
				console.log("tile is at "+tile.y+","+tile.x);
				console.log("tile number is "+tile.number);
        				tile.y+=speed;
        			} else if(tile.y > tileY) {
				console.log("tile is at "+tile.y+","+tile.x);
				console.log("tile number is "+tile.number);
        				tile.y-=speed;
        			}
				
        		}
        		//draw tile
        		ctx.beginPath();
        		ctx.rect(tile.x, tile.y, tileWidth, tileHeight);
        		ctx.fillStyle = colours[Math.log2(tile.number)-1];
        		ctx.fill();
        		ctx.closePath();
        		//draw number
        		ctx.font = "24px Impact, Charcoal, sans-serif";
     			ctx.textAlign = "center";
        		ctx.fillStyle = "white";
        		ctx.fillText(tile.number, tile.x+tileWidth/2, tile.y+tileHeight/2+9,60);
        	}
        }
    }
}

generateColours();
spawnRandomTile();
spawnRandomTile();
moveDown();

function draw() {
	drawBoard();
}

setInterval(draw, 10);

function moveUp() {
	for(c = 0; c < tileColumnCount; c++) {
		var count = 0;
		for(r = 0; r < tileRowCount; r++) {
			var tile = board[r][c];
			if(tile.number > 0) {
				tile.row = count++;
				tile.col = c;
				console.log("moving from "+r+","+c+" to "+tile.row+","+tile.col);
			}
		}
	}
}

function moveDown() {
	for(c = 0; c < tileColumnCount; c++) {
		var count = tileRowCount-1;
		for(r = tileRowCount-1; r >= 0; r--) {
			var tile = board[r][c];
			if(tile.number > 0) {
				tile.row = count--;
				tile.col = c;
				console.log("moving from "+r+","+c+" to "+tile.row+","+tile.col);
			}
		}
	}
}

//Check if tiles are still moving
function isStillMoving(){
	for(r=0; r<tileRowCount; r++) {
		for(c=0; c<tileColumnCount; c++) {
			var t = board[r][c];
			if(board.number>0 && board){
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
			temp[r][c] = { 
				x: 0, 
				y: 0,
				row: r,
				col: c, 
				number: 0, 
				isNew: true 
			};
		}
	}

	for(r = 0; r < tileRowCount; r++) {
		for(c = 0; c < tileColumnCount; c++) {
			var tile = board[r][c];
			var newTile = temp[tile.row][tile.col];
			if(newTile.number === 0) {
				newTile = tile;
			} else {
				newTile.number *= 2;
				newTile.isNew = true;
			}
		}
	}
	board = temp;
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
		
		randTile.isNew = true;
		randTile.number = number;
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
