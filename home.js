function main(){
	function resizecanvas(){
		Width= window.innerWidth;
		Height=window.innerHeight;
		  if(Height>Width*576/1024){Height=Width*576/1024;canvas.style.left = "0px";canvas.style.top = (window.innerHeight-Height)/2+"px";decalage=0;wdecalagey=(window.innerHeight-Height)/2;}
		  else if(Width*576/1024>Height){Width=Height/576*1024;canvas.style.left = (window.innerWidth-Width)/2+"px";decalage=(window.innerWidth-Width)/2; canvas.style.top = "0px";wdecalagey=0;}
		  canvas.style.width  = Width+'px';
		  canvas.style.height  = Height+'px';
	}

	function affichtt(){
		for (var player=1; player>=0; player--){
			for(var i=-vision_range+1;i<=vision_range;i++){
				for(var j=-vision_range+1;j<=vision_range;j++){
					let x = centers[player][0]+(Math.round(camerax)+i-camerax)*block_size-block_size/2;
					let y = centers[player][1]+(Math.round(cameray)+j-cameray)*block_size-block_size/2;
					let w = Math.min(block_size+1,centers[player][0]+realvisonrange/2-x+block_size/2);
					if(w<=0){}
					else if(Math.floor(camerax)+i<0 || Math.round(cameray)+j<0){
						ctx.fillStyle = "black";
						ctx.fillRect(x,y,w,block_size+1);
					}
					else if(niveaux[player][Math.round(camerax)+i][Math.round(cameray)+j]=='1'){
						ctx.fillStyle = "brown";
						console.log(i,j,centers[player][0]+realvisonrange/2-x)
						ctx.fillRect(x,y,w,block_size+1)
					}
					else{
						ctx.fillStyle = "black";
						console.log(i,j,centers[player][0]+realvisonrange/2-x);
						ctx.fillRect(x,y,w,block_size+1);
					}
				}
			}
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
		if(gauche){camerax-=0.1;}
		if(droite){camerax+=0.1;}
		if(haut){cameray-=0.1;}
		if(bas){cameray+=0.1;}
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
	var camerax = 5; var cameray = 4;
	var vision_range = 5; var block_size = 64; var realvisonrange = 448;
	var centers = [[256,234],[768,234]];
	var niveau0 = ["000000000000000",
				   "110111111110001",
				   "001100011100001",
				   "110110001000001",
				   "110110001000001",
				   "110100101000001",
				   "110110001000001",
				   "110110001000001",
				   "001100011100001",
				   "001100011100001",
				   "001100011100001",
				   "110110001000001",
				   "001100011100001",
				   "001100011100001",
				   "001100011100001"
	]

	var niveau1 = niveau0;

	var niveaux = [niveau0,niveau1];

	var controls = ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","KeyL","Semicolon","KeyD","KeyA","KeyW","KeyS","KeyR","KeyT"];

	var gauche=0; var droite = 0; var haut = 0; var bas = 0;	


	function logKey(e) {
		if(e.code==controls[0]&&droite==0){droite=1}
		if(e.code==controls[1]&&gauche==0){gauche=1}
		if(e.code==controls[2]&&haut==0){haut=1}
		if(e.code==controls[3]&&bas==0){bas=1}
		if(e.code==controls[4]&&espace==0){espace=1}
		if(e.code==controls[5]&&item==0){item=1}
		if(e.code==controls[6]&&start==0){start=1}
		if(e.code==controls[7]&&droite2==0){droite2=1}
		if(e.code==controls[8]&&gauche2==0){gauche2=1}
		if(e.code==controls[9]&&haut2==0){haut2=1}
		if(e.code==controls[10]&&bas2==0){bas2=1}
		if(e.code==controls[11]&&espace2==0){espace2=1}
		if(e.code==controls[12]&&item2==0){item2=1}
		key=e.code;
	}
	function unlogKey(e){
		if(e.code==controls[0]){droite=0}
		else if(e.code==controls[1]){gauche=0}
		else if(e.code==controls[2]){haut=0}
		else if(e.code==controls[3]){bas=0}
		else if(e.code==controls[4]){espace=0}
		else if(e.code==controls[5]){item=0}
		else if(e.code==controls[6]){start=0}
		if(e.code==controls[7]){droite2=0}
		if(e.code==controls[8]){gauche2=0}
		if(e.code==controls[9]){haut2=0}
		if(e.code==controls[10]){bas2=0}
		if(e.code==controls[11]){espace2=0}
		if(e.code==controls[12]){item2=0}
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

	var functiontoexecute = loop;
	globalloop();
}