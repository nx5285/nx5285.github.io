window.onload = function(){
	var massDiv = $('.div',$('#topNav')),
		aBian = $('.bian',$('#topNav')),
		oSearch = $('#search'),
		oMaxPic = $('#maxPic'),
		oMaxPicNav = $('#maxPicNav'),
		aPicNav = $('a',oMaxPicNav),
		aMaxPic = $('a',oMaxPic),
		oMenu = $('#menu');
	var picArr = [
		{
			pic:'img/pic/001.jpg',
			color:'#757da9'
		},
		{
			pic:'img/pic/002.jpg',
			color:'#e8e8e8'
		},
		{
			pic:'img/pic/003.jpg',
			color:'#fae8d2'
		},
		{
			pic:'img/pic/004.jpg',
			color:'#e8090a'
		},
		{
			pic:'img/pic/005.jpg',
			color:'#490df8'
		},
		{
			pic:'img/pic/006.jpg',
			color:'#ef372f'
		}
	];
	console.log(aBian.length)
	for (var i = 0; i < massDiv.length; i++) {
		(function (n){
			/*console.log(n)
			console.log(prev(massDiv[n]).parentElement.nodeName)*/
			aBian[n].parentElement.onmouseover = function(){
				addClass(aBian[n],'bjBian');
				if( massDiv[n].style.display === 'block' ){
					massDiv[n].style.display = 'none';
				}else{
					massDiv[n].style.display = 'block';
				}
			}
			aBian[n].parentElement.onmouseout = function(){
				removeClass(aBian[n],'bjBian');
				massDiv[n].style.display = 'none';	
			}
		})(i)
	};
	oSearch.onfocus = function(){
		if( oSearch.value === "八仙过海 月享中秋" || oSearch.value.trim() === ''){
			oSearch.value = ""
		}
	}
	oSearch.onblur = function(){
		if( oSearch.value === "八仙过海 月享中秋" || oSearch.value === ''){
			oSearch.value = "八仙过海 月享中秋"
		}
	}

	var oMaxPicStr = '';
	var oMaxPicNavStr = '';
	for (var i = 0; i < picArr.length ; i++) {
		oMaxPicStr +='<a href="javascript:;"><img src="' + picArr[i].pic + '"/></a>';
		oMaxPicNavStr += '<li><a href="javascript:;">' + (i+1) + '</a></li>'
	};
	oMaxPic.innerHTML = oMaxPicStr;
	oMaxPicNav.innerHTML = oMaxPicNavStr;	
	function first(n){
		for (var i = 0; i < aPicNav.length ; i++) {
			aPicNav[i].className = '';
			aMaxPic[i].style.zIndex = '1';
			aMaxPic[i].style.opacity = 0;
			aMaxPic[i].style.filter = "alpha(opacity="+0+")";
		};
		aMaxPic[n].style.opacity = 1;
		aMaxPic[n].style.filter = "alpha(opacity="+100+")";
		aMaxPic[n].style.zIndex = '10';
		aPicNav[n].className = 'red';	
		oMenu.style.background = picArr[n].color;
	};
	first(0);
	for (var i = 0; i < aPicNav.length ; i++) {
		aPicNav[i].index = i
		aPicNav[i].onclick = function(){
			first(this.index);
			num = this.index;
		}	
		aPicNav[i].onmouseover = function(){
			clearInterval(oMaxPicTimer);
		};
		aPicNav[i].onmouseout = function(){
			oMaxPicGo();
		};
	};
	var oMaxPicTimer = null;
	var num = 0;
	function oMaxPicGo(){
		oMaxPicTimer = setInterval(function(){
			first(num);
			num++;
			num = num%aPicNav.length;
		},2000)
	};
	oMaxPicGo();
}