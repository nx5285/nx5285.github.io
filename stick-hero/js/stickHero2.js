$(function(){
	var $section = $('section');
	var $start = $('#start');
	var $mBox = $('#matchManBox');
	var $mMan = $('#matchMan');
	var $pierBox = $('#pierBox');
	var $pier = $('.pier');
	var $stick = $('#stick');
	//火柴人的left值
	var mLeft = 0;
	//棍子增长速度
	var n = 3;
	//记录时间
	var time = 0;
	//记录定时器
	var timer = null;
	
	
	
	//火柴人的left值
	mLeft = mRightFn(0);
	
	//页面初始化
	//初始化火柴人的位置,即第一个树墩的右侧
	$mBox.css({
		left:mLeft
	});
	$pier.eq(1).css({
		left: parseFloat(desFn($pier.eq(0))),
		width: widthFn()
	})
	
	
	//点击开始
	$start.on('click.a',function(e){
		//开始后将按钮内容置空，并变为红色
		$start.html('').css('background-color','red');
		//点击框内出开始按钮外任意位置，进行游戏
		$section.mousedown(function(){
			clearInterval(timer);
			//鼠标按下打开定时器，棍子高度增加
			timer = setInterval(function(){
				$stick.height(function(n,c){
					return c+3;
				});
			},100);
		})
		//鼠标抬起
		$section.mouseup(function(e){
			//鼠标抬起，棍子倒下，小人src换成动态图，并改变其left值
			$mMan.prop('src','img/2.gif');
			//棍子倒下，将宽高置换
			$stick.css({
				'height': parseFloat($stick.css('width')),
				'width': parseFloat($stick.css('height')),
			})
			
			//抬起时，清除定时器
			clearInterval(timer);
			timer = setInterval(function(){
				var l = parseFloat($mBox.css('left')) + 3;
				//先判断棍子宽度  和  第一个第二个树墩之间的距离
				var stickRL = parseFloat($stick.css('width')) + parseFloat($stick.css('left'));
				var stickW = parseFloat($stick.css('width'));
				var mBoxW = parseFloat($mBox.css('width'));
				
				if(stickW < disXFn(0)){
					//棍子长度小于中间间隙时
					if(l + 5 >= stickRL){
						clearInterval(timer);
						//以棍子left为圆心，直角运动90度
						stickAnimate();
						$mMan.prop('src','img/1.jpg');
						
						$mBox.animate({'rotate':'720','bottom':'0','width':'0','height':'0'},1000,'linear')
					}
				}else if(stickW > disXFn(0) + parseFloat($pier.eq(1).css('width'))){
					//棍子长度大于第二个树墩的右侧时
					if(l + 5 >= stickRL){
						clearInterval(timer);
						//棍子消失
						$stick.css({
							'width':0,
							'height':0
						})
						$mMan.prop('src','img/1.jpg');
						//火柴人旋转下落，后消失
						$mBox.animate({'rotate':'720','bottom':'0','width':'0','height':'0'},1000,'linear');
					}
				}else{
					//棍子宽度刚刚好
					//小人移动，当走到第二个树墩右侧时，停下
					if(l >= mRightFn(1)){
						clearInterval(timer);
						$stick.css({
							'width':0,
							'height':0
						})
						$mMan.prop('src','img/1.jpg');
						//第三个柱子出现
						
					}
				}
				$mBox.css('left', l + 'px');
			},100)
			
		})
		
		e.cancelBubble = true;
	})
	
	
	//树墩之间的距离随机，第二个树墩的left值大于50，小于一定值
	function desFn(prevPWidth){
		var width = parseFloat(prevPWidth.css('width'));
		return Math.random()*(200 - width) + width;
	}
	//树墩宽度随机，大于10，小于100
	function widthFn(){
		return Math.random()*(100 - 10) + 10;
	}
	//火柴人最后定停下的位置
	function mRightFn(k){
	return parseFloat($pier.eq(k).css('left')) + parseFloat($pier.eq(k).css('width')) - parseFloat($mBox.css('width'));
	}
	//两个树墩之间的距离
	function disXFn(k){
		return parseFloat($pier.eq(k+1).css('left')) - parseFloat($pier.eq(k).css('width'));
	}
	//以棍子left为圆心，直角运动90度
	function stickAnimate(){
		$stick.animate({'rotate':90},1000,'linear',function(){
			//将棍子的宽高设置为零
			$(this).css({
				'width':0,
				'height':0
			})
		})
	}
});
