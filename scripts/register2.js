

validator={
	//属性主要是表单验证的规则和函数
	//函数不能和属性同名
	username:/^[a-zA-Z]{4,12}$/,
	password:/^\w{6,20}$/,
	repeat:"value.toLowerCase()==document.getElementsByName(getAttribute('to'))[0].value.toLowerCase()&&value!=''",
	group:"this.mustChecked(getAttribute('name'))",
	groups:"this.mustCheckedAll(getAttribute('name'))",
	tel:/^1[356789]\d{9}$/,
	email:/^[a-zA-Z0-9]+([_-]*\w)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	year:/^((19[3-9]\d)|(20[01]]\d))$/,
	month:/^((0?[1-9])|(1[012]))$/,
	day:/^((0?[1-9])|([12]\d)|(3[01]))$/,
	errorItem:[document.forms[0]],//错误的表单项放入errorItem数组中
	errorMessage:["input error:"],//错误提示信息放入errorMessage中
	//用于验证表单项是否符合要求
	validate: function(elem){
			with(elem){
				var datatype=getAttribute('datatype');
				var msg=getAttribute('msg'); 
				if (datatype) {
				switch (datatype){//确定是哪一个表单项
					case 'username':
					case 'password':
					case 'tel':
					case 'email':
					case 'year':
					case 'month':
					//如果是以上几个表单项的话，进行正则表达式验证，确保可以符合规则
					     if (!this[datatype].test(value)){
					     	this.addError(elem,msg);
					     }
					     else{
					     	this.success(elem);
					     }
					     break;
					case 'repeat':
					case 'group':
					//如果是需要进行确认的表单项或是单选项，则处理以下函数。
					     if (!eval(this[datatype])){
					     	this.addError(elem,msg);
					     }
					     else {
					     	this.success(elem);
					     }
					     break;
					case 'groups':
					//如果是一行中有多个input项，则进行正则表达式验证以及空值验证。
					     if (!eval(this[datatype])||!this[id].test(value)){
					     	this.addError(elem,msg);
					     }
					     else {
					     	this.success(elem);
					     }
					     break;
					 }
					}
				}
		},
		//单选项的验证
	mustChecked: function(name){
		var names=document.getElementsByName(name);
		var checked=0;
		for (var i = 0; i < names.length; i++) {
			if (names[i].checked) {
				checked++;
			}
		}
		return checked;
		},
		//一行中有多个input项的空值验证
	mustCheckedAll: function(name){
		var names=document.getElementsByName(name);
		var checked=0
		for (var i = 0; i < names.length; i++) {
			if (names[i].value) {
				checked++
			}
		}
		return checked==names.length;
	},
	//存在错误则在表单项下方显示错误的信息，将错误项和错误信息传入数组中。
	addError: function(elem,msg){
		var info_node=elem.parentNode.parentNode.nextSibling.lastChild.firstChild;
		info_node.className="error";
		msg="<img width='10px' height='10px' src='images/error.svg'>"+" "+msg;
		info_node.innerHTML=msg;
		this.errorMessage[this.errorMessage.length]=msg;
		this.errorItem[this.errorItem.length]=elem;
	},
	//正确的话，在表单项下方显示绿色对号
	success: function(elem){
		var info_node=elem.parentNode.parentNode.nextSibling.lastChild.firstChild;
		info_node.innerHTML="<img width='15px' height='15px' src='images/right.svg'>";
		return true;
	},

	
}

//提交的时候对所有表单项验证，如果验证通过则弹出协议栏，确认协议则通过。
function checkform(){
	var form=document.getElementById('check');
	form.onsubmit=function(){
		validator.errorItem.length=1;
		validator.errorMessage.length=1;
		for (var i = 0; i <form.elements.length; i++) {
		var elem=form.elements[i];
		validator.validate(elem);
	}
	var protocol=document.getElementById('protocol');
	if (validator.errorItem.length>1) {
		validator.errorItem[1].focus();
		return false;
	}
	else{
		var protocol=document.getElementById('protocol');
		if (!protocol.checked) {
			show();
			return false;
		};
		alert('注册成功！');
		return true;
	}
}
}

//每个表单项在失去焦点的时候进行验证
function checkBlur(){
	var form=document.getElementById('check');
	for (var i = 0; i < form.elements.length; i++) {
		var elem=form.elements[i];
		elem.onblur=function(){
			validator.validate(this);//这里只能是this，不能使elem
		}
	}
}

function show(){
	var div1=document.getElementById('div1');
	div1.style.display="inline";
	div1.style.width='100%'
	div1.style.height='100%';
	div2.style.display="inline";
}
function justClose(){
	div1.style.display='none';
	div2.style.display='none';
	var protocol=document.getElementById('protocol');
	alert('请确认协议');
}
function closeAndCheck(){
	div1.style.display='none';
	div2.style.display='none';
	var protocol=document.getElementById('protocol');
	protocol.checked='checked';
}


addLoadEvent(checkform);//form提交的时候进行验证
addLoadEvent(checkBlur);//表单项失去焦点的时候进行验证