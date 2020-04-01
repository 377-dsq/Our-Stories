//create verification code
function createCode(){
	var code="", codelength=4;
	var coderange=new Array(1,2,3,4,5,6,7,8,9,0,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
	for (var i = 0; i < codelength; i++) {
		var codeindex=Math.floor(Math.random()*36);
		code+=coderange[codeindex];
	};
	var codebox=document.getElementById('code');
	codebox.value=code;
	codebox.onclick=createCode;
}

//检查验证码是否输入以及是否输入正确
function checkCode(){
	var code=document.getElementById('code');
	code.onclick=createCode;
	var validate=document.getElementById('validate');
	var validatecode=document.getElementById('validatecode');
	validate.onclick=function(){
		var msg;
		var info=this.parentNode.parentNode.nextSibling.lastChild.firstChild;
		if (validatecode.value=="") {
			msg="请输入验证码";
			validatecode.classname="error";
			error(info,msg);
			return false;
		};
		if (validatecode.value!=code.value) {
			msg="验证码输入错误，请重新输入";
			error(info,msg);
			return false;
		}
		else{
			msg="验证通过"
			success(info,msg);
			return true;
		};
	}
}

//检查表格元素是否输入以及是否输入正确
function checkForm(){
	var inputs=document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onblur=checkRules;
	}
}

function checkRules(){
	var datatype=this.getAttribute("datatype");//自定义属性只能通过getAttribute()获取；
	var value=this.value;
	var info=this.parentNode.parentNode.nextSibling.lastChild.firstChild;
	//通过if语句选出需要进行正则验证的元素，
	if (datatype) {
		var reg,msg;
		//reg记录每个输入的正则表达式，msg记录如果错误则出现的信息；
		switch(datatype){
			case "username":
			reg=/^[a-zA-Z]{4,12}$/;
			msg="请输入正确的用户名";
			break;
			case "password":
			reg=/^\w{6,20}$/;
			msg="请输入6~20个大小写字母，数字或下划线";
			break;
			case "year":
			reg=/^(19)|(20)\d{2}$/;
			msg="请输入正确的年份";
			break;
			case "month":
			reg=/^(0?[1-9])|(1[012])$/;
			msg="请输入正确的月份";
			break;
			case "day":
			reg=/^(0?[1-9])|([12]\d)|(3[01])$/;
			msg="请输入正确的日期";
			break;
			case "tel":
			reg=/^1[1356789]\d{9}$/;
			msg="请输入11位手机号";
			break;
			case "email":
			reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			msg="请输入正确的邮箱地址";
			break;
			default:
			reg=/./
			break;
		}
		//测试正则表达式；
		if (!reg.test(value)){
			error(info,msg);
			return false;
		}
		else{
			msg="";
			success(info,msg);
			return true;
		}
	}
	//检查两次密码是否一致
	if (this.id=="password2") {
		//检查是否确认密码
		if (value=="") {
			msg="请再次输入密码";
			error(info,msg);
			return false;
		}
		//检查两次密码是否一致
		var psw=document.getElementById("password");
		if (value==psw.value) {
			msg="";
			success(info,msg);
			return true;
		}
		else{
			msg="两次密码输入不一致，请重新输入";
			error(info,msg);
			return false;
		}
	}
}

//检查单选框是否输入
function checkRadio(){
	var gender=document.getElementsByName('gender');
	var num=0;
	var msg="";
	var info=gender[0].parentNode.parentNode.nextSibling.lastChild.firstChild;
	for (var i = 0; i < gender.length; i++) {
		if (gender[i].value) {
			num++;
		}
	}
	if (num!=0) {
		success(info,msg);
		return true;
	}
	else{
		msg="请选择性别";
		error(info,msg);
		return false;
	}
}


function error(obj,msg){
	obj.className="error";
	obj.innerHTML="<img src='images/error.svg' width='13px' height='13px'>"+" "+msg;
}
function success(obj,msg){
	obj.innerHTML="<img src='images/right.svg' width='13px' height='13px'>"+" "+msg;
}


addLoadEvent(createCode);
addLoadEvent(checkCode);
addLoadEvent(checkForm);
addLoadEvent(submitForm);

