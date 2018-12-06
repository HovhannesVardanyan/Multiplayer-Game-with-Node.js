const golds=[];
const bats=[];
let col=false;
let colr=false;
let coll=false;
let colu=false;
const stones=[];
const sckt = [];
const players = [];
const chires=[];
let tru = true;
let player;
const fogs = [null,[],[],[],[]];
let hat=0;
let hert=0;
const chores=[];
const chures=[];
const red={
	"side":"red",
	"x":0,
	"y":0
};
const green={
	"side":"green",
	"x":736,
	"y":0
};
const yellow={
	"side":"yellow",
	"x":0,
	"y":736
};
const blue={
	"side":"blue",
	"x":736,
	"y":736
};
const englishToIndex = {
	"first" : "1",
	"second" : "2",
	"third" : "3",
	"fourth" : "4"
};
for(let k=0;k<8;k++) {
	for(let m=0;m<8;m++) {
		let x=k*100;
		let y=m*100;
		let fog={
			"x":x,
			"y":y,
			"hat":hat,
			"hert":"first"
		};
		fogs[1].push(fog);
		fogs[2].push(fog);
		fogs[3].push(fog);
		fogs[4].push(fog);
		++hat;
	}
}

fogs[1].splice(0,1);
fogs[3].splice(7,1);
fogs[2].splice(56,1);
fogs[4].splice(63,1);
const express=require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io").listen(http);
http.listen(8080);
app.get("/",function(req,res){
	res.sendfile(__dirname +"/index.html");
});
app.use("/gui",express.static(__dirname+ '/gui'));
app.get('/:file',function(req,res,next) {
	if(req.params.file==='gui')
		next();
	else
		res.sendfile(__dirname+"/"+req.params.file);
});
for(let col=4;col<23;col++) {
	for(let row=0;row<25;row++)
	{
		const x=col*32;
		const y=row*32;
		const resource={
			"x":x,
			"y":y,
			"hert":hert
		};
		const power={
			"x":x,
			"y":y,
			"hert":hert
		};
		const obstacle={
			"x":x,
			"y":y,
			"hert":hert
		};
		bats.push(power);
		golds.push(resource);
		stones.push(obstacle);
		++hert;
	}

}
for(let h=0;h<10;h++) {
	const element=Math.floor(Math.random()*400);
	const energy=Math.floor(Math.random()*400);
	const index=Math.floor(Math.random()*400);
	chores.push(golds[element]);
	chures.push(bats[energy]);
	chires.push(stones[index]);

	if(energy===element) {
		chures.splice(h,1);
		chores.splice(h,1);
		h--;
	}
	if(energy===index) {
		chures.splice(h,1);
		chires.splice(h,1);
		h--;
	}
	if(index===element) {
		chires.splice(h,1);
		chores.splice(h,1);
		h--;
	}
}

