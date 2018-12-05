const energs=[];
const obstacles=[];
const resus=[];
const grass= [];
const clouds1=[];
const clouds2=[];
const clouds3=[];
const clouds4=[];
let stage1;
let stage2;
let stage3;
let queue;
let red;
let blue;
let green;
let yellow;
const players = [];
const socketPlayers = [];
const englishToIndex = {
	"first" : "1",
	"second" : "2",
	"third" : "3",
	"fourth" : "4"
};
$(function()
{
	stage1=new createjs.Stage("background");
	stage2=new createjs.Stage("arena");
	stage3 = new createjs.Stage("fog");
	queue=new createjs.LoadQueue(true);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest
	(
		[	{id:"grass",src:"/gui/terrain/grass.png"},{id:"red",src:"/gui/camp/red.png"},{id:"blue",src:"/gui/camp/blue.png"},
			{id:"yellow",src:"/gui/camp/yellow.png"},{id:"green",src:"/gui/camp/green.png"},{id:"blu",src:"/gui/truck/blue.png"},
			{id:"gre",src:"/gui/truck/green.png"},{id:"re",src:"/gui/truck/red.png"},{id:"yell",src:"/gui/truck/yellow.png"},
			{id:"stone",src:"/gui/obstacle/default.png"},{id:"res",src:"/gui/resource/gold.png"},{id:"energy",src:"/gui/resource/power.png"},
			{id:"fog",src:"/gui/fog.png"}
			]
	);
		
    
function handleComplete() {
	var socket = io.connect();
	window["socket"] = socket;

	socket.on("disconnect", function()
	{
		window.location.reload();
	});

	socket.on("basa", function(data) {
		   window["side"] = data["side"];
		   basa = new Basa(window["side"], data["x"], data["y"],data["hert"]);
		   stage2.addChild(basa.playerImage);
		   stage2.update();
	});

	socket.on("fog1", function(data) {
		for(var i=0;i<data.length;i++) {
			fog1 = new Fog( data[i]["x"], data[i]["y"],data[i]["hat"]);
			clouds1.push(fog1);
			stage3.addChild(fog1.fogImage);
			stage3.update();
		}
	});

	socket.on("fog2", function(data) {
		for(var i=0;i<data.length;i++) {
			fog2 = new Fog( data[i]["x"], data[i]["y"],data[i]["hat"]);
			clouds2.push(fog2);
			stage3.addChild(fog2.fogImage);
			stage3.update();
		}
	});

	socket.on("fog3", function(data) {
		for(var i=0;i<data.length;i++) {
			fog3 = new Fog( data[i]["x"], data[i]["y"],data[i]["hat"]);
			clouds3.push(fog3);
			stage3.addChild(fog3.fogImage);
			stage3.update();
		}
	});

	socket.on("fog4", function(data) {
		for(var i=0;i<data.length;i++) {
			fog4 = new Fog( data[i]["x"], data[i]["y"],data[i]["hat"]);
			clouds4.push(fog4);
			stage3.addChild(fog4.fogImage);
			stage3.update();
		}
	});

	socket.on("enter", function(data) {
		for(var i=0;i<data.length;i++) {
			sto = new Sto( data[i]["x"], data[i]["y"],data["hert"]);
			obstacles.push(sto);
			stage2.addChild(sto.stoImage);
			stage2.update();
		}
	});


	socket.on("enterThe", function(data) {
		for(let h=0;h<data.length;h++) {
			res = new Res( data[h]["x"], data[h]["y"],data[h]["hert"]);
			resus.push(res);
			stage2.addChild(res.resImage);
			stage2.update();
		}
	});

	socket.on("ente", function(data) {
		for(h=0;h<data.length;h++) {
			pow = new Power( data[h]["x"], data[h]["y"],data[h]["hert"]);
			energs.push(pow);
			stage2.addChild(pow.powImage);
			stage2.update();
		}
	});

	socket.on("1", function(data) {
		window["side"] = data["side"];
		players[1] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(players[1].energy);
		$("body").append(players[1].hashiv);
		stage2.addChild(players[1].playerImage);
		socket.emit("newPlayerCreated", {"id":players[1].id, "x":players[1].x, "y":players[1].y, "side":players[1].screenSide, "player":players[1].who,"value":players[1].value});
		stage2.update();
	});

	socket.on("2", function(data) {
		window["side"] = data["side"];
		players[2] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(players[2].energy);
		$("body").append(players[2].hashiv)
		stage2.addChild(players[2].playerImage);
		socket.emit("newPlayerCreated", {"id":players[2].id, "x":players[2].x, "y":players[2].y, "side":players[2].screenSide, "player":players[2].who,"value":players[2].value});
		stage2.update();
	});

	socket.on("3", function(data) {
		window["side"] = data["side"];
		players[3] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(players[3].energy);
		$("body").append(players[3].hashiv);
		stage2.addChild(players[3].playerImage);
		socket.emit("newPlayerCreated", {"id":players[3].id, "x":players[3].x, "y":players[3].y, "side":players[3].screenSide, "player":players[3].who,"value":players[3].value});
		stage2.update();
	});

	socket.on("4", function(data) {
		window["side"] = data["side"];
		players[4] = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(players[4].energy);
		$("body").append(players[4].hashiv)
		stage2.addChild(players[4].playerImage);
		socket.emit("newPlayerCreated", {"id":players[4].id, "x":players[4].x, "y":players[4].y, "side":players[4].screenSide, "player":players[4].who,"value":players[4].value});
		stage2.update();
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

	//code to be added
	window.addEventListener("keydown",movement);
	window.addEventListener("keyup", chMovement);

	socket.on("someOneMove", function(data) {
		const player = players[englishToIndex[data["player"]]];
		const socketPlayer = socketPlayers[englishToIndex[data["player"]]];
		if(player!==undefined) {
			player.value=data["value"];
			$("#energy").val(player.value);
			player.playerImage.y = data["y"];
			player.playerImage.x = data["x"];
			stage2.update();
		}
		else {
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
				if(evt.keyCode==40) {
					socket.emit("move", {"player":player.who, "y" : player.y,  "x" : player.x,"dir" : "down","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"radx":player.x+32,"rady":player.y+32,"kicking":false,"value":player.value});
					lastDir="down";
				}
				else if(evt.keyCode==38) {
					socket.emit("move", {"player":player.who, "y" : player.y, "x" : player.x, "dir" : "up","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"radx":player.x+32,"rady":player.y+32,"kicking":false,"value":player.value});
					lastDir="up";
				}
				else if(evt.keyCode==37) {
					socket.emit("move", {"player":player.who, "x" : player.x,"y" : player.y, "dir" : "left","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"radx":player.x+32,"rady":player.y+32,"kicking":false,"value":player.value});
					lastDir="left";
				}
				else if(evt.keyCode==39) {
					socket.emit("move", {"player":player.who, "x" : player.x,"y" : player.y, "dir" : "right","width":"16","height":"16","c":"800","plx":player.x+16,"ply":player.y+16,"kicking":false,"value":player.value});
					lastDir="right"
				}
				else if(evt.keyCode==75)
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
					if(evt.keyCode==40)
						socket.emit("move", {"player":player.who, "y" : player.y, "dir" : "","width":"16","height":"16"});
				    else  if(evt.keyCode==38)
				   		socket.emit("move", {"player":player.who, "y" : player.y, "dir" : "","width":"16","height":"16"});

					else if(evt.keyCode==37)
						socket.emit("move", {"player":player.who, "x" : player.x, "dir" : "","width":"16","height":"16"});

					else if(evt.keyCode==39)
						socket.emit("move", {"player":player.who, "x" : player.x, "dir" : "","width":"16","height":"16"});

					else if(evt.keyCode==75)
						socket.emit("move", {"player":player.who, "x" : player.x, "dir" : "","width":"16","height":"16"});
			}
		}


					socket.on("gold", function(data)
				   {


						for(var i=0;i<resus.length;i++)
						{

								if(data["player"]=="first" && data["hert"]==resus[i]["hert"])
								{

									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++players[1].gold);



								}
								else if(data["player"]=="second" && data["hert"]==resus[i]["hert"])
								{
									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++players[2].gold);



								}

								else if(data["player"]=="third" && data["hert"]==resus[i]["hert"])
								{
									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++players[3].gold);



								}
								else if(data["player"]=="fourth" && data["hert"]==resus[i]["hert"])
								{
									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++players[4].gold);



								}
								stage2.update();

						}
					});


					socket.on("cleanFog", function(data)
				   {
						if(data["player"]=="first")
						{
						for(var i=0;i<clouds1.length;i++)
						{

								if( data["hat"]==clouds1[i]["hat"])
								{

									stage3.removeChild(clouds1[i].fogImage);

									clouds1.splice(i,1);

									stage3.update();



								}


							}



						}
							if(data["player"]=="second")
						{
						for(var i=0;i<clouds2.length;i++)
						{

								if( data["hat"]==clouds2[i]["hat"])
								{

									stage3.removeChild(clouds2[i].fogImage);

									clouds2.splice(i,1);

									stage3.update();



								}


							}



						}

							if(data["player"]=="third")
						{
						for(var i=0;i<clouds3.length;i++)
						{

								if( data["hat"]==clouds3[i]["hat"])
								{

									stage3.removeChild(clouds3[i].fogImage);

									clouds3.splice(i,1);

									stage3.update();



								}


							}



						}

							if(data["player"]=="fourth")
						{
						for(var i=0;i<clouds4.length;i++)
						{

								if( data["hat"]==clouds4[i]["hat"])
								{

									stage3.removeChild(clouds4[i].fogImage);

									clouds4.splice(i,1);

									stage3.update();



								}


							}



						}


					});




					socket.on("GoldStolen",function(data)
					{

						for(var i=0;i<resus.length;i++)
					{

							if(data["hert"]==resus[i]["hert"])
							{
									stage2.removeChild(resus[i].resImage);
									resus.splice(i,1);
							}
							stage2.update();

					}
					});

						socket.on("energy", function(data)
				   {


						for(var i=0;i<energs.length;i++)
						{

								if(data["player"]=="first" && data["hert"]==energs[i]["hert"])
								{

									stage2.removeChild(energs[i].powImage);

									energs.splice(i,1);





								}
								else if(data["player"]=="second" && data["hert"]==energs[i]["hert"])
								{
									stage2.removeChild(energs[i].powImage);

									energs.splice(i,1);





								}

								else if(data["player"]=="third" && data["hert"]==energs[i]["hert"])
								{
									stage2.removeChild(energs[i].powImage);

									energs.splice(i,1);





								}
								else if(data["player"]=="fourth" && data["hert"]==energs[i]["hert"])
								{
									stage2.removeChild(energs[i].powImage);

									energs.splice(i,1);





								}
								stage2.update();

						}
					});

					socket.on("BatteryStolen",function(data)
					{

						for(var i=0;i<energs.length;i++)
					{

							if(data["hert"]==energs[i]["hert"])
							{
									stage2.removeChild(energs[i].powImage);
									energs.splice(i,1);
							}
							stage2.update();

					}
					});



		socket.on("gen",function(data)
		{
		if(data["player"]=="first")
		{
		if(players[1]!==undefined)
		{
		players[1].value=data["value"];
		$("#energy").val(players[1].value);
		}
		}
		if(data["player"]=="second")
		{
		if(players[2]!==undefined)
		{
		players[2].value=data["value"];
		$("#energy").val(players[2].value);
		}
		}
		if(data["player"]=="third")
		{
		if(players[3]!==undefined)
		{
		players[3].value=data["value"];
		$("#energy").val(players[3].value);
		}
		}
		if(data["player"]=="fourth")
		{
		if(players[4]!==undefined)
		{
		players[4].value=data["value"];
		$("#energy").val(players[4].value);
		}
		}
		});










			for(row=0;row<25;row++)
			{
			for(col=0;col<25;col++)
			{

				var pic=new createjs.Bitmap(queue.getResult("grass"));
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

function Basa(sd, x, y)
{
	
	
	this.screenSide = sd;
	
	
	
	this.x = x;
	this.y = y;
	if(this.screenSide=="red")
	{
	this.playerImage = new createjs.Bitmap(queue.getResult("red"));
	}
	else if(this.screenSide=="blue")
	{
	this.playerImage = new createjs.Bitmap(queue.getResult("blue"));
	}
	else if(this.screenSide=="yellow")
	{
	this.playerImage = new createjs.Bitmap(queue.getResult("yellow"));
	}
	
	else
	{
	
	this.playerImage=new createjs.Bitmap(queue.getResult("green"));
	}
	this.playerImage.x = this.x;
	this.playerImage.y = this.y;
	
}



function Player(id, sd, wh, x, y,g,v)
{
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
	if(this.screenSide=="red")
	{
	this.playerImage = new createjs.Bitmap(queue.getResult("re"));
	}
	else if(this.screenSide=="blue")
	{
	this.playerImage = new createjs.Bitmap(queue.getResult("blu"));
	}
	else if(this.screenSide=="yellow")
	{
	this.playerImage = new createjs.Bitmap(queue.getResult("yell"));
	}
	
	else
	{
	
	this.playerImage=new createjs.Bitmap(queue.getResult("gre"));
	}
	this.playerImage.x = this.x;
	this.playerImage.y = this.y;
	
}


function Res( x, y,ht)
{
	
this.hert=ht;
	this.x = x;
	this.y = y;
	
	this.resImage = new createjs.Bitmap(queue.getResult("res"));
	
	this.resImage.x = this.x;
	this.resImage.y = this.y;
}

function Sto( x, y)
{
	

	this.x = x;
	this.y = y;
	
	this.stoImage = new createjs.Bitmap(queue.getResult("stone"));
	
	this.stoImage.x = this.x;
	this.stoImage.y = this.y;
}


function Power(x, y,ht)
{
	this.hert=ht;

	this.x = x;
	this.y = y;
	
	this.powImage = new createjs.Bitmap(queue.getResult("energy"));
	
	this.powImage.x = this.x;
	this.powImage.y = this.y;
}
function Fog(x,y,ht)
{
	this.hat=ht;

	this.x = x;
	this.y = y;
	
	this.fogImage = new createjs.Bitmap(queue.getResult("fog"));
	
	this.fogImage.x = this.x;
	this.fogImage.y = this.y;
}

