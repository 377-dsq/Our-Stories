function checkLoad(){
	var oriCode=document.getElementById('code');
	var inputCode=document.getElementById('check');
	var info=inputCode.parentNode.parentNode.nextSibling.firstChild;
	if (inputCode.value.toLowerCase()!=oriCode.value.toLowerCase()) {
		info.innerHTML="验证码输入错误";
		info.className="error";
	}
	else{
		info.innerHTML='';
	}
}

//用于产生验证码
function createCode(){
	var code=document.getElementById('code');
	var code_range=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var code_length=4;
	var code_value='';
	for (var i = 0; i < code_length; i++) {
		var range_index=Math.floor(Math.random()*code_range.length);
		code_value+=code_range[range_index];
	}
	code.value=code_value;
	code.onclick=createCode;
}
addLoadEvent(createCode);