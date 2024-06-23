function main(){
	function resizecanvas(){
		Width= window.innerWidth;
		Height=window.innerHeight;
		  if(Height>Width*576/1024){Height=Width*576/1024;canvas.style.left = "0px";canvas.style.top = (window.innerHeight-Height)/2+"px";decalage=0;wdecalagey=(window.innerHeight-Height)/2;}
		  else if(Width*576/1024>Height){Width=Height/576*1024;canvas.style.left = (window.innerWidth-Width)/2+"px";decalage=(window.innerWidth-Width)/2; canvas.style.top = "0px";wdecalagey=0;}
		  canvas.style.width  = Width+'px';
		  canvas.style.height  = Height+'px';
	}

	function touchesblock(n,x,y){
		return (collisions[n][Math.floor(x+0.5)][Math.floor(y+0.5)]=='#');
	}

	class Object{
		constructor(type,x,y,id, player, effect, category, color){
			this.type = type;
			this.x = x;
			this.y = y;
			this.id = id;
			this.player = player;
			this.effect = effect;
			this.color = color;
			this.animation = 0;
			this.state = 0;
			this.category = category;
			if(this.type=="door" || this.type=="look_door"){
				if(this.state==1){collisions[this.player][this.x][this.y]='.';}
				else{collisions[this.player][this.x][this.y]='#';}
			}
		}

		activate(){
			switch(this.type){
				case "light" :
					this.state = (this.state+1)%2;
					break;
				case "door":
				case "look_door":
					this.state = (this.state+1)%2;
					if(this.state==1){collisions[this.player][this.x][this.y]='.';}
					else{collisions[this.player][this.x][this.y]='#';}
					break;
			}
		}

		interact(player){
			switch(this.type){
				case "levier" :
					this.state = (this.state+1)%2;
					tryactivateall(this.effect);
					break;
			}
		}

		try_to_interact(player){
			if((this.x-player.x)**2+(this.y-player.y)**2<=0.5){this.interact(player);}
		}

		pick(player)    {
		    console.assert(player.inventaire==null);
		    player.inventaire = this;
		}

    	try_to_pick(player){
			if(player.inventaire==null && (this.x-player.x)**2+(this.y-player.y)**2<=0.5){this.pick(player);return true;}
			return false;
		}

		try_to_use(player)  {
		    switch (player.inventaire.category)   {
		        case null:
		            return false;
		            break;
                case "key":
                    for(var i=0; i<objects[player.n].length; i++){
                        if (objects[player.n][i].type == "look_door" && objects[player.n][i].state==0 && (objects[player.n][i].x-player.x)**2 + (objects[player.n][i].y-player.y)**2 <= 0.8) {
                            player.inventaire == null;
                            objects[player.n][i].activate();
                        }
                    }   
                    break;
            }
            return (player.inventaire != null);
        }
    
		    


		afficher(){
			let x = centers[this.player][0]+(this.x-camerax[this.player])*block_size;
			let y = centers[this.player][1]+(this.y-cameray[this.player])*block_size;
			if(x-block_size/2-5>centers[this.player][0]+realvisonrange/2){return;}
			switch(this.type){
				case "levier" :
					ctx.strokeStyle = this.color;
					ctx.beginPath();
					ctx.moveTo(x-20+40*this.state, y-10);
					ctx.lineTo(x, y+10);
					ctx.stroke();
					break;
				case "light" :
					if(this.state==0){ctx.fillStyle = "gray";}
					else{ctx.fillStyle = "yellow";}
					ctx.beginPath();
					ctx.arc(x, y, 20, 0, 2 * Math.PI);
					ctx.fill();
					break;
				case "door" :
					if(this.state==0){
						ctx.fillStyle = this.color;
						ctx.fillRect(x-block_size/2,y-block_size/2,block_size,block_size);
					}
					else{
						ctx.strokeStyle = this.color;
						ctx.strokeRect(x-block_size/2,y-block_size/2,block_size,block_size);
					}
					break;
				case "exit" :
					this.animation = (this.animation+1)%511;
					var a = Math.abs(this.animation-255);
					ctx.fillStyle = "rgb("+a+","+a+","+a+")";
					ctx.beginPath();
					ctx.arc(x, y, 25, 0, 2 * Math.PI);
					ctx.fill();
					var j;
					if(this.player==0){j=j1;}
					else{j=j2;}
					if((this.x-j.x)**2+(this.y-j.y)**2<=0.5){j.is_on_portal=true;}
					else{j.is_on_portal=false;}
					break;
				case "look_door":
					if(this.state==0){
						ctx.fillStyle = this.color;
						ctx.fillRect(x-block_size/2,y-block_size/2,block_size,block_size);
					}
					else{
						ctx.strokeStyle = this.color;
						ctx.strokeRect(x-block_size/2,y-block_size/2,block_size,block_size);
					}
				    break;
				case "item":
					ctx.fillStyle = this.color;
					ctx.fillRect(x-block_size/2,y-block_size/2,block_size,block_size);
    				break;
			}
		}
	}


	function tryactivateall(id_list){
		for(var player=0; player<2; player++){
			for(var i=0; i<objects[player].length; i++){
				if(id_list.includes(objects[player][i].id)){objects[player][i].activate()}
			}
		}
	}


	class Joueur{
		constructor(x,y,n){
			this.x = x; this.y = y; this.n = n;
			this.gauche=0;this.droite=0;this.bas=0;this.haut=0;this.espace=0;this.item=0;
			this.vitesse = 0.1;
			this.is_on_portal = false;
			this.inventaire=null;
		}

		reset(x,y){
			this.x = x; this.y = y;
			this.is_on_portal = false;
		}

		touchesblock(){
			return touchesblock(this.n,this.x+player_size/block_size/2,this.y+player_size/block_size/2) || touchesblock(this.n,this.x-player_size/block_size/2,this.y+player_size/block_size/2)
				|| touchesblock(this.n,this.x+player_size/block_size/2,this.y-player_size/block_size/2) || touchesblock(this.n,this.x-player_size/block_size/2,this.y-player_size/block_size/2);
		}
		
		try_to_move(movx,movy){
			this.x+=movx;
			this.y+=movy;
			if(this.touchesblock()){
				this.x-=movx;
				this.y-=movy;
			}
		}
		loop(){
			if(this.gauche){this.try_to_move(-this.vitesse,0);}
			else if(this.droite){this.try_to_move(this.vitesse,0);}
			if(this.haut){this.try_to_move(0,-this.vitesse);}
			else if(this.bas){this.try_to_move(0,this.vitesse);}
			if(this.espace==1){
				this.espace=2;
				for(var i=0; i<objects[this.n].length; i++){
					objects[this.n][i].try_to_interact(this);
				}
				if (this.inventaire != null)    {
				    alert("essaye");
				    this.inventaire.try_to_use(this);
                }

			}
			if(this.item==1){
			    this.item==2;
			    if (this.inventaire==null)  {
			        for(var i=0; i<objects[this.n].length; i++){
			            if (objects[this.n][i].type == "item" && objects[this.n][i].try_to_pick(this)) {
			                objects[this.n].splice(i, 1);
			                break;
			            }
			        }
			    }
			}
			camerax[this.n] = Math.min(Math.max(this.x,vision_range-1.5),map.obstacles[this.n].length-vision_range);
			cameray[this.n] = Math.min(Math.max(this.y,vision_range-2),map.obstacles[this.n][0].length-vision_range+1);
		}
		afficher(){
			ctx.fillStyle = "blue";
			ctx.fillRect(centers[this.n][0]+(this.x-camerax[this.n])*block_size-player_size/2, centers[this.n][1]+(this.y-cameray[this.n])*block_size-player_size/2, player_size, player_size);
		}
	}

	function afficherplayer(player){
		for(var i=-vision_range+1;i<=vision_range;i++){
			for(var j=-vision_range+1;j<=vision_range;j++){
				let x = centers[player][0]+(Math.round(camerax[player])+i-camerax[player])*block_size-block_size/2;
				let y = centers[player][1]+(Math.round(cameray[player])+j-cameray[player])*block_size-block_size/2;
				let w = Math.min(block_size+1,centers[player][0]+realvisonrange/2-x+block_size/2);
				if(w<=0){}
				else if(Math.round(camerax[player])+i<0 || Math.round(cameray[player])+j<0 || Math.round(camerax[player])+i>=niveaux[player].length){
					if (player==0){
						ctx.fillStyle = "white";
					}
					else{
						ctx.fillStyle = "black";
					}
					ctx.fillRect(x,y,w,block_size+1);
				}
				else if(niveaux[player][Math.round(camerax[player])+i][Math.round(cameray[player])+j]=='#'){
					ctx.fillStyle = "brown";
					ctx.fillRect(x,y,w,block_size+1)
				}
				else{
					if (player==0){
						ctx.fillStyle = "white";
					}
					else{
						ctx.fillStyle = "black";
					}
					ctx.fillRect(x,y,w,block_size+1);
				}
			}
		}
		for(var i=0; i<objects[player].length; i++){
			objects[player][i].afficher();
		}
		if(player==0){j1.afficher();}
		else{j2.afficher();}
	}

	function loadmap(fmap){
		map = read_map(fmap);
		niveaux = map.obstacles;
		collisions = JSON.parse(JSON.stringify(map.obstacles));
		objects = [[],[]];
		for (let i_object = 0; i_object < map.objects.length; i_object++)  {
			objects[map.objects[i_object].player].push(new Object(map.objects[i_object].type,map.objects[i_object].x, map.objects[i_object].y, map.objects[i_object].id, map.objects[i_object].player,map.objects[i_object].effect,map.objects[i_object].category,map.objects[i_object].color))
		}
		j1.reset( map.spawn[0].x,map.spawn[0].y); j2.reset(map.spawn[1].x,map.spawn[1].y);
	}



	function affichtt(){
		for (var player=0; player<2; player++){
			afficherplayer(player);
		}
		
		ctx.fillStyle = "gray";
		ctx.fillRect(0,0,1024,64);
		ctx.fillRect(0,576-64,1024,64);
		ctx.fillRect(0,0,12,576);
		ctx.fillRect(1024-12,0,12,576);
		ctx.fillRect(500,0,24,576);
		
		for (let id_player=0; id_player<2; id_player++){
		    let player = [j1,j2][id_player];
			if (player.inventaire!=null)    {
		        ctx.fillStyle = "black";

		        if (id_player == 0)
        		    ctx.fillRect(1024-60,576-60,1024,576);
        	    else
        		    ctx.fillRect(0,576-60,60,576);

        	}
		}
	
	}
	
	function loop(){
		resizecanvas();
		j1.loop();
		j2.loop();
		affichtt();
		if(j1.is_on_portal && j2.is_on_portal){
			currentlevel = (currentlevel+1)%list_niveaux.length;
			gamefreeze=20;
			loadmap(list_niveaux[currentlevel]);
		}
	}

	function globalloop(){
		setTimeout(globalloop,frame_delay);
		if(gamefreeze){gamefreeze--;return;}
		functiontoexecute();
	}

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.style.left = "0px";
	canvas.style.top = "0px";
	canvas.style.position = "absolute";
	ctx.font = "40px Arial";
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	var frame_delay = 16;
	var decalage = 0; var wdecalagey = 0;
	var camerax = [5,5]; var cameray = [4,4];
	var vision_range = 5; var block_size = 64; var realvisonrange = 448;
	var centers = [[768,288],[256,288]];
	var player_size = 20;
	var gamefreeze = 0;

	var niveaux = [];

	var controls = ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","KeyL","Semicolon","Enter","KeyD","KeyA","KeyW","KeyS","Digit1","Digit2"];

	j1 = new Joueur(5,5,0);
	j2 = new Joueur(5,5,1);


	function logKey(e) {
		if(e.code==controls[0]&&j1.droite==0){j1.droite=1;}
		if(e.code==controls[1]&&j1.gauche==0){j1.gauche=1}
		if(e.code==controls[2]&&j1.haut==0){j1.haut=1}
		if(e.code==controls[3]&&j1.bas==0){j1.bas=1}
		if(e.code==controls[4]&&j1.espace==0){j1.espace=1}
		if(e.code==controls[5]&&j1.item==0){j1.item=1}
		if(e.code==controls[6]&&start==0){start=1}
		if(e.code==controls[7]&&j2.droite==0){j2.droite=1}
		if(e.code==controls[8]&&j2.gauche==0){j2.gauche=1}
		if(e.code==controls[9]&&j2.haut==0){j2.haut=1}
		if(e.code==controls[10]&&j2.bas==0){j2.bas=1}
		if(e.code==controls[11]&&j2.espace==0){j2.espace=1}
		if(e.code==controls[12]&&j2.item==0){j2.item=1}
		key=e.code;
	}
	function unlogKey(e){
		if(e.code==controls[0]){j1.droite=0;}
		else if(e.code==controls[1]){j1.gauche=0}
		else if(e.code==controls[2]){j1.haut=0}
		else if(e.code==controls[3]){j1.bas=0}
		else if(e.code==controls[4]){j1.espace=0}
		else if(e.code==controls[5]){j1.item=0}
		else if(e.code==controls[6]){start=0}
		if(e.code==controls[7]){j2.droite=0}
		if(e.code==controls[8]){j2.gauche=0}
		if(e.code==controls[9]){j2.haut=0}
		if(e.code==controls[10]){j2.bas=0}
		if(e.code==controls[11]){j2.espace=0}
		if(e.code==controls[12]){j2.item=0}
	}
	function clickEvent(e){
		clickx=(e.pageX-decalage)/Width;clicky=e.pageY/Height;click=1;
	}
	function unclickEvent(e){
		click=0;
	}
	function touchstart(evt){
		evt.preventDefault();
		var touches = evt.changedTouches;
		if(touches.length>=1){alert(Width);clickx=(touches[0].pageX-decalage)/Width;clicky=touches[0].pageY/Height;click=1;}
		for (var i=0; i<touches.length; i++) {
			ongoingTouches.push(touches[i]);
			if(entre(touches[i].pageX,0.05,0.15)){gauche=1;}
			else if(entre(touches[i].pageX,0.16,0.26)){droite=1}
			else if(entre(touches[i].pageX,0.88,0.98)){espace=1}
			else if(entre(touches[i].pageX,0.76,0.86)){haut=1}
			else if(entre(touches[i].pageX,0.64,0.74)){item=1}
		}
	}
	document.addEventListener('keydown', logKey);
	document.addEventListener('keyup', unlogKey);
	document.addEventListener("mousedown", clickEvent);
	document.addEventListener("mouseup", unclickEvent);

	var map;
	var niveaux;
	var collisions;
	var objects = [[],[]];
	var list_niveaux = [map0,map1,map2,map3];
	var currentlevel = 3;
	loadmap(list_niveaux[currentlevel]);

	var functiontoexecute = loop;
	globalloop();
}
