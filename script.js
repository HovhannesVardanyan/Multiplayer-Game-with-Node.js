const energs=[];
const obstacles=[];
const resus=[];
const grass= [];
const clouds = [null, [],[],[],[]];
let stage1;
let stage2;
let stage3;
let queue;
let red;
let blue;
let green;
let yellow;
let canPlay = true;
const fogs = [];
const players = [];
const socketPlayers = [];
const englishToIndexMap = {
	"first" : "1",
	"second" : "2",
	"third" : "3",
	"fourth" : "4"
};
const indexToColorMap = {
	"1" : "red",
	"2" : "green",
	"3" : "yellow",
	"4" : "blue"
};
const images = {'blue' : {}, 'red' : {}, 'yellow' : {}, 'green' : {}};
const directions = ['left', 'right', 'up','down'];
$(function() {
	const constructImages = function(){
		for(let i = 1; i <= 4; i++){

		}
	};




	stage1=new createjs.Stage("background");
	stage2=new createjs.Stage("arena");
	stage3 = new createjs.Stage("fog");
	queue=new createjs.LoadQueue(true);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest(
		[	{id:"grass",src:"/gui/terrain/grass.png"},{id:"red",src:"/gui/camp/red.png"}, {id:"blue",src:"/gui/camp/blue.png"},
			{id:"yellow",src:"/gui/camp/yellow.png"},{id:"green",src:"/gui/camp/green.png"},{id:"blu",src:"/gui/truck/blue.png"},
			{id:"gre",src:"/gui/truck/green.png"},{id:"re",src:"/gui/truck/red.png"},{id:"yell",src:"/gui/truck/yellow.png"},
			{id:"stone",src:"/gui/obstacle/default.png"},{id:"res",src:"/gui/resource/gold.png"},{id:"energy",src:"/gui/resource/power.png"},
			{id:"fog",src:"/gui/fog.png"},
			]
	);
	function handleComplete() {
		const socket = io.connect();
		window["socket"] = socket;
		socket.on("disconnect", function() {
			if(canPlay)
				window.location.reload();
		});
		socket.on("basa", function(data) {
			   window["side"] = data["side"];
			   basa = new Base(window["side"], data["x"], data["y"],data["hert"]);
			   stage2.addChild(basa.playerImage);
			   stage2.update();
		});
		const handleFog = function(index,data){
			for(let i=0;i<data.length;i++) {
				fogs[index] = new Fog( data[i]["x"], data[i]["y"],data[i]["hat"]);
				clouds[index].push(fogs[index]);
				stage3.addChild(fogs[index].fogImage);
				stage3.update();
			}
		};
		socket.on("fog1", function(data) {
			handleFog(1,data);
		});
		socket.on("fog2", function(data) {
			handleFog(2,data);
		});
		socket.on("fog3", function(data) {
			handleFog(3,data);
		});
		socket.on("fog4", function(data) {
			handleFog(4,data);
		});
		socket.on("enter", function(data) {
			for(let i=0;i<data.length;i++) {
				let sto = new Sto( data[i]["x"], data[i]["y"],data["hert"]);
				obstacles.push(sto);
				stage2.addChild(sto.stoImage);
				stage2.update();
			}
		});
		socket.on("enterThe", function(data) {
			for(let h=0;h<data.length;h++) {
				let res = new Res( data[h]["x"], data[h]["y"],data[h]["hert"]);
				resus.push(res);
				stage2.addChild(res.resImage);
				stage2.update();
			}
		});
		socket.on("ente", function(data) {
			for(let h=0;h<data.length;h++) {
				let pow = new Power( data[h]["x"], data[h]["y"],data[h]["hert"]);
				energs.push(pow);
				stage2.addChild(pow.powImage);
				stage2.update();
			}
		});
		const createPlayer = function(index,data){
			window["side"] = data["side"];
			players[index] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
			$("body").append(players[index].energy);
			$("body").append(players[index].hashiv);
			stage2.addChild(players[index].playerImage);
			socket.emit("newPlayerCreated", {"id":players[index].id, "x":players[index].x, "y":players[index].y,
				"side":players[index].screenSide, "player":players[index].who,"value":players[index].value});
			stage2.update();
		}
		socket.on("1", function(data) {
			createPlayer(1,data);
		});
		socket.on("2", function(data) {
			createPlayer(2,data);
		});
		socket.on("3", function(data) {
			createPlayer(3,data);
		});
		socket.on("4", function(data) {
			createPlayer(4,data);
		});
		socket.on("firstPosition", function(data) {
			socketPlayers[1] = new Player(data["id"], data["side"], data["player"], data["x"], data["y"]);
			stage2.addChild(socketPlayers[1].playerImage);
			stage2.update();
		});
		socket.on("newPlayer", function(data) {
			window["side"] = data["side"];
			socketPlayers[2] = new Player(data["id"], window["side"], data["player"], data["x"], data["y"],data["width"]);
			stage2.addChild(socketPlayers[2].playerImage);
			stage2.update();
		});
		socket.on("soc", function(data) {
			window["side"] = data["side"];
			socketPlayers[3] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],data["width"]);
			stage2.addChild(socketPlayers[3].playerImage);
			stage2.update();
		});
		socket.on("joke", function(data) {
			window["side"] = data["side"];
			socketPlayers[4] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],data["width"]);
			stage2.addChild(socketPlayers[4].playerImage);
			stage2.update();
		});
		socket.on('No place to play',function(data){
			canPlay = false;
			socket.disconnect();
			alert("No place to play");
		});

		socket.on("Game Started",function(data){
			alert("Game Started");
			window.addEventListener("keydown",movement);
			window.addEventListener("keyup", chMovement);
		});


		socket.on("someOneMove", function(data) {
			const player = players[englishToIndexMap[data["player"]]];
			const socketPlayer = socketPlayers[englishToIndexMap[data["player"]]];
			if(player!==undefined) {
				player.value=data["value"];
				$("#energy").val(player.value);
				stage2.removeChild(player.playerImage);
				player.playerImage = new createjs.Bitmap('gui/' + indexToColorMap[englishToIndexMap[data['player']]] + '/' + data['direction'] + '.png');
				stage2.addChild(player.playerImage);
				player.playerImage.y = data["y"];
				player.playerImage.x = data["x"];
				stage2.update();
			}
			else {
				stage2.removeChild(socketPlayer.playerImage);
				socketPlayer.playerImage = new createjs.Bitmap('gui/' + indexToColorMap[englishToIndexMap[data['player']]] + '/' + data['direction'] + '.png');
				stage2.addChild(socketPlayer.playerImage);
				socketPlayer.playerImage.x = data["x"];
				socketPlayer.playerImage.y = data["y"];
				stage2.update();
			}
		});
		function movement(evt) {
			let player = null;
			if(players[1] !== undefined)
				player = players[1];
			else if(players[2] !== undefined)
				player = players[2];
			else if(players[3] !== undefined)
				player = players[3];
			else if(player !== undefined)
				player = players[4];
			else
				throw new Error("Something went wrong!");
			if(player!==undefined) {
					if(evt.keyCode===40) {
						socket.emit("move", {"player":player.who, "y" : player.y,  "x" : player.x,"dir" : "down","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"radx":player.x+32,"rady":player.y+32,"kicking":false,"value":player.value});
						lastDir="down";
					}
					else if(evt.keyCode===38) {
						socket.emit("move", {"player":player.who, "y" : player.y, "x" : player.x, "dir" : "up","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"radx":player.x+32,"rady":player.y+32,"kicking":false,"value":player.value});
						lastDir="up";
					}
					else if(evt.keyCode===37) {
						socket.emit("move", {"player":player.who, "x" : player.x,"y" : player.y, "dir" : "left","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"radx":player.x+32,"rady":player.y+32,"kicking":false,"value":player.value});
						lastDir="left";
					}
					else if(evt.keyCode===39) {
						socket.emit("move", {"player":player.who, "x" : player.x,"y" : player.y, "dir" : "right","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"kicking":false,"value":player.value});
						lastDir="right"
					}
					else if(evt.keyCode===75)
						socket.emit("move", {"player":player.who, "x" : player.x, "y" : player.y, "dir" : lastDir,"width":16,"height":16,"c":"800","kicking":true});
				}
			}
		function chMovement(evt) {
			let player = null;
			if(players[1] !== undefined)
				player = players[1];
			else if(players[2] !== undefined)
				player = players[2];
			else if(players[3] !== undefined)
				player = players[3];
			else if(player !== undefined)
				player = players[4];
			else
				throw new Error("Something went wrong!");
			if(player!==undefined) {
				if(evt.keyCode===40)
					socket.emit("move", {"player":player.who, "y" : player.y, "dir" : "down","width":"16","height":"16"});
				else  if(evt.keyCode===38)
					socket.emit("move", {"player":player.who, "y" : player.y, "dir" : "up","width":"16","height":"16"});

				else if(evt.keyCode===37)
					socket.emit("move", {"player":player.who, "x" : player.x, "dir" : "left","width":"16","height":"16"});

				else if(evt.keyCode===39)
					socket.emit("move", {"player":player.who, "x" : player.x, "dir" : "right","width":"16","height":"16"});

				else if(evt.keyCode===75)
					socket.emit("move", {"player":player.who, "x" : player.x, "dir" : "","width":"16","height":"16"});
			}
		}
		socket.on("gold", function(data) {
			const player = players[englishToIndexMap[data['player']]];
			for(let i=0;i<resus.length;i++)
			    if(resus[i].x === data['x'] && resus[i].y === data['y']) {
                    stage2.removeChild(resus[i].resImage);
                    resus.splice(i, 1);
                    $("#gold").html(++player.gold);
                    stage2.update();
                    break;
                }
		});
		socket.on("cleanFog", function(data) {
			const cloud = clouds[englishToIndexMap[data['player']]];
			for (let i = 0; i < cloud.length; i++) {
				if (data["hat"] === cloud[i]["hat"]) {
					stage3.removeChild(cloud[i].fogImage);
					cloud.splice(i, 1);
					stage3.update();
				}
			}
		});
		socket.on("GoldStolen",function(data) {
			for(let i=0;i<resus.length;i++) {
				if(data["hert"]===resus[i]["hert"]) {
						stage2.removeChild(resus[i].resImage);
						resus.splice(i,1);
				}
				stage2.update();
			}
		});
		socket.on("energy", function(data) {
			for(let i=0;i<energs.length;i++) {
				if(data["player"]==="first" && data["hert"]===energs[i]["hert"]) {
					stage2.removeChild(energs[i].powImage);
					energs.splice(i,1);
				}
				else if(data["player"]==="second" && data["hert"]===energs[i]["hert"]) {
					stage2.removeChild(energs[i].powImage);
					energs.splice(i,1);
				}

				else if(data["player"]==="third" && data["hert"]===energs[i]["hert"]) {
					stage2.removeChild(energs[i].powImage);
					energs.splice(i,1);
				}
				else if(data["player"]==="fourth" && data["hert"]===energs[i]["hert"]) {
					stage2.removeChild(energs[i].powImage);
					energs.splice(i,1);
				}
				stage2.update();
			}
		});
		socket.on("BatteryStolen",function(data) {
			for(let i=0;i<energs.length;i++) {
				if(data["hert"]===energs[i]["hert"]) {
					stage2.removeChild(energs[i].powImage);
					energs.splice(i,1);
				}
				stage2.update();
			}
		});
		socket.on("gen",function(data) {
			const player = players[englishToIndexMap[data['player']]];
			if(player !== undefined) {
				player.value=data["value"];
				$("#energy").val(player.value);
			}
		});
		for(let row=0;row<25;row++) {
			for(let col=0;col<25;col++) {
				const pic=new createjs.Bitmap(queue.getResult("grass"));
				pic.x = row*32;
				pic.y = col*32;
				grass.push(pic);
				stage1.addChild(pic);
			}
		}
		stage3.update();
		stage2.update();
		stage1.update();
	}
});

function Base(sd, x, y) {
	this.screenSide = sd;
	this.x = x;
	this.y = y;
	if(this.screenSide==="red")
		this.playerImage = new createjs.Bitmap(queue.getResult("red"));
	else if(this.screenSide==="blue")
		this.playerImage = new createjs.Bitmap(queue.getResult("blue"));
	else if(this.screenSide==="yellow")
		this.playerImage = new createjs.Bitmap(queue.getResult("yellow"));
	else
		this.playerImage=new createjs.Bitmap(queue.getResult("green"));
	this.playerImage.x = this.x;
	this.playerImage.y = this.y;
}

function Player(id, sd, wh, x, y,g,v) {
	this.caxs=true;
	this.value=v;
	this.gold=g;
	this.hashiv=$("<div><img src='gui/resource/gold.png'><h1>"+"<span id ='gold'>0</span>"+"</h2></div>");
	this.id = id;
	this.energy=$("<meter id='energy' value="+v+" min='0' max='500'></meter>")
	this.screenSide = sd;
	this.who = wh;
	this.x = x;
	this.y = y;
	if(this.screenSide==="red")
		this.playerImage = new createjs.Bitmap(queue.getResult("re"));
	else if(this.screenSide==="blue")
		this.playerImage = new createjs.Bitmap(queue.getResult("blu"));
	else if(this.screenSide==="yellow")
		this.playerImage = new createjs.Bitmap(queue.getResult("yell"));
	else
		this.playerImage=new createjs.Bitmap(queue.getResult("gre"));
	this.playerImage.x = this.x;
	this.playerImage.y = this.y;
	
}
function Res( x, y,ht) {
	this.hert=ht;
	this.x = x;
	this.y = y;
	this.resImage = new createjs.Bitmap(queue.getResult("res"));
	this.resImage.x = this.x;
	this.resImage.y = this.y;
}

function Sto( x, y) {
	this.x = x;
	this.y = y;
	this.stoImage = new createjs.Bitmap(queue.getResult("stone"));
	this.stoImage.x = this.x;
	this.stoImage.y = this.y;
}

function Power(x, y,ht) {
	this.hert=ht;
	this.x = x;
	this.y = y;
	this.powImage = new createjs.Bitmap(queue.getResult("energy"));
	this.powImage.x = this.x;
	this.powImage.y = this.y;
}
function Fog(x,y,ht) {
	this.hat=ht;
	this.x = x;
	this.y = y;
	this.fogImage = new createjs.Bitmap(queue.getResult("fog"));
	this.fogImage.x = this.x;
	this.fogImage.y = this.y;
}