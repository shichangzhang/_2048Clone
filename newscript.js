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
        board[c][r] = { x: 0, y: 0, number: 0, isNew: false};
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
        	var tileX = (c*(tileWidth+tilePadding))+tileOffsetLeft;
        	var tileY = (r*(tileHeight+tilePadding))+tileOffsetTop;
        	ctx.beginPath();
        	ctx.rect(tileX, tileY, tileWidth, tileHeight);
        	ctx.fillStyle = "#CFC1B8";
        	ctx.fill();
        	ctx.closePath();

        	if(board[c][r].number > 1) {
        		//draw tile
        		ctx.beginPath();
        		ctx.rect(tileX, tileY, tileWidth, tileHeight);
        		ctx.fillStyle = colours[Math.log2(board[c][r].number)-1];
        		ctx.fill();
        		ctx.closePath();
        		//draw number
        		ctx.font = "24px Impact, Charcoal, sans-serif";
     			ctx.textAlign = "center";
        		ctx.fillStyle = "white";
        		ctx.fillText(board[c][r].number, tileX+tileWidth/2, tileY+tileHeight/2+9,60);
        	}
        }
    }
}

generateColours();
drawBoard();
spawnRandomTile();
drawBoard();
spawnRandomTile();
drawBoard();

function draw() {
	
	

}

//setInterval(draw, 1000);

function move(x=-1, y=0) {
	if(){
		
	}
}

function spawnRandomTile() {
	var number = 2+2*Math.floor(2*Math.random());
	var count = 0;
	var blanks = new Array();

	for(var i = 0; i < tileColumnCount; i++) {
		for(var j = 0; j < tileRowCount; j++) {
			var tile = board[i][j];
			if(tile.number === 0){
				blanks.splice(0,0,tile);
			}
		}
	}

	if(blanks.length != 0) {
		var rand = Math.floor(blanks.length*Math.random());
		var randTile = blanks[rand%(blanks.length)];
		
		randTile.isNew = false;
		randTile.number = number;
	}
}

function generateColours() {
	for(var i = 0; i < 20; i++) {
		colours[i] = randomColour();
	}
}

function randomColour() {
	return "rgba("+Math.floor(256*Math.random())+", "+Math.floor(256*Math.random())+", "+Math.floor(256*Math.random())+", 1)";
}

};