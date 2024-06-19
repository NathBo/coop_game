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
		return (niveaux[n][Math.floor(x+0.5)][Math.floor(y+0.5)]=='#');
	}


	class Joueur{
		constructor(x,y,n){
			this.x = x; this.y = y; this.n = n;
			this.gauche=0;this.droite=0;this.bas=0;this.haut=0;this.espace=0;this.item=0;
			this.vitesse = 0.1;
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
		if(player==0){j1.afficher();}
		else{j2.afficher();}
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
	}
	
	function loop(){
		resizecanvas();
		j1.loop();
		j2.loop();
		affichtt();
	}

	function globalloop(){
		setTimeout(globalloop,frame_delay);
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

	var niveaux = [];

	var controls = ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","KeyL","Semicolon","Enter","KeyD","KeyA","KeyW","KeyS","KeyR","KeyT"];

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

	var map = read_map(map1);
	var niveaux = map.obstacles;

	var functiontoexecute = loop;
	globalloop();
}
