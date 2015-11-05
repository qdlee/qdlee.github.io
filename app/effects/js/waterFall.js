

var eContainer;
var boxWidth;
var imgNum = 6;
var imgCloumn = [];
var initPic = [];
var pullPic = [];
var picIndex;


function imgLocation(imgLeft,imgHeight){
	this._imgLeft = imgLeft;
	this._imgHeight = imgHeight;
}


//主函数，调用其它函数
function main(){
	init();
	addToContainer(initPic);
	setTimeout(function(){
		getBoxWidth();
		imgNum = getImgNum(boxWidth);
		setContainerWidth();
		putImgRow1();
		putImgFirst();
	},100);
	
}

/*
	初始化初始图片数组及其它数据
*/
function init(){
	eContainer = document.getElementById('container');
	for (var i = 0,len=imgNum*4; i < len; i++) {
		initPic[i] = "img/water-fall/" + i +".jpg";
	}
	picIndex = i;
}

/*
	下拉时加载图片数组/无限
*/
function pullRich(){
	for (var i = 0; i < 18; i++) {
		pullPic[i] = "img/water-fall/" + i +".jpg";
	}
	
}

/*
	将图片添加到container中
*/
function addToContainer(picArray){
	var htmlText = "";
	var divBox;
	var img;
	for(var pic in picArray){
		//创建父div,并指定class属性为box
		divBox = document.createElement("div");
		divBox.setAttribute("class","box");

		//创建img，并指定src属性，alt属性为image
		img = document.createElement("img");
		
		img.setAttribute("alt","image");

		img.setAttribute("src",picArray[pic].toString());

		//将img挂到div上,将div挂到container上
		divBox.appendChild(img);

		htmlText += divBox.outerHTML;
	}
	eContainer.innerHTML += htmlText;
}

/*
	获取boxWidth的值
*/
function getBoxWidth(){
	boxWidth = eContainer.getElementsByTagName("div")[0].offsetWidth+6;
}

/*
	计算每行放置图片的个数
	1、得到屏幕的宽度
	2、得到图片容器的宽度
	3、计算
*/
function getImgNum(boxWidth){
	var docWidth = document.documentElement.offsetWidth;
	var imgNum = Math.floor(docWidth / boxWidth);
	return imgNum;
}

/*
	得到容器的宽度并设置
*/
function setContainerWidth(){
	var containerWidth = boxWidth * imgNum;
	eContainer.style.width= containerWidth+"px";
}
/*
	放置第一行图片
	使用绝对定位
*/
function putImgRow1(){
	var boxes = eContainer.getElementsByTagName("div");
	for(var i=0; i<imgNum; i++){
		boxes[i].style.top = 0;
		boxes[i].style.left = boxWidth*i+"px";
		imgCloumn[i] = new imgLocation(boxWidth*i+"px",boxes[i].offsetHeight);
	}
}
/*
	放置图片--初始状态
	使用绝对定位
*/
function putImgFirst(){
	var boxes = eContainer.getElementsByTagName("div");
	for(var i=imgNum; i<boxes.length; i++){
		var box = getMinHeight();
		boxes[i].style.top = box._imgHeight+"px";
		boxes[i].style.left = box._imgLeft;
		box._imgHeight += (boxes[i].offsetHeight + 15);
	}
}

/*
	放置图片--滚动时
 */
function putImg(){
	var boxes = eContainer.getElementsByTagName("div");
	for(var i=picIndex,num=0,len=boxes.length; i<len; i++,num++){
		var box = getMinHeight();
		boxes[i].style.top = box._imgHeight+"px";
		boxes[i].style.left = box._imgLeft;
		box._imgHeight += (boxes[i].offsetHeight+15);
	}
	picIndex += num;
}


/*
	得到最小高度的数组元素
*/
function getMinHeight(){
	var min = imgCloumn[0]._imgHeight;
	var index = 0;
	for (var i = 0; i < imgNum; i++) {
		if (min>imgCloumn[i]._imgHeight) {
			min = imgCloumn[i]._imgHeight;
			index = i;
		}
	}
	return imgCloumn[index];
}
/*
	当滚动到下方时，自动加载图片
	获取container总的高度和显示高度，两者相减得到总的可以滚动的高度
	当滚动条滚动时调用些方法，判断已滚动的高度，总可滚动高度-已滚动高度=可滚动高度
	当可滚动高度还剩100px素时，加载图片
 */
window.onscroll = function(){
	var offsetHeight = document.documentElement.clientHeight;
	var scrollTop = document.documentElement.scrollTop || 
					document.body.scrollTop;
	if(scrollTop+offsetHeight>getMinHeight()._imgHeight){
		pullRich();
		addToContainer(pullPic);
		putImg();
	}
}

main();