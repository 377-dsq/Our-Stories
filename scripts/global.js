function addLoadEvent(func){
	var oldEvent=window.onload;
	if (typeof window.onload !="function") {
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldEvent();
			func();
		}
	}
}



