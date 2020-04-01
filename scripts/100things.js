//点击卡片上的按钮可以删除卡片
function deleteCard (){   
	var del=document.getElementsByClassName('delete')
	for (var i = 0; i < del.length; i++) {
		del[i].onclick=function(){
			var card=this.parentNode.parentNode.parentNode;
			card.parentNode.removeChild(card);
			addHeart();
		}
	}
}

//完成一件小事会产生的效果
function complete(){     
	var girls=document.getElementsByClassName('girl');
	for (var i = 0; i < girls.length; i++) {
		var boy=girls[i].nextSibling;
		girls[i].gclick=0;  //gclick中记录了每个girl标签点击的次数
		boy.bclick=0;     //bclick中记录了每个boy标签点击的次数
		girls[i].onclick=function(){
			var address=this.parentNode.previousSibling.firstChild;   //地址输入的框
			var date=address.parentNode.previousSibling.firstChild;   //时间输入的框
			if (address.value==""||date.value=='') {   //如果没有时间或者日期，则弹出框
				alert("记录下完成的时间和地点吧~")
				return false;
			};
			this.gclick++;
			if (this.gclick%2!=0) {this.style.boxShadow='0 0 2px 2px green';}  //girl标签点击一次变绿，再点击变红色，再点击又变绿
			else{this.style.boxShadow='0 0 2px 2px red'; }
			comThing(this);   //检查是否这个小事已经完成，或是完成了一半
		}
		boy.onclick=function(){  //效果同上
			var address=this.parentNode.previousSibling.firstChild;
			var date=address.parentNode.previousSibling.firstChild;
			if (address.value==""||date.value=='') {
				alert("记录下完成的时间和地点吧~")
				return false;
			};
			this.bclick++;
			if (this.bclick%2!=0) {this.style.boxShadow='0 0 2px 2px green';}
			else{this.style.boxShadow='0 0 2px 2px red'; }
			comThing(this.previousSibling);
		}
	}
}

//检查是否两人都同意这件小事已经完成
function comThing(node){  
		var boy=node.nextSibling;
		var back=node.parentNode.parentNode.parentNode;
		var front=back.previousSibling;
		front.green=0;
		var gclick=node.gclick%2;
		var bclick=boy.bclick%2;
		if (gclick!=0&&bclick!=0) {   //如果girl和boy便签都变绿，则卡片变绿
			front.style.boxShadow='0 0 5px 5px green';
			back.style.boxShadow='0 0 5px 5px green';
			front.green=1;   //记录卡片是否为绿色
			fingerHeart()  //变绿后比心
		}
		else if (gclick==0&&bclick==0) {  //如果girl和boy便签都是红色的，则卡片为红色
			front.style.boxShadow='0 0 3px 3px red';
			back.style.boxShadow='0 0 3px 3px red';
		}
		else{    //如果girl和boy便签有一个是绿色的，则卡片为黄色
			front.style.boxShadow='0 0 4px 4px yellow';
			back.style.boxShadow='0 0 4px 4px yellow';
		}
		addHeart();   //变色后查看心是否要增加
		
	}


//产生比心效果
function fingerHeart(){
	var heartCreate,heartMove;
	heartCreate= setInterval(createManyFingerHearts,200);  //每20ms产生3颗心
	heartMove=setInterval(moveFingerHeart,20)  //每20ms移动0~10px
	setTimeout(removeAllFingerHeart,3000,heartCreate,heartMove);  //5s后清除所有的心
}

function createFingerHeart(){ 
	var x=Math.random()*window.innerWidth;
	var y=Math.random()*window.innerHeight;
	var mask=document.getElementById('mask');
	var img=document.createElement('img');
	img.src='images/100things/fingerheart.svg';
	mask.appendChild(img);
	img.style.top=y+'px';
	img.style.left=x+'px';
	img.className='fingerHeart';
}

function createManyFingerHearts(){
	for (var i = 0; i < 3; i++) {
		createFingerHeart();
	}
}

function moveFingerHeart(){
	var fingerHearts=document.getElementsByClassName('fingerHeart');
	for (var i = 0; i < fingerHearts.length; i++) {
		var movePace=Math.random()*10;
		var y=parseFloat(fingerHearts[i].style.top)+movePace;
		fingerHearts[i].style.top=y+'px';
		if (y>=window.innerHeight) {
			fingerHearts[i].parentNode.removeChild(fingerHearts[i]);
		}
	};
}

function removeAllFingerHeart(heartCreate,heartMove){
	clearInterval(heartCreate);
	clearInterval(heartMove);
	var fingerHearts=document.getElementsByClassName('fingerHeart');
	for (var i = 0; i < fingerHearts.length; i++){
		fingerHearts[i].parentNode.removeChild(fingerHearts[i]);
		i--;
	}
}


