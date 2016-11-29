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

for(c=0; c<tileColumnCount; c++) {
    board[c] = [];
    for(r=0; r<tileRowCount; r++) {
        board[c][r] = { 
        	x: 0, 
        	y: 0,
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

    for(c=0; c<tileColumnCount; c++) {
        for(r=0; r<tileRowCount; r++) {
            
            //draw background
        	var tile = board[c][r];
        	var tileX = (r*(tileWidth+tilePadding))+tileOffsetLeft;
        	var tileY = (c*(tileHeight+tilePadding))+tileOffsetTop;
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
        			tileX = (tile.row*(tileWidth+tilePadding))+tileOffsetLeft;
        			tileY = (tile.col*(tileHeight+tilePadding))+tileOffsetTop;
        			if(tile.x < tileX) {
        				tile.x+=speed;
        			} else if(tile.x > tileX) {
        				tile.x-=speed;
        			} else if(tile.y < tileY) {
        				tile.y+=speed;
        			} else if(tile.y > tileY) {
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
console.log(board);
spawnRandomTile();
console.log(board);
moveUp();
console.log(board);

function draw() {
	drawBoard();
}

setInterval(draw, 10);

function moveUp() {
	for(j = 0; j < tileRowCount; j++) {
		var count = 0;
		for(i = 0; i < tileColumnCount; i++) {
			var tile = board[i][j];
			if(tile.number > 0) {
				tile.row = j;
				tile.col = count++;
			}
		}
	}
}

function moveDown() {
	for(j = 0; j < tileRowCount; j++) {
		var count = tileColumnCount-1;
		for(i = tileColumnCount-1; i > 0; i--) {
			var tile = board[i][j];
			if(tile.number > 0) {
				tile.row = j;
				tile.col = count--;
			}
		}
	}
}

function updatePosition(){
	var temp = [];
	for(c=0; c<tileColumnCount; c++) {
		temp[c] = [];
		for(r=0; r<tileRowCount; r++) {
			temp[c][r] = { 
				x: 0, 
				y: 0,
				row: 0,
				col: 0, 
				number: 0, 
				isNew: false 
			};
		}
	}

	for(i = 0; i < tileColumnCount; i++) {
		for(j = 0; j < tileRowCount; j++) {
			var tile = board[i][j];
			if(temp[tile.col][tile.row].number === 0) {
				temp[tile.col][tile.row] = tile;
			} else {
				temp[tile.col][tile.row].number *= 2;
				temp[tile.col][tile.row].isNew = true;
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