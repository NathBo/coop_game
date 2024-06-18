function main(){
	function resizecanvas(){
		Width= window.innerWidth;
		Height=window.innerHeight;
		  if(Height>Width*500/1024){Height=Width*500/1024;canvas.style.left = "0px";canvas.style.top = (window.innerHeight-Height)/2+"px";decalage=0;wdecalagey=(window.innerHeight-Height)/2;}
		  else if(Width*500/1024>Height){Width=Height/500*1024;canvas.style.left = (window.innerWidth-Width)/2+"px";decalage=(window.innerWidth-Width)/2; canvas.style.top = "0px";wdecalagey=0;}
		  canvas.style.width  = Width+'px';
		  canvas.style.height  = Height+'px';
	}

	function affichtt(){

	}
	
	function loop(){
		resizecanvas();
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