//每完成5件小事加一颗心
function addHeart () {
	var fronts=document.getElementsByClassName('front');
	var heart=document.getElementById('heart');
	var imgs=heart.getElementsByTagName('img');
	var count=0;
	for (var i = 0; i < fronts.length; i++) {
		var green=fronts[i].green;
		if (green!=1) { green=0};
		count+=green;
	}
	var heartCount=Math.floor(count/1);
	if (imgs.length<heartCount) {
		var img=document.createElement('img');
		img.src="images/heart.svg";
		img.style.width='22px';
		heart.appendChild(img);
	}
	if (imgs.length>heartCount) {
		heart.removeChild(imgs[0]);
	}
	var total=fronts.length-1;
	var text=document.createTextNode(count+'/'+total);
	var record=heart.previousSibling.firstChild.firstChild;
	record.parentNode.replaceChild(text,record);
}

function addCard(){    //加入新的小事的卡片
	var addcard=document.getElementById('addcard');
	var contentmask=document.getElementById('contentmask');
	var newcard=document.getElementById('newcard');
	addcard.onclick=function(){
		contentmask.style.display='block';  //点击添加按钮后出现一层灰色的蒙版以及选择小事标签的面板
		newcard.style.display='block';
		closeAddCard();     //可以通过点击关闭按钮关闭这两个面板
		var cardTag=newcard.getElementsByTagName('input');  
		for (var i = 0; i < cardTag.length; i++) {
			cardTag[i].cli=-1;     //记录每个标签是否点击变绿色，没有变绿则cli=-1
		}
		cardSetChoose();    // 每个标签点击一次变绿，再点击变灰
		cardTag[0].onclick=function(){   //cardTag[0]对应全选标签，点击一次全变绿色，再点击一次，全变灰色
			if (this.cli==-1) {  
				for (var i = 4; i < cardTag.length; i++) {
					cardTag[i].style.background="green";
					cardTag[i].cli=1;
				}
				this.cli=1
			}
			else{
				for (var i = 4; i < cardTag.length; i++) {
					cardTag[i].style.background="grey";
					cardTag[i].cli=-1;
				}
				this.cli=-1;
			}
		}

		cardTag[1].onclick=function(){       //cardTag[1]对应确认提交标签，点击后关闭新增小事标签，同时将新增的小事加入到卡片集中
			contentmask.style.display='none';
			newcard.style.display='none';
			for (var i = 4; i < cardTag.length; i++) {
				if(cardTag[i].cli==1){
					var template=document.getElementById('template');
					cardCopy=template.cloneNode(true);
					cardCopy.id='';
					var event=cardCopy.getElementsByClassName('event');
					event[0].innerHTML=cardTag[i].value;
					event[1].innerHTML='一起'+cardTag[i].value;
					template.parentNode.appendChild(cardCopy);
				}
			}
			deleteCard();
			complete();
			addHeart();
		}

		cardTag[2].onclick=function(){   //cardTag[1]对应自定义标签，点击后将需要自己添加的事情加入标签中
			if (!cardTag[3].value) {
				alert('请输入要添加的小事哦!')
				return false;
			}
			for (var i = 4; i < cardTag.length; i++) {    //如果标签中已经存在这些小事，则将背景变成绿色
				if (cardTag[i].value==cardTag[3].value){
					cardTag[i].style.background='green';
					cardTag[i].cli=1;
					return false;
				}
			}
			var button=document.createElement('input');
			button.type='button';
			button.value=cardTag[3].value;
			var cardSet=this.parentNode.nextSibling;
			button.cli=-1;
			cardSet.appendChild(button);
			cardSetChoose();
		}
	

		}

}

function cardSetChoose(){    //每件小事标签是灰色的时候，cli=-1.变成绿色后cli变成1
	var cardSet=document.getElementById('cardSet').getElementsByTagName('input');
		for (var i = 0; i < cardSet.length; i++) {
				cardSet[i].onclick=function(){
					this.style.border='1px solid #333';
					if (this.cli==-1) {
						this.style.background="green";
						this.cli=1; 
					}
						else {
							this.style.background="grey";
							this.cli=-1;
						}
				}
			}
}

function closeAddCard(){  //用于关闭添加小事的蒙版和选择框
	var closeAdd=document.getElementById('closeAdd');
	closeAdd.onclick=function(){
		contentmask.style.display='none';
		newcard.style.display='none';
	}
}



addLoadEvent(deleteCard);
addLoadEvent(complete);
addLoadEvent(addCard);

