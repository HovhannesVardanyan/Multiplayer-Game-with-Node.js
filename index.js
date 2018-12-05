var golds=[];
var bats=[];
var col=false;
var colr=false;
var coll=false;
var colu=false;
var stones=[];
var sckt = [];
var hert;
var players = [];
var basas = [];
var chires=[];
var tru=true;
var x;
var y;
var player;
var souy=new Array();
var sou;
var res;
var soux=new Array();
var stone;
var obstacle;
var kot=64;
var kos=64;
var kor=64;
var fogs1=[];
var fogs2=[];
var fogs3=[];
var fogs4=[];
var hat=0;
var corx=new Array();
var cory=new Array();
var energx=new Array();
var energy=new Array();
var resuy;
var resux;
var basax;
var basay;
var colision;
var hert=0;
var chores=[];
var chures=[];
var check;
var caxs=true;

var red={
"side":"red",
"x":0,
"y":0
};
var green={
"side":"green",
"x":736,
"y":0
};
var yellow={
"side":"yellow",
"x":0,
"y":736
};
var blue={
"side":"blue",
"x":736,
"y":736
};
 
 	for(var k=0;k<8;k++)
	{
	for(var m=0;m<8;m++)
	{
	var x=k*100;
	var y=m*100;
	var fog={
	"x":x,
	"y":y,
	"hat":hat,
	"hert":"first"
	}

	
			 fogs1.push(fog);
			 fogs2.push(fog);
			  fogs3.push(fog);
			   fogs4.push(fog);
				 ++hat;
			
				 
	}
	
	}
	fogs1.splice(0,1);
