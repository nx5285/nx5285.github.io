	window.onload = function(){
 		var oCard = $('#card'),
 			oText = $('#text'),
 			works = $('#works'),
 			aBj = $('.bj'),
 			oNav = $('#nav'),
 			aTextContent = $('.textContent'),
 			aDistrict = $('.district');
 		var onOff = true;   //卡片第一张 开关
 		var allOnOff = true;  //控制卡片点击时 必须执行完 transition 后才可 继续执行
 		var mouseOnOff = true;
 		var goMoveOnoff = true;
 		var goMoveTimer = null;
		var strCard = '';
		var strText = '';
		var navLi = '';
		var json = [
			{
				pic:"img/ali-trip.jpg",
				title:'阿里旅行PC端静态页面布局',
				time:'March 2016',
				text:['1.通过给div、span等标签添加浮动和定位等原理完成基本页面布局','2.利用hover来给一些模块添加鼠标效果','3.兼容IE6以上的版本'],
				link:'https://nx5285.github.io/alitrip-PC/html/index.html'
			},{
				pic:"img/designcrowdweb.jpg",
				title:'Designcrowd-响应式布局',
				time:'March 2016',
				text:['1.使用定位、浮动等原理完成基本页面布局','2.主要通过媒体查询来控制页面变化','3.不兼容IE低版本'],
				link:'https://nx5285.github.io/Designcrowd-Responsive/DesigncrowdWeb.html'
			},{
				pic:"img/JDmobile.jpg",
				title:'京东移动端页面布局',
				time:'April 2016',
				text:['1,根据不同设备设置动态像素比，设置根字体大小，单位“rem”','2,在less文件中设置@rem：根字体大小rem，可以省去计算步骤，提高开发效率'],
				link:'https://nx5285.github.io/jingdongmobile/index.html'
			},{
				pic:"img/game.jpg",
				title:'俄罗斯方块&表情消除游戏',
				time:'August 2016',
				text:['1.通过jQuery框架实现俄罗斯方块的游戏控制','2.通过原生js实现一个消除小游戏中的交互效果'],
				link:'https://nx5285.github.io/EliminateGame/EliminateGame.html'
			},{
				pic:"img/weiyun.jpg",
				title:'demo-模拟版微云',
				time:'August 2016',
				text:['1.通过原声js模拟的腾讯微云样板','2.主要实现的文件夹操作：新建，重命名，删除，全选，框选，拖拽，面包屑导航，树形菜单','3.数据使用json对象模拟,以“id和父id”实现数据结构的需求处理,对自己的数据结构处理、编程逻辑有很好的锻炼'],
				link:'https://nx5285.github.io/weiyun-simulation/index.html'
			},{
				pic:"img/tmall-homepage.jpg",
				title:'天猫首页布局',
				time:'August 2016',
				text:['1.使用定位、浮动等原理完成页面布局','2.使用原生JS处理页面中主要的JS效果','3.兼容IE低版本浏览器'],
				link:'https://nx5285.github.io/tmall-homepage/tmall.html'
			},{
				pic:"img/worldauto.jpg",
				title:'WorldAuto-车世界',
				time:'October 2016',
				text:['1.使用CSS3基本原理完成页面布局','2.使用原生JS实现页面中主要的JS效果','3.自建项目之一（在建项目）'],
				link:'https://nx5285.github.io/'
			}

		];
		var Prompt = ['首页','教育','工作/技能','作品','联系方式']
		//自适屏幕应宽度
		for (var j = 0; j < aTextContent.length ; j++){
			aTextContent[j].style.marginTop = view().H/2 - aTextContent[j].clientHeight/2 - 20 + 'px';
		};
		window.onresize = function(){
			oNav.style.top = view().H/2 - oNav.offsetHeight/2 - 20 + 'px';
			for (var i = 0; i < aDistrict.length ; i++){
				var cleanW = view().W,
					cleanH = view().H;
				aDistrict[i].style.width = cleanW + 'px';
				aDistrict[i].style.height = cleanH + 'px';
			}
			for (var j = 0; j < aTextContent.length ; j++){
				aTextContent[j].style.marginTop = view().H/2 - aTextContent[j].clientHeight/2 + 'px';
			};
		};
		for (var i = 0; i < aDistrict.length ; i++){
			navLi += '<li><span>' + Prompt[i] + '</span></li>';
			aDistrict[i].style.position = 'absolute';
		}
		oNav.innerHTML = navLi;
		var aNavLi = $('li',oNav)
		oNav.style.top = (view().H/2 - oNav.offsetHeight/2) + 'px';
		function navfn(index){
			if( index === 3 ){
				goMoveOnoff = false;
			}
			for (var i = 0; i < aNavLi.length ; i++){
				aNavLi[i].style.background = '';	
			};
			aNavLi[index].style.background = '#1aa5b2';
		}
		navfn(0)
		// 导航事件 
		for (var i = 0; i < aNavLi.length ; i++){     
			aNavLi[i].index = i;
			aNavLi[i].onmouseover = function(){
				var obj = first(this);
				obj.style.display = 'block';
				setTimeout(function(){
					obj.style.opacity = 1;
				},30)
			}
			aNavLi[i].onmouseout = function(){
				var obj = first(this);
				obj.style.opacity = 0;
				setTimeout(function(){
					obj.style.display = 'none';
				},300)
			}
			aNavLi[i].onclick = function(){
				if( !mouseOnOff ) return;
				mouseOnOff = false;
				navfn(this.index)
				for (var j = 0; j < aNavLi.length ; j++){
					if( !aDistrict[this.index].style.top || parseFloat(aDistrict[this.index].style.top) === 0 ){
						if( j < this.index ){
							timeDoMove(aDistrict[j],{top:-aDistrict[0].clientHeight*4},600,'easeIn',function(){
								setTimeout(function(){
									mouseOnOff = true;
								},30)
							});
							first(aDistrict[j]).style.opacity = 1;
						}
					}else{
						aDistrict[this.index].style.top = -aDistrict[0].clientHeight + 'px';
						
						if( j >= this.index ){

							first(aDistrict[j]).style.transition = '1.6s';
							first(aDistrict[j]).style.opacity = 0;
							timeDoMove(aDistrict[j],{top:0},250,'easeIn',function(){
								setTimeout(function(){
									mouseOnOff = true;
								},30)
							});
							first(aDistrict[j]).style.transition = '.4s';
						}
					}
				};
			}
		};
		// 屏幕滚动
		for (var i = 0; i < aDistrict.length ; i++){   
			
			(function(n){
				aDistrict[n].style.width = view().W + 'px';
				aDistrict[n].style.height = view().H + 'px';
				aDistrict[n].style.zIndex = (aDistrict.length*5 - n);
				function mousewheel(){
					aDistrict[n].onmousewheel = mousewheelfn;
					if( aDistrict[n].addEventListener ){
						aDistrict[n].addEventListener( 'DOMMouseScroll',mousewheelfn,false );
					}
					function mousewheelfn(ev){
						var e = ev || event;
						var _this = this;
						if( !mouseOnOff ) return;
						mouseOnOff = false;
						var direction = true;
						if( e.wheelDelta ){
							direction = e.wheelDelta > 0 ? true : false;
						}else{
							direction = e.detail < 0 ? true : false;
						}
						if( direction ){ //up
							if( !!prev(this) ){
								navfn(n-1)
								prev(this).style.top = -this.clientHeight + 'px';
								prev(this).style.width = view().W + 'px';
								prev(this).style.height = view().H + 'px';
								timeDoMove(prev(this),{top:0},250,'easeIn',function(){
									setTimeout(function(){
										mouseOnOff = true;
									},500)
									first(prev(_this)).style.transition = '.4s';
								})
								first(prev(this)).style.transition = '1.6s';
								first(prev(this)).style.opacity = 0;
							}else{
								mouseOnOff = true;
							}
							
						}else{    //down
							if( !!next(this) && next(this).nodeName === 'DIV'){
								navfn(n+1)
								next(this).style.width = view().W + 'px';
								next(this).style.height = view().H + 'px';
								timeDoMove(this,{top:-this.clientHeight*4},600,'easeIn',function(){
									setTimeout(function(){
										mouseOnOff = true;
									},500)
								})
								first(this).style.opacity = 1;
							}else{
								navfn(0)

								aDistrict[0].style.top = -aDistrict[0].clientHeight + 'px';
								first(aDistrict[0]).style.opacity = 0;
								first(aDistrict[0]).style.transition = '1.6s';
								aDistrict[0].style.width = view().W + 'px';
								aDistrict[0].style.height = view().H + 'px';
								timeDoMove(aDistrict[0],{top:0},250,'easeIn',function(){
									for (var i = 0; i < aDistrict.length  ; i++){
										aDistrict[i].style.top = 0 + 'px';
										aBj[i].style.opacity = 0;
										
									};
									setTimeout(function(){
										mouseOnOff = true;
									},500)
									first(aDistrict[0]).style.transition = '.4s';
								})
								
							}
						}
						if( e.preventDefault ){
							e.preventDefault()
						}
						e.returnValue = false;
					};
				};
				mousewheel();
			})(i)
		};
		//监控作品区域显示
		goMoveTimer = setInterval(function(){
			if( !goMoveOnoff ){
				goMove();
				clearInterval(goMoveTimer);
			}
		},30);
		function goMove(){
				//作品内容自动生成
			function workContent(){
				for (var i = 0; i < 14; i++){
					strCard += '<div><span style="background-image:url(' + json[i%7].pic + ')"></span></div>';
				};
				for (var i = 0; i < json.length ; i++) {
					strText += '<div class="content"><h1>';
						if( json[i].title ){
							for (var j = 0; j < json[i].title.length ; j++) {
								strText += '<span>' + json[i].title.charAt(j) + '</span>';
							};
						}
					strText +='</h1><p>' + json[i].time + '</p>';
						if( json[i].text ){
							for (var j = 0; j < json[i].text.length ; j++) {
								strText += '<h3>' + json[i].text[j] + '</h3>';
							};
						}
					strText +='<a target="_blank" href="' +json[i].link +'"></a></div>';
				};
			}
			//作品中的 切换
			function awork(){
				workContent();
				oText.innerHTML = strText;
				oCard.innerHTML = strCard;                                          // Generating content
				var aContent = $('.content',oText);
				//文字说明的默认样式
				function textClaer(){
					for (var i = 0; i < aContent.length ; i++){
						aContent[i].style.display = 'none';
						var aSpan =$('span',first(aContent[i])),
							aP =$('p',aContent[i])[0],
							aH3 =$('h3',aContent[i]),
							aA =$('a',aContent[i])[0];
						for (var j = 0; j < aSpan.length ; j++){
							aSpan[j].style.top = '-50px'
						};
						aP.style.opacity = 0;
						for (var j = 0; j < aH3.length ; j++){
							aH3[j].style.top = '30px';
							aH3[j].style.opacity = 0;
						};
						setTimeout(function(){
							timeDoMove(aA,{left:30,opacity:1},1000,'linear');
						},300)
						aA.style.left = '60px';
						aA.style.opacity = 0;
					}
				}
				//文字说明切换效果
				function textMove(num){ // 参数 num 表示 显示第几组 
					console.log(num)
					aContent[num].style.display = 'block';
					var aSpan =$('span',first(aContent[num])),
						aP =$('p',aContent[num])[0],
						aH3 =$('h3',aContent[num]),
						aA =$('a',aContent[num])[0];
					aA.style.transition = '';
					for (var j = 0; j < aSpan.length ; j++){
						(function (n){
							setTimeout(function(){
								doMove(aSpan[n],'top',6,20,function(){
									doMove(aSpan[n],'top',4,2)
								})
							},50*j)	
						})(j)
					};
					timeDoMove(aP,{opacity:1},3000,'linear');
					for (var j = 0; j < aH3.length ; j++){
						(function (n){
							setTimeout(function(){
								timeDoMove(aH3[n],{opacity:1,top:0},1000,'linear');
							},500*j)	
						})(j);

					};
					setTimeout(function(){
						timeDoMove(aA,{left:30,opacity:1},1000,'linear');
					},300);
					//鼠标移入链接效果
					aA.onmouseover = function(){
						clearInterval(oCard.cardTimer);
						aA.style.transition = '.5s';
						oCard.cardTimer = null;
					}
					aA.onmouseout = function(){
						cardMovePlay(oCard);
					}
				}
				textMove(0);
				for (var i = 0; i < oCard.children.length ; i++){
					oCard.children[i].style.zIndex = oCard.children.length*100 - i;
					oCard.children[i].className = 'go6';
					oCard.children[i].style.opacity = '0.1';
					oCard.children[i].style.transition = '1s';
				};
				setTimeout(function (){
					for (var i = 0; i < oCard.children.length ; i++){
						oCard.children[i].style.opacity = '1';
						if( i < 7 ){
							oCard.children[i].className = 'go'+i;
						}else{
							oCard.children[i].className = 'go6';
						}
						oCard.children[i].abc = i%7;
					};
				},400);
				setTimeout(function (){
					for (var i = 0; i < oCard.children.length ; i++){
						oCard.children[i].style.transition = '.5s';
					};
				},2500);
				//卡片点击
				function cardFn(){
					oCard.onclick = function(ev){
						ev = ev || event;
						clearInterval(oCard.cardTimer);
						oCard.cardTimer = null;
						for (var i = 0; i < oCard.children.length ; i++) {
							oCard.children[i].number = i;
						};
						if( ev.target.parentNode.number === 0 ){
							if( onOff ){
								onOff = false;
								oCard.children[0].style.left = '250px';
								first(oCard.children[0]).style.transform = 'rotateY(0deg) ';
								
							}else{
								onOff = true;
								oCard.children[0].style.left = '350px';
								first(oCard.children[0]).style.transform = 'rotateY(35deg)';
								

							}
						}
							if( !allOnOff || !onOff) return;
							allOnOff = false;
							cardMove(ev.target.parentNode.number);
							/*if( onOff ){
								
							}*/
							oCard.children[0].addEventListener("transitionend", function(){
								allOnOff = true;
							})
							setTimeout(function(){
								cardMovePlay(oCard);
							},4000)
						
						
					}
				}
				cardFn()
				//卡片自动轮播
				function cardMovePlay(obj){
					if( obj.cardTimer ) return;
					obj.cardTimer = setInterval(function(){
						cardMove(1);
					},4000)
				}
				cardMovePlay(oCard);
				//卡片切换效果
				function cardMove(number){
					if( !onOff ) return;
					if( number != 0 ){
						var abc = oCard.children[number].abc;
						textClaer();
						console.log(abc)
						textMove(abc);
					}
					
					var mars =  oCard.children;
					var n = 0;
					var m = 100;
					var arr = [];
					var arr1 = []
					mars[number].className = 'go0';
					mars[number].style.zIndex = m;
					for (var i = 0; i < mars.length ; i++) {
						m = m -10;
						mars[i].style.zIndex = m;
						if( i > number ){
							n = n + 1;
							if( n > 6) n = 6;
							mars[i].className = 'go' + (n);
						}else if( i < number ){
							mars[i].className = 'go6';
							var newDiv = mars[i].cloneNode(true);
							newDiv.abc = mars[i].abc;
							arr.push(newDiv);
							arr1.push(mars[i])
						};
					};
					for (var i = 0; i < arr.length ; i++) {	
						arr[i].style.zIndex = m;
						oCard.removeChild(arr1[i]);
						oCard.appendChild(arr[i]);
					};
				};
			}
			awork();
		}
	}