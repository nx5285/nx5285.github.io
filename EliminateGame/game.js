window.onload = function(){
		/*
		 * 1.点击btn按钮
				改变图片的top值为0
				随机改变图片的left值和src
				图片的top值便为450
				直接到图片的底部
					表情盒子发生抖动
						改变图片的top值为0
						随机改变图片的left值和src
						图片的top值便为450
						直接到图片的底部
		 */
	var btn = $('#start');
	var face = $('#face');
	var runImg = $('img',face)[0];
	var gbot = $('#gbottom');
	var grade_p = $('p',$('#grade'));
	
	var speedtime = 5000;
	var winNum = 0;
	var losNum = 0;
	
//	console.log(btn);
	//封装初始化函数
	function result(){
		grade_p[0].innerHTML = '得分：0分';
		grade_p[1].innerHTML = '失分：0分';
		btn.disabled = false;
		winNum = 0;
		losNum = 0;
		speedtime = 100;
		runImg.style.top = '-24px';
		
	}
//	封装函数,改变图片的top,left,src
	function changeImg(){
//		设置一个left值得随机数0 ~ 800之间
		var l = Math.round( Math.random() * 776 );
//		设置一个图片的随机数1 ~ 11之间
		var num = Math.round( Math.random() * 10 ) + 1;
		runImg.style.top = '-24px';
		runImg.style.left = l + 'px';
		runImg.src = 'image/' + num + '.png';
		speedtime -= 100;
		if(speedtime <= 0) speedtime = 5000;
		mTween(runImg,'top',450,speedtime,'linear',function(){
			shake(gbot,'top',30,function(){
				losNum++;
				grade_p[1].innerHTML = '失分：' + losNum + '分';
				if(losNum >= 4){
					alert('失败了你个手残！');
					result();
				}else{
					changeImg();
				}
			})
		})
	}
//	点击开始按钮
	btn.onclick = function(){
		this.disabled = true;
		btn.value = '游戏进行中...'
		changeImg();
	}
	
	var mousedown = false;
//	点击img表情
	runImg.onmousedown = function(){
		if( !mousedown ){
			mousedown = true;
//			停止图片的运动
			clearInterval(this.top);
			shake(this,'left',20,function(){
				winNum++;
				grade_p[0].innerHTML = '得分：' + winNum + '分';
				if(winNum >= 5 ){
					alert('快枪手！啥都快！');
					result();
					btn.value = '开始游戏';
				}else{
					changeImg();
				}
				mousedown = false;
			})
		}
	}
}
