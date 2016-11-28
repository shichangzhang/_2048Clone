window.onload = function(){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

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
var boardBackground = [];
for(c=0; c<tileColumnCount; c++) {
    boardBackground[c] = [];
    for(r=0; r<tileRowCount; r++) {
        boardBackground[c][r] = { x: 0, y: 0, number: 0, isNew: false};
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

drawBoard();

function draw() {

}

//setInterval(draw, 10);

function spawnRandomTile(){
	var number = 2+2*Math.floor(2*Math.random());
	var rand = Math.floor(16*Math.random());
	var count = 0;
	var blanks = new Array();
	for(var i = 0; i < dim; i++){
		for(var j = 0; j < dim; j++){
			var tile = gameBoard[i][j];
			if(tile.isBlank){
				blanks.splice(0,0,tile);
			}
		}
	}

	if(blanks.length != 0){
		var randTile = blanks[rand%(blanks.length)];
		
		randTile.isNew = true;
		randTile.number = number;
		randTile.html.innerHTML = number;
		randTile.html.className += " t"+number;
	}
}

};