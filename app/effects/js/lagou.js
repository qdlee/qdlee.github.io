var preX = 0,preY=0;
var idx =0;
$(function(){
	var banner_bg = $('.banner_bg:first');
	var border = $('.banner_control em:eq(0)');
	var thumbs = $('.thumbs:first li');
	var current = thumbs.eq(0);
	var currentI;
	thumbs.each(function(i){
		var oI = $(this).children('i:first');
		if(!i) currentI = oI;
		$(this).mouseover(function(){
			current.removeClass('current');
			$(this).addClass('current');

			sMove(currentI,{opacity:50});
			currentI = oI;
			current=$(this);

			sMove(banner_bg,{top:-160*i});
			sMove(border,{top:54*i});
			sMove(oI,{opacity:0});
		});
	});

	setInterval(function(){
		thumbs.eq(i).mouseover();
	},2000);

	

	$('#da-thumbs li div').each(function(){
		var oLi = $(this).parents('li:first');
		var oDiv = $(this);
		oDiv.first=true;
		oDiv.atr='top';
		oLi.mouseenter(function(e){
			console.log('enter');
			console.log(oDiv.atr);
			console.log(oDiv.first);
			if(oDiv.first){
				sMove(oDiv,{top:0});
				oDiv.first=false;
			}else{
				if(oDiv.atr=='left'){
					sMove(oDiv,{'left':0});
				}else{
					sMove(oDiv,{'top':0});
				}
				
			}
			preX = e.clientX;
			preY = e.clientY;
		});
		oLi.mouseleave(function(e){
			// var atr = oDiv.atr;
			// console.log(oDiv.css(atr));
			// if(parseInt(oDiv.css(atr))!==0)
			// 	return;
			var x = e.clientX;
			var y = e.clientY;
			var minx = x-preX;
			var miny = y-preY;
			if(Math.abs(minx)>Math.abs(miny)){
				oDiv.atr='left';
				if(minx>0){
					sMove(oDiv,{left:113});
				}else{
					sMove(oDiv,{left:-113});
				}
			}else{
				oDiv.atr='top';
				if(miny>0){
					sMove(oDiv,{top:113});
				}else{
					sMove(oDiv,{top:-113});
				}
			}
			preX = x;
			preY = y;
		});
	});
});
	