fogs3.splice(7,1);
fogs2.splice(56,1);
fogs4.splice(63,1);
	var express=require("express");
	var app=express();
	var http=require("http").createServer(app);
	var io=require("socket.io").listen(http);
	http.listen(8080);
	//io.set("log level",1)
	
	app.get("/",function(req,res){
	
	res.sendfile(__dirname +"/index.html");
	});

	app.use("/gui",express.static(__dirname+ '/gui'));
	
	

	app.get('/:file',function(req,res,next)
	{

	if(req.params.file=='gui')
	{
		next();
	}
	else
	{
		res.sendfile(__dirname+"/"+req.params.file);
	}
	});
	for(var col=4;col<23;col++)
	{
	for(var row=0;row<25;row++)
	{
	var x=col*32;
	var y=row*32;
	var resource={
	"x":x,
	"y":y,
	"hert":hert
	}
	var power={
	"x":x,
	"y":y,
	"hert":hert
	}
	var obstacle={
    "x":x,
	"y":y,
	"hert":hert
	
	}
	
			   bats.push(power);
			     golds.push(resource);
				 stones.push(obstacle);
				 ++hert;
				 
	}
	
	}
	for(h=0;h<10;h++)
	{
	var element=Math.floor(Math.random()*400);
	var energy=Math.floor(Math.random()*400);
	var index=Math.floor(Math.random()*400);
	
	chores.push(golds[element]);
	chures.push(bats[energy]);
	chires.push(stones[index]);

	if(energy==element)
	{
	chures.splice(h,1);
	chores.splice(h,1);
	h--;
	}
		if(energy==index)
	{
	chures.splice(h,1);
	chires.splice(h,1);
	h--;
	}
		if(index==element)
	{
	chires.splice(h,1);
	chores.splice(h,1);
	h--;
	}
	
	}
	
	io.sockets.on('connection', function(socket)
{	
var check=setInterval(gen,5000);

 io.sockets.emit("basa",red);
  io.sockets.emit("basa",green);
  io.sockets.emit("basa",yellow);
 io.sockets.emit("basa",blue);
if(players.length>4)
{return false;}

sckt.push(socket.id);
	if(sckt.length==1)
	{
		hert="red";
		x=16;
		y=64;
		player="first";
		socket.emit("1", {
								"name":socket.id,
								"side":hert,
								"player":player,
								"x":x,
								"y":y
							  });
							  socket.emit("fog1", fogs1);
	
	}
	if(sckt.length==2)
	{
		hert="green";
		x=736;
		y=64;
		player="second"
		socket.emit("2", {
								"name":socket.id,
								"side":hert,
								"player":player,
								"x":x,
								"y":y
							  });
							   socket.emit("fog2", fogs2);
	
	}
	if(sckt.length==3)
	{
		hert="yellow";
		x=16;
		y=706;
		player="third";
		socket.emit("3", {
								"name":socket.id,
								"side":hert,
								"player":player,
								"x":x,
								"y":y
							  });
							   socket.emit("fog3", fogs3);
	}
	if(sckt.length==4)
	{
		hert="blue";
		x=736;
		y=706;
		player="fourth"
		socket.emit("4", {
								"name":socket.id,
								"side":hert,
								"player":player,
								"x":x,
								"y":y
							  });
							   socket.emit("fog4", fogs4);
	}
	
	



socket.emit("ente",chures);
socket.emit("enterThe", chores);	
socket.emit("enter", chires);








	
	
	
	
	
	

						  
	 socket.on('newPlayerCreated', function(data)
	{

		players.push({"id":data["id"], "x":data["x"], "y":data["y"], "side":data["side"], "player":data["player"],"value":data["value"]});
		if(data["player"] == "second")
			{
				socket.emit("firstPosition",players[0]);
				socket.broadcast.emit("newPlayer", data);
			}
			
			 if(data["player"] == "third")
			{
				socket.emit("firstPosition",players[0]);
				socket.emit("newPlayer", players[1]);
				socket.broadcast.emit("soc", data);
			}
		
			 if(data["player"] == "fourth")
			{
			
				socket.emit("firstPosition",players[0]);
				socket.emit("newPlayer", players[1]);
				socket.emit("soc", players[2]);
				socket.broadcast.emit("joke", data);
			}
			
			
		
	});
	
	

	
	
	


	
	socket.on('move', function(data)
	{
	
	

	

	
	for(var tmp in players)
	{







 
				
		if(players[tmp]["player"] == data["player"])
		{
		if(data["player"]=="first")
			   {
			
				for(var k=0;k<fogs1.length;k++)
			{
                
				var distancex=Math.abs(fogs1[k]["x"]-parseInt(players[tmp]["x"]));
				var distancey=Math.abs(fogs1[k]["y"]-parseInt(players[tmp]["y"]));
		
				if(distancex<=135&&distancey<=135)
				{
				
					socket.emit("cleanFog",{"hat":fogs1[k]["hat"],"player":players[tmp]["player"]});
					
				
					fogs1.splice(k,1);
				
					}
				}
	
}

else if(data["player"]=="second")
			   {
			   
				for(var h=0;h<fogs2.length;h++)
			{
               
				var distancex=Math.abs(fogs2[h]["x"]-parseInt(players[tmp]["x"])+100);
				var distancey=Math.abs(fogs2[h]["y"]-parseInt(players[tmp]["y"])+100);
		
				if(distancex<=135&&distancey<=135)
				{
				
					socket.emit("cleanFog",{"hat":fogs2[h]["hat"],"player":players[tmp]["player"]});
					
				
					fogs2.splice(h,1);
				
					}
				}
			}	
else  if(data["player"]=="third")
			   {
			    
				for(var g=0;g<fogs3.length;g++)
			{
              
				var distancex=Math.abs(fogs3[g]["x"]-parseInt(players[tmp]["x"])+100);
				var distancey=Math.abs(fogs3[g]["y"]-parseInt(players[tmp]["y"])+100);
		
				if(distancex<=135&&distancey<=135)
				{

					socket.emit("cleanFog",{"hat":fogs3[g]["hat"],"player":players[tmp]["player"]});
					
				
					fogs3.splice(g,1);
				
					}
				}
			}	
 else if(data["player"]=="fourth")
			   {
			   
				for(var f=0;f<fogs4.length;f++)
			{
               
				var distancex=Math.abs(fogs4[f]["x"]-parseInt(players[tmp]["x"])+100);
				var distancey=Math.abs(fogs4[f]["y"]-parseInt(players[tmp]["y"])+100);
		
				if(distancex<=135&&distancey<=135)
				{
				
					socket.emit("cleanFog",{"hat":fogs4[f]["hat"],"player":players[tmp]["player"]});
					
				
					fogs4.splice(f,1);
				
					}
				}
				}
		
		
		if(players[tmp]["value"]>=5)
		{
	players[tmp]["value"]-=5;
	}

		if(players[tmp]["value"]<4)
			{
			
			
		
			col=true;
		colr=true;
		coll=true;
		colu=true;
		
			}
			
		for(var h=0;h<chures.length;h++)
			{

				var distancex=Math.abs(chures[h]["x"]-parseInt(players[tmp]["x"]));
				var distancey=Math.abs(chures[h]["y"]-parseInt(players[tmp]["y"]));
				
				if(distancex<=28&&distancey<=28)
				{
				
					socket.emit("energy",{"hert":chures[h]["hert"],"player":players[tmp]["player"]});
					if(players[tmp]["value"]<=250)
					{
					players[tmp]["value"]+=250;
					}
					else if(players[tmp]["value"]>250)
					{
					var tarb=500-players[tmp]["value"];
					players[tmp]["value"]+=tarb;
					}
					socket.broadcast.emit("BatteryStolen",chures[h]);
					chures.splice(h,1);
				
					
				}
			}
			

			
			
			if(tru)
			{
			for(var i=0;i<chores.length;i++)
			{

				var distancex=Math.abs(chores[i]["x"]-parseInt(players[tmp]["x"]));
				var distancey=Math.abs(chores[i]["y"]-parseInt(players[tmp]["y"]));
				
				if(distancex<=28&&distancey<=28)
				{
				
					socket.emit("gold",{"hert":chores[i]["hert"],"player":players[tmp]["player"]});
					
					socket.broadcast.emit("GoldStolen",chores[i]);
					chores.splice(i,1);
				
					
				}
			}
			}
		
		
		

			



			if(data["dir"] == "down")
		{
		players[tmp]["y"] += 5;

						for(var i=1;i<players.length;i++)
			{
		 var distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
		 var distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
			
		  
			
			
			
		 if(distancex<=28&&distancey<=28)
			{
				if(data["player"]==players[0]["player"]||data["player"]==players[i]["player"])
				{
					col=true;
				}
			
			
			}
		}
			 for(var i=2;i<players.length;i++)
			{
		 var distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
		 var distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
			
		  
			
			
			
		 if(distancex<=28&&distancey<=28)
			{
				if(data["player"]==players[1]["player"]||data["player"]==players[i]["player"])
				{
					col=true;
				}
			
			
			}
		}

		 for(var i=3;i<players.length;i++)
			{
		 var distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
		 var distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
			
		  
			
			
			
		 if(distancex<=28&&distancey<=28)
			{
				if(data["player"]==players[2]["player"]||data["player"]==players[i]["player"])
				{
					col=true;
				}
			
			
			}
		}



		 for(var i=0;i<chires.length;i++)
			{
		 var distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
		 var distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
			
		  
			
			
			
		 if(distancex<=26&&distancey<=26)
			{
			
				players[tmp]["y"] += 0;
				col=true;
			}
		}

			  
				
				
			
				 if(col||players[tmp]["y"]==766||players[tmp]["y"]==769||players[tmp]["y"]>710&&players[tmp]["x"]<54||players[tmp]["x"]>710&&players[tmp]["y"]>710)
				{
					players[tmp]["y"] -= 5;
				}
				}
				
			else if(data["dir"] == "up")
			{
			players[tmp]["y"] -= 5;
			
			
				 for(var i=3;i<players.length;i++)
			{
		 var distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
		 var distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
			
		  
			
			
			
		 if(distancex<=28&&distancey<=28)
			{
				if(data["player"]==players[2]["player"]||data["player"]==players[i]["player"])
				{
					colu=true;
				}
			
			
			}
		}

			for(var i=2;i<players.length;i++)
			{
		 var distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
		 var distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
			
		  
			
			
			
		 if(distancex<=28&&distancey<=28)
			{
				if(data["player"]==players[1]["player"]||data["player"]==players[i]["player"])
				{
					colu=true;
				}
			
			
			}
		}

			
			
		  for(var i=1;i<players.length;i++)
			{
		 var distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
		 var distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
			
		  
			
			
			
		 if(distancex<=28&&distancey<=28)
			{
				if(data["player"]==players[0]["player"]||data["player"]==players[i]["player"])
				{
					colu=true;
				}
			
			
			}
		}
			
			
			
			 for(var i=0;i<chires.length;i++)
			{
		 var distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
		 var distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
			
		  
			
			
			
		 if(distancex<=26&&distancey<=26)
			{
				colu=true;
			}
		}
			
					 if(colu||players[tmp]["y"]+data["width"]<=5||players[tmp]["y"]<64&&players[tmp]["x"]<54||players[tmp]["y"]<64&&players[tmp]["x"]>713)
					{
							players[tmp]["y"] += 5;
					}
				}
				
				else if(data["dir"]=="left")
				{
				

					players[tmp]["x"] -= 5;
					
					
						 for(var i=3;i<players.length;i++)
				{
			 var distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
			 var distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
				
			  
				
				
				
			 if(distancex<=28&&distancey<=28)
				{
				if(data["player"]==players[2]["player"]||data["player"]==players[i]["player"])
				{
				coll=true;
				}
				
				
				}
			}
					
					
				for(var i=2;i<players.length;i++)
				{
			 var distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
			 var distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
				
			  
				
				
				
			 if(distancex<=28&&distancey<=28)
				{
				if(data["player"]==players[1]["player"]||data["player"]==players[i]["player"])
				{
				coll=true;
				}
				
				
				}
			}

					
						for(var i=1;i<players.length;i++)
				{
			 var distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
			 var distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
				
			  
				
				
				
			 if(distancex<=28&&distancey<=28)
				{
				if(data["player"]==players[0]["player"]||data["player"]==players[i]["player"])
				{
				coll=true;
				}
				
				
				}
			}
			  for(var i=0;i<chires.length;i++)
				{
			 var distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
			 var distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
				
			  
				
				
				
			 if(distancex<=26&&distancey<=26)
				{
				
				
				coll=true;
				}
			}
					
				
					
					
					if(coll||players[tmp]["x"]<=5||players[tmp]["y"]<57&&players[tmp]["x"]<64||players[tmp]["y"]>710&&players[tmp]["x"]<60)
					{
						players[tmp]["x"] += 5;
					
					}
				}
				
				else if(data["dir"] == "right")
				{
					players[tmp]["x"] += 5;
					
						 for(var i=3;i<players.length;i++)
				{
			 var distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
			 var distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
				
			  
				
				
				
			 if(distancex<=28&&distancey<=28)
				{
					if(data["player"]==players[2]["player"]||data["player"]==players[i]["player"])
					{
						colr=true;	
					}
				
				
				}
			}
					
					
				 for(var i=2;i<players.length;i++)
				{
			 var distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
			 var distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
				
			  
				
				
				
			 if(distancex<=28&&distancey<=28)
				{
					if(data["player"]==players[1]["player"]||data["player"]==players[i]["player"])
					{
						colr=true;
					}
				
				
				}
			}
			  for(var i=0;i<chires.length;i++)
				{
			 var distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
			 var distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
				
			  
				
				
				
			 if(distancex<=26&&distancey<=26)
				{
				  colr=true;
				}
			}


				for(var i=1;i<players.length;i++)
				{
			 var distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
			 var distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
				
			  
				
				
				
			 if(distancex<=28&&distancey<=28)
				{
						if(data["player"]==players[0]["player"]||data["player"]==players[i]["player"])
						{
						   colr=true;
						}
				
				
				}
			}

					
			  

				   if(players[tmp]["x"]==766||players[tmp]["y"]<60&&players[tmp]["x"]>709||players[tmp]["x"]>710&&players[tmp]["y"]>710)
				   {
					
						colr=true;
					}
					
					
					
				 if(colr||players[tmp]["x"]==766||players[tmp]["y"]<60&&players[tmp]["x"]>709||players[tmp]["x"]>710&&players[tmp]["y"]>710)
					{
						players[tmp]["x"] -= 5;
					}

			
			
			
			}
			 
			
		io.sockets.emit("someOneMove", players[tmp]);
		col=false;
		colr=false;
		coll=false;
		colu=false;
		players[tmp]["caxs"]=true;
		}
		
		
	}
});	
function gen()
{
for(var lm in players)
{
if(players[lm]["value"]<=496)
{
players[lm]["value"]+=4;
}
 else if(players[lm]["value"]>496)
{
var tar=500-players[lm]["value"];
players[lm]["value"]+=tar
}
if(players[lm]["value"]==500)
{
players[lm]["value"]+=0;
}
io.sockets.emit("gen",players[lm]);



}
}
						
	});