/* This will not be used anymore. I'm going to start 
to use canvas. */
var gameBoard = new Array();
var dim = 4;

window.onload = function(){
	for(var i = 0; i < dim; i++){
		gameBoard[i] = new Array();
		for(var j = 0; j < dim; j++){
			gameBoard[i][j] = new Tile();
			gameBoard[i][j].html = document.getElementById((i*4+j));
		}
	}	
	init();
	spawnRandomTile(gameBoard);
	spawnRandomTile(gameBoard);
};

function setIntervalX(func, delay, reps){
	var x = 0;
	var t = window.setInterval(function(){
		
		func();

		if(++x === reps){
			window.clearInterval(t);
		}
	}, delay);
}

function Tile(){
	this.isBlank = true;
	this.isNew = false;
	this.number = 0;
	this.html = null;
}

function move(tile){
	var posLeft = tile.style.left;
	var posTop = tile.style.top;
	var change = 0;
	var t;

	if(pos >= 150){
		dir = -1;
	} else if(pos == 0){
		dir = 1;
	}
	pos += dir;
	box.style.left = posLeft+'px';
	box.style.top = posTop+'px';
}

function slideUp(){
	for(var i = 1; i < dim; i++){
		for(var j = 0; j < dim; j++){
			var tile = gameBoard[i][j];
			var topTile = gameBoard[i-1][j];
			if(!tile.isBlank && topTile.isBlank){
				posTop = parseInt(tile.html.style.top,10) - 1;
				tile.html.style.top = posTop+'px';
			}
		}
	}
}

function moveUp(){

	setIntervalX(slideUp, 0, 120);

	spawnRandomTile(gameBoard);
	console.log("UP");
}

function moveDown(){
	spawnRandomTile(gameBoard);
	console.log("DOWN");
}

function moveLeft(){
	spawnRandomTile(gameBoard);
	console.log("LEFT");
}

function moveRight(){
	spawnRandomTile(gameBoard);
	console.log("RIGHT");
}

function clearBoard(){
	var posLeft = 20;
	var posTop = 20;
	for(var x = 0; x < dim; x++){
		for(var y = 0; y < dim; y++){
			var t = gameBoard[x][y].html;
			t.className = "tile blank";
			t.style.left = posLeft+'px';
			t.style.top = posTop+'px';
			posLeft += 120;
		}
		posTop += 120;
		posLeft = 20;
	}
}

function init(){
	var posLeft = 20;
	var posTop = 20;
	var controls = document.getElementById("controls").children;
	var up = controls[0];
	var left = controls[1];
	var down = controls[2];
	var right = controls[3];

	clearBoard();

	posLeft = 200;
	posTop = 30;

	up.style.left = posLeft+'px';
	up.style.top = posTop+'px';

	posLeft = 90;
	posTop = 105;

	left.style.left = posLeft+'px';
	left.style.top = posTop+'px';

	posLeft = 200;

	down.style.left = posLeft+'px';
	down.style.top = posTop+'px';

	posLeft = 310;

	right.style.left = posLeft+'px';
	right.style.top = posTop+'px';
}

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
		
		randTile.isBlank = false;
		randTile.number = number;
		randTile.html.innerHTML = number;
		randTile.html.className += " t"+number;
	}
}