io.sockets.on('connection', function(socket) {
	if(sckt.length === 4) {
		socket.emit("No place to play");
		return false;
	}
	const check = setInterval(gen,5000);


	io.sockets.emit("basa",red);
	io.sockets.emit("basa",green);
	io.sockets.emit("basa",yellow);
	io.sockets.emit("basa",blue);


	sckt.push(socket.id);
	if(sckt.length===1) {
		hert="red";
		const x=16;
		const y=64;
		player="first";
		socket.emit("1", {
			"name":socket.id,
			"side":hert,
			"player":player,
			"x":x,
			"y":y
		});
		socket.emit("fog1", fogs[1]);
	}
	if(sckt.length===2) {
		hert="green";
		const x=736;
		const y=64;
		player="second"
		socket.emit("2", {
				"name":socket.id,
				"side":hert,
				"player":player,
				"x":x,
				"y":y
		});
		socket.emit("fog2", fogs[2]);
	}
	if(sckt.length===3) {
		hert="yellow";
		const x=16;
		const y=706;
		player="third";
		socket.emit("3", {
			"name":socket.id,
			"side":hert,
			"player":player,
			"x":x,
			"y":y
		});
		socket.emit("fog3", fogs[3]);
	}
	if(sckt.length===4) {
		hert="blue";
		const x=736;
		const y=706;
		player="fourth"
		socket.emit("4", {
			"name":socket.id,
			"side":hert,
			"player":player,
			"x":x,
			"y":y
		});
		socket.emit("fog4", fogs[4]);
		io.sockets.emit("Game Started");
	}
	socket.emit("ente",chures);
	socket.emit("enterThe", chores);
	socket.emit("enter", chires);

	socket.on('newPlayerCreated', function(data) {
		players.push({"id":data["id"], "x":data["x"], "y":data["y"], "side":data["side"], "player":data["player"],"value":data["value"]});
		if(data["player"] === "second") {
			socket.emit("firstPosition",players[0]);
			socket.broadcast.emit("newPlayer", data);
		}

		if(data["player"] === "third") {
			socket.emit("firstPosition",players[0]);
			socket.emit("newPlayer", players[1]);
			socket.broadcast.emit("soc", data);
		}

		if(data["player"] === "fourth") {
			socket.emit("firstPosition",players[0]);
			socket.emit("newPlayer", players[1]);
			socket.emit("soc", players[2]);
			socket.broadcast.emit("joke", data);
		}
	});

	socket.on('move', function(data) {
		for(let tmp in players) {
			if(players[tmp]["player"] === data["player"]) {
				const index = englishToIndex[data['player']];
				for(let k=0;k<fogs[index].length;k++) {
						const distancex=Math.abs(fogs[index][k]["x"]-parseInt(players[tmp]["x"]));
						const distancey=Math.abs(fogs[index][k]["y"]-parseInt(players[tmp]["y"]));
						if(distancex<=135&&distancey<=135) {
							socket.emit("cleanFog",{"hat":fogs[index][k]["hat"],"player":players[tmp]["player"]});
							fogs[index].splice(k,1);
						}
					}

				if(players[tmp]["value"]>=5)
					players[tmp]["value"]-=5;

				if(players[tmp]["value"]<4) {
					col = true;
					colr = true;
					coll = true;
					colu = true;
				}

				for(let h=0;h<chures.length;h++) {
						const distancex=Math.abs(chures[h]["x"]-parseInt(players[tmp]["x"]));
						const distancey=Math.abs(chures[h]["y"]-parseInt(players[tmp]["y"]));

						if(distancex<=28&&distancey<=28) {
							socket.emit("energy",{"hert":chures[h]["hert"],"player":players[tmp]["player"]});
							if(players[tmp]["value"]<=250)
								players[tmp]["value"]+=250;

							else if(players[tmp]["value"]>250) {
								const dif=500-players[tmp]["value"];
								players[tmp]["value"]+=dif;
							}
							socket.broadcast.emit("BatteryStolen",chures[h]);
							chures.splice(h,1);
						}
				}

				if(tru) {
					for(let i=0;i<chores.length;i++) {
						const distancex=Math.abs(chores[i]["x"]-parseInt(players[tmp]["x"]));
						const distancey=Math.abs(chores[i]["y"]-parseInt(players[tmp]["y"]));
						if(distancex<=28&&distancey<=28) {
							//console.log(players[tmp]["player"] + "  hitted  " + chores[i]);
							socket.emit("gold",{"x" : chores[i]['x'], "y" : chores[i]['y'],"player":players[tmp]["player"]});
							socket.broadcast.emit("GoldStolen",chores[i]);
							chores.splice(i,1);
						}
					}
				}

				if(data["dir"] === "down") {
					players[tmp]["y"] += 5;
					for(let i=1;i<players.length;i++) {
						 const distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
						 const distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));

						 if(distancex<=28&&distancey<=28)
							if(data["player"]===players[0]["player"]||data["player"]===players[i]["player"])
								col=true;
					}
					for(let i=2;i<players.length;i++) {
						const distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));

						if(distancex<=28&&distancey<=28)
							if(data["player"]===players[1]["player"]||data["player"]===players[i]["player"])
								col=true;
					}

					for(let i=3;i<players.length;i++) {
						const  distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
						if(distancex<=28&&distancey<=28) {
								if(data["player"]===players[2]["player"]||data["player"]===players[i]["player"])
								col=true;

						}
					}
					for(let i=0;i<chires.length;i++) {
						const distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
						const distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
						if(distancex<=26&&distancey<=26) {
							players[tmp]["y"] += 0;
								col=true;
						}
					}
					if(col||players[tmp]["y"]===766||players[tmp]["y"]===769||players[tmp]["y"]>710&&players[tmp]["x"]<54||
						 players[tmp]["x"]>710&&players[tmp]["y"]>710)
							players[tmp]["y"] -= 5;

				}

				else if(data["dir"] === "up") {
					players[tmp]["y"] -= 5;
					for(let i=3;i<players.length;i++) {
						 const distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
						 const distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
						 if(distancex<=28&&distancey<=28)
								if(data["player"]===players[2]["player"]||data["player"]===players[i]["player"])
									colu=true;
					}

					for(let i=2;i<players.length;i++) {
						const distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
						if(distancex<=28&&distancey<=28)
							if(data["player"]===players[1]["player"]||data["player"]===players[i]["player"])
								colu=true;
					}



					for(let i=1;i<players.length;i++){
						const distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
						if(distancex<=28&&distancey<=28)
							if(data["player"]===players[0]["player"]||data["player"]===players[i]["player"])
								colu=true;
					}


					for(let i=0;i < chires.length;i++) {
						const distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
						const distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));

						if(distancex<=26&&distancey<=26)
							colu=true;

					}

					if(colu||players[tmp]["y"]+data["width"]<=5||players[tmp]["y"]<64&&players[tmp]["x"]<54||
						players[tmp]["y"]<64&&players[tmp]["x"]>713) {

						players[tmp]["y"] += 5;
					}
				}

				else if(data["dir"]==="left") {
					players[tmp]["x"] -= 5;
					for(let i=3;i<players.length;i++) {
						const distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
						if(distancex<=28&&distancey<=28)
							if(data["player"]===players[2]["player"]||data["player"]===players[i]["player"])
								coll=true;
					}


					for(let i=2;i<players.length;i++) {
						const distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
						 if(distancex<=28&&distancey<=28)
							if(data["player"]===players[1]["player"]||data["player"]===players[i]["player"])
								coll=true;
					}

					for(let i=1;i<players.length;i++) {
						const distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
						if(distancex<=28&&distancey<=28)
							if(data["player"]===players[0]["player"]||data["player"]===players[i]["player"])
								coll=true;
					}
					for(let i=0;i<chires.length;i++) {
						const distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
						const distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
						if(distancex<=26&&distancey<=26)
							coll=true;

					}
					if(coll||players[tmp]["x"]<=5||players[tmp]["y"]<57&&players[tmp]["x"]<64||players[tmp]["y"]>710&&players[tmp]["x"]<60)
						players[tmp]["x"] += 5;
				}

				else if(data["dir"] === "right") {
					players[tmp]["x"] += 5;
					for(let i=3;i<players.length;i++) {
						 const distancex=Math.abs(players[2].x-parseInt(players[i]["x"]));
						 const distancey=Math.abs(players[2].y-parseInt(players[i]["y"]));
						 if(distancex<=28&&distancey<=28)
								if(data["player"]===players[2]["player"]||data["player"]===players[i]["player"])
									colr=true;
					}


					for(let i=2;i<players.length;i++) {
						 const distancex=Math.abs(players[1].x-parseInt(players[i]["x"]));
						 const distancey=Math.abs(players[1].y-parseInt(players[i]["y"]));
						 if(distancex<=28&&distancey<=28)
								if(data["player"]===players[1]["player"]||data["player"]===players[i]["player"])
									colr=true;
					}

					for(let i=0;i<chires.length;i++) {
						 const distancex=Math.abs(chires[i].x-parseInt(players[tmp]["x"]));
						 const distancey=Math.abs(chires[i].y-parseInt(players[tmp]["y"]));
						 if(distancex<=26&&distancey<=26)
							 colr=true;

					}
					for(let i=1;i<players.length;i++) {
						const distancex=Math.abs(players[0].x-parseInt(players[i]["x"]));
						const distancey=Math.abs(players[0].y-parseInt(players[i]["y"]));
						if(distancex<=28&&distancey<=28)
								if(data["player"]===players[0]["player"]||data["player"]===players[i]["player"])
								   colr=true;
					}

					if(players[tmp]["x"]===766||players[tmp]["y"]<60&&players[tmp]["x"]>709||players[tmp]["x"]>710&&players[tmp]["y"]>710)
						 colr=true;

					if(colr||players[tmp]["x"]===766||players[tmp]["y"]<60&&players[tmp]["x"]>709||players[tmp]["x"]>710&&players[tmp]["y"]>710)
						players[tmp]["x"] -= 5;

				}
				players[tmp].direction = data['dir'];

				io.sockets.emit("someOneMove", players[tmp]);
				col=false;
				colr=false;
				coll=false;
				colu=false;
				players[tmp]["caxs"]=true;
			}


		}
	});
	function gen() {
		for(const lm in players) {
			if(players[lm]["value"]<=496)
				players[lm]["value"]+=4;
			else if(players[lm]["value"]>496) {
				const tar=500-players[lm]["value"];
				players[lm]["value"]+=tar
			}
			if(players[lm]["value"]===500)
				players[lm]["value"]+=0;

			io.sockets.emit("gen",players[lm]);
		}
	}
});