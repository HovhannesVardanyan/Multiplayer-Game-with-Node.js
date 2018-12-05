var player1;
var energs=[];
var obstacles=[];
var resus=[];
var player2;
var player3;
var player4;
var socketPlayer1;
var socketBasa2;
var socketPlayer2;
var socketBasa3;
var socketPlayer3;
var socketBasa4;
var socketPlayer4;
var grass= [];
var clouds1=[];
var clouds2=[];
var clouds3=[];
var clouds4=[];
var stage1;
var stage2;
var queue;
var red;
var blue;
var green;
var yellow;
$(function()
{
	stage1=new createjs.Stage("background");
	stage2=new createjs.Stage("arena");
	stage3=new createjs.Stage("fog");
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
		player1 = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(player1.energy);
		$("body").append(player1.hashiv);
		stage2.addChild(player1.playerImage);
		socket.emit("newPlayerCreated", {"id":player1.id, "x":player1.x, "y":player1.y, "side":player1.screenSide, "player":player1.who,"value":player1.value});
		stage2.update();
	});

	socket.on("2", function(data) {
		window["side"] = data["side"];
		player2 = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(player2.energy);
		$("body").append(player2.hashiv)
		stage2.addChild(player2.playerImage);
		socket.emit("newPlayerCreated", {"id":player2.id, "x":player2.x, "y":player2.y, "side":player2.screenSide, "player":player2.who,"value":player2.value});
		stage2.update();
	});

	socket.on("3", function(data) {
		window["side"] = data["side"];
		player3 = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(player3.energy);
		$("body").append(player3.hashiv);
		stage2.addChild(player3.playerImage);
		socket.emit("newPlayerCreated", {"id":player3.id, "x":player3.x, "y":player3.y, "side":player3.screenSide, "player":player3.who,"value":player3.value});
		stage2.update();
	});

	socket.on("4", function(data) {
		window["side"] = data["side"];
		player4 = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],0,500);
		$("body").append(player4.energy);
		$("body").append(player4.hashiv)
		stage2.addChild(player4.playerImage);
		socket.emit("newPlayerCreated", {"id":player4.id, "x":player4.x, "y":player4.y, "side":player4.screenSide, "player":player4.who,"value":player4.value});
		stage2.update();
	});

	socket.on("firstPosition", function(data) {
		socketPlayer1 = new Player(data["id"], data["side"], data["player"], data["x"], data["y"]);
		stage2.addChild(socketPlayer1.playerImage);
		stage2.update();
	});

    socket.on("newPlayer", function(data) {
		window["side"] = data["side"];
		socketPlayer2 = new Player(data["id"], window["side"], data["player"], data["x"], data["y"],data["width"]);
		stage2.addChild(socketPlayer2.playerImage);
		stage2.update();
    });
	socket.on("soc", function(data) {
		window["side"] = data["side"];
		socketPlayer3 = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],data["width"]);
		stage2.addChild(socketPlayer3.playerImage);
		stage2.update();
	});

	socket.on("joke", function(data) {
		window["side"] = data["side"];
		socketPlayer4 = new Player(data["name"], window["side"], data["player"], data["x"], data["y"],data["width"]);
		stage2.addChild(socketPlayer4.playerImage);
		stage2.update();
	});

	//code to be added
	window.addEventListener("keydown",movement);
	window.addEventListener("keyup", chMovement);

	socket.on("someOneMove", function(data) {
		if(data["player"] == "first") {
			if(player1!==undefined) {
			 	player1.value=data["value"];
			  	$("#energy").val(player1.value);
				player1.playerImage.y = data["y"];
				player1.playerImage.x = data["x"];
				stage2.update();
			}
			 else {
				socketPlayer1.playerImage.x = data["x"];
				socketPlayer1.playerImage.y = data["y"];
				stage2.update();
			 }
		}

		if(data["player"] == "second") {
			if(player2!==undefined) {
				player2.value=data["value"];
				$("#energy").val(player2.value);
				player2.playerImage.y = data["y"];
				player2.playerImage.x = data["x"];
				stage2.update();
			}
			 else {
				socketPlayer2.playerImage.x = data["x"];
				socketPlayer2.playerImage.y = data["y"];
				stage2.update();
			 }
		}

		if(data["player"] == "third") {
			if(player3!==undefined) {
				player3.value=data["value"];
			  	$("#energy").val(player3.value);
				player3.playerImage.y = data["y"];
				player3.playerImage.x = data["x"];
				stage2.update();
			}
			 else {
				socketPlayer3.playerImage.x= data["x"];
				socketPlayer3.playerImage.y = data["y"];
				stage2.update();
			 }
		}

		if(data["player"] == "fourth") {
			if(player4!==undefined) {
				player4.value=data["value"];
				$("#energy").val(player4.value);
				player4.playerImage.y = data["y"];
				player4.playerImage.x = data["x"];
				stage2.update();
			}
			else {
				socketPlayer4.playerImage.x = data["x"];
				socketPlayer4.playerImage.y = data["y"];
				stage2.update();
			}
		}
	});


	function movement(evt) {
		if(player1 !== undefined)
			player = player1;
		else if(player2 !== undefined)
			player = player2;
		else if(player3 !== undefined)
			player = player3;
		else if(player !== undefined)
			player = player4;
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
				else if(evt.keyCode==75) {
					ocket.emit("move", {"player":player.who, "x" : player.x, "y" : player.y, "dir" : lastDir,"width":16,"height":16,"c":"800","kicking":true});
				}
			}
		}


					function chMovement(evt)
					{


							if(player1!==undefined)
						{
							if(evt.keyCode==40)
							{
										socket.emit("move", {"player":player1.who, "y" : player1.y, "dir" : "","width":"16","height":"16"});
										}
						   else  if(evt.keyCode==38)
							{
										socket.emit("move", {"player":player1.who, "y" : player1.y, "dir" : "","width":"16","height":"16"});
										}
							else if(evt.keyCode==37)
							{
										socket.emit("move", {"player":player1.who, "x" : player1.x, "dir" : "","width":"16","height":"16"});
							}
							else if(evt.keyCode==39)
							{
										socket.emit("move", {"player":player1.who, "x" : player1.x, "dir" : "","width":"16","height":"16"});
							}

							else if(evt.keyCode==75)
							{
										socket.emit("move", {"player":player1.who, "x" : player1.x, "dir" : "","width":"16","height":"16"});
							}
										}

						else if(player2!==undefined)
						{
							if(evt.keyCode==40)
							{
										socket.emit("move", {"player":player2.who, "y" : player2.y, "dir" : "","width":"16","height":"16"});
										}
						   else  if(evt.keyCode==38)
							{
										socket.emit("move", {"player":player2.who, "y" : player2.y, "dir" : "","width":"16","height":"16"});
										}
							else if(evt.keyCode==37)
							{
										socket.emit("move", {"player":player2.who, "x" : player2.x, "dir" : "","width":"16","height":"16"});
							}
							else if(evt.keyCode==39)
							{
										socket.emit("move", {"player":player2.who, "x" : player2.x, "dir" : "","width":"16","height":"16"});
							}
										}

						else if(player3!==undefined)
						{
							if(evt.keyCode==40)
							{
										socket.emit("move", {"player":player3.who, "y" : player3.y, "dir" : "","width":"16","height":"16"});
										}
						   else  if(evt.keyCode==38)
							{
										socket.emit("move", {"player":player3.who, "y" : player3.y, "dir" : "","width":"16","height":"16"});
										}
							else if(evt.keyCode==37)
							{
										socket.emit("move", {"player":player3.who, "x" : player3.x, "dir" : "","width":"16","height":"16"});
							}
							else if(evt.keyCode==39)
							{
										socket.emit("move", {"player":player3.who, "x" : player3.x, "dir" : "","width":"16","height":"16"});
							}
										}

											else if(player4!==undefined)
						{
							if(evt.keyCode==40)
							{
										socket.emit("move", {"player":player4.who, "y" : player4.y, "dir" : "","width":"16","height":"16"});
										}
						   else  if(evt.keyCode==38)
							{
										socket.emit("move", {"player":player4.who, "y" : player4.y, "dir" : "","width":"16","height":"16"});
										}
							else if(evt.keyCode==37)
							{
										socket.emit("move", {"player":player4.who, "x" : player4.x, "dir" : "","width":"16","height":"16"});
							}
							else if(evt.keyCode==39)
							{
										socket.emit("move", {"player":player4.who, "x" : player4.x, "dir" : "","width":"16","height":"16"});
							}
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

									$("#gold").html(++player1.gold);



								}
								else if(data["player"]=="second" && data["hert"]==resus[i]["hert"])
								{
									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++player2.gold);



								}

								else if(data["player"]=="third" && data["hert"]==resus[i]["hert"])
								{
									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++player3.gold);



								}
								else if(data["player"]=="fourth" && data["hert"]==resus[i]["hert"])
								{
									stage2.removeChild(resus[i].resImage);

									resus.splice(i,1);

									$("#gold").html(++player4.gold);



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
		if(player1!==undefined)
		{
		player1.value=data["value"];
		$("#energy").val(player1.value);
		}
		}
		if(data["player"]=="second")
		{
		if(player2!==undefined)
		{
		player2.value=data["value"];
		$("#energy").val(player2.value);
		}
		}
		if(data["player"]=="third")
		{
		if(player3!==undefined)
		{
		player3.value=data["value"];
		$("#energy").val(player3.value);
		}
		}
		if(data["player"]=="fourth")
		{
		if(player4!==undefined)
		{
		player4.value=data["value"];
		$("#energy").val(player4.value);
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

