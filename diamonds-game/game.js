$(function(){
	var type = ['Tb','Lb','Jb','Zb','Sb','Ib','Ob'],
		blockSize=20,
		row = 20,
		col = 10,

		interval,
		downInterval,
		This,
		_this,
		randomNum,
		randomColor,
		//oWrap = document.getElementById('div1');
		oWrap = $('#wrap'),
		oPreView = $('#view'),
		oValue = $('#value'),
		oStop = $('#stop');
	
	function Block(shapeType){
		//七种基本形状(出现时的坐标位置)
		//第一个坐标为旋转的基准点
		this.shapeType = {
			'Tb' : [[5,-1],[5,-2],[4,-1],[6,-1]] , //凸块（T）
			'Lb' : [[5,-2],[5,-3],[6,-1],[5,-1]] , //左勾（L）
			'Jb' : [[5,-2],[5,-1],[5,-3],[4,-1]] , //右勾（J）
			'Zb' : [[5,-2],[5,-1],[6,-1],[4,-2]] , //左拐（Z）
			'Sb' : [[5,-2],[5,-1],[6,-2],[4,-1]] , //右拐（S）
			'Ib' : [[5,-2],[5,-3],[5,-1],[5,0]]  , //长条（I）
			'Ob' : [[5,-2],[6,-2],[5,-1],[6,-1]]   //方块（O）
		};
		this.type = shapeType;
		this.shapeCoor = this.shapeType[ shapeType ];
		this.oDivs = [];
		//left:是否可向左移动，right:是否可向右移动，bottom:是否可向下移动,change:是否可以变换
		this.canbeMove = {
			left : true,
			right : true,
			bottom : true
		};
		//是否可变换形状
		this.canbeChange = true;
		This = this;
	};
	Block.prototype = {
		//初始化
		init:function(){
			var This = this;
			this.createShape(oWrap);
			this.showShape();
		},
		//创建形状
		createShape:function(oParent){
			for(var i=0;i< this.shapeCoor.length;i++){
				//var o = document.createElement('div');
				var o = $("<div>").css({
					height : blockSize,
					width : blockSize		
				});
				oParent.append(o);
				this.oDivs.push(o);
			}
			if(this.type === 'Zb'||this.type === 'Sb' || this.type === 'Ib'){
				//只旋转90度（360度旋转会引起错位）
				this.rotateOnce = true;	
			}
		},
		//显示形状
		showShape:function(){
			for(var i=0;i<this.oDivs.length;i++){
				this.oDivs[i].css({
					left : this.shapeCoor[i][0]*blockSize,
					top : this.shapeCoor[i][1]*blockSize
				}).data('data',this.shapeCoor[i]);
			}	
		},
		//点targDot（x,y）围绕点origDot（x0,y0） 顺时针 旋转90度之后的坐标（x-y0+y , y-x+x0）
		//示例：rotateDot( [x,y] , [x0,y0] )
		rotateDot:function(origDot,targDot){
			return [ origDot[0]-targDot[1]+origDot[1] , origDot[1]-origDot[0]+targDot[0] ];
		},
		//点targDot（x,y）围绕点origDot（x0,y0） 逆时针 旋转90度之后的坐标（x+y0-y , y+x-x0）
		backRotateDot:function(origDot,targDot){
			return [ origDot[0]+targDot[1]-origDot[1] , origDot[1]+origDot[0]-targDot[0] ];
		},
		//形状旋转,改变坐标
		rotateShape:function(){
			//方块不可以旋转
			if(this.type === "Ob") return ;
			
			if(this.canbeChange){
				var coor = this.shapeCoor;
				
				//旋转取得坐标
				this.shapeCoor = [ coor[0],this.rotateDot(coor[0],coor[1]),this.rotateDot(coor[0],coor[2]),this.rotateDot(coor[0],coor[3]) ];
				
				//Zb，Sb,Ib;只旋转90度（360度旋转会引起错位）
				if(this.rotateOnce === true){
					
					this.rotateOnce = false;	
				}else if(this.rotateOnce === false){
					//Zb，Sb,Ib;顺时针旋转90度后，再逆时针旋转回到原位置
					this.shapeCoor = [ coor[0],this.backRotateDot(coor[0],coor[1]),this.backRotateDot(coor[0],coor[2]),this.backRotateDot(coor[0],coor[3])];
					this.rotateOnce = true;
				}
				for(var i=0;i<this.oDivs.length;i++){
					this.oDivs[i].stop().animate({
						left : this.shapeCoor[i][0]*blockSize,
						top : this.shapeCoor[i][1]*blockSize
					},50).data('data',this.shapeCoor[i]);
				}
			}
		},
		//向下移动
		vMove:function(){
			if(this.canbeMove.bottom){
				for(var i=0;i<this.shapeCoor.length;i++){
					this.shapeCoor[i][1] += 1 ;	
				}
			}
			this.showShape();
		},
		//向右移动
		rMove:function(){
			if(this.canbeMove.right){
				for(var i=0;i<this.shapeCoor.length;i++){
					this.shapeCoor[i][0] += 1 ;	
				}
			}
			this.showShape();
		},
		//向左移动
		lMove:function(){
			if(this.canbeMove.left){
				for(var i=0;i<this.shapeCoor.length;i++){
					this.shapeCoor[i][0] -= 1 ;	
				}
			}
			this.showShape();
		}
	}
	
	function Desk(config){
		this.block = null;
		this.mapArr = [];
		this.domContainer = [];
		this.isFailed = false;
		this.score = 0;
		this.config = config;
		_this = this;
	}
	Desk.prototype = {
		init:function(){
			this.initMap();
			this.createPrev();
			this.createBlock();
			this.bindEvent();
			oValue.html(this.score);
			oWrap.css({
				height : row*blockSize+blockSize-1,
				width : col*blockSize+blockSize-1
			})
		},
		//绑定事件
		bindEvent:function(){
			$(document).bind('keydown.myevent',this.mouseEvent);	
			oStop.toggle(function(){
				$(this).html('开始')	;
				$(document).unbind('keydown.myevent');
				clearInterval(interval);
			},function(){
				$(this).html('暂停');
				$(document).bind('keydown.myevent',_this.mouseEvent);	
				clearInterval(interval);
				interval = setInterval(_this.autoMove,1000);
			})
		},
		//键盘事件
		mouseEvent:function(ev){
			_this.limitMove();
			_this.limitChange();
			//空格变换形状
			if(ev.keyCode === 32 || ev.keyCode === 38){
				_this.block.rotateShape();
			}	
			if(ev.keyCode === 37){
				_this.block.lMove();
			}
			if(ev.keyCode === 39){
				_this.block.rMove();
			}
			if(ev.keyCode === 40){
				_this.block.vMove();
			}
		},
		//预先创建形状（预先知道下一形状）
		createPrev:function(){
			oPreView.html('');
			randomNum = Math.floor(Math.random()*7);
			var block = new Block( type[randomNum] );
			block.createShape(oPreView);
			for(var i=0;i<block.shapeCoor.length;i++){
				block.shapeCoor[i][0]+=-3
				block.shapeCoor[i][1]+=4
			}
			block.showShape()
			//var oDivs = block.oDivs;
		},
		//创建形状,type形状类型
		createBlock:function(){
			this.block = new Block(type[randomNum] );
			this.block.init();
			this.createPrev();
			this.autoMove();
			clearInterval(interval);
			interval = setInterval(this.autoMove,1000);
		},
		autoMove:function(){
			_this.limitMove();
			_this.block.vMove();
			_this.block.showShape();
			if(!_this.block.canbeMove.bottom){
				clearInterval(interval);
				clearInterval(downInterval);
				var oDivs = _this.block.oDivs;
				while(oDivs.length){
					//下落完成后，向domContainer容器添加dom元素，该元素包含其落地时坐标
					_this.domContainer.push(oDivs.pop());
				}
				for(var i=0;i<_this.block.shapeCoor.length;i++){
					var iX =  _this.block.shapeCoor[i][0] ;
					var iY =  _this.block.shapeCoor[i][1] ;
					//改变数据地图中的值，为 1 时表示该位置被填充
					if(iY>=0 && iY<=row && iX>=0 && iX<=col){
						_this.mapArr[ iY ][ iX ] = 1;
					}
				}
				_this.updateData();
				oValue.html(_this.score);
				//$('#div2').html(_this.mapArr.join('\n'))
				if(_this.getFailed()){
					_this.haha();
					clearInterval(interval);						
					return ;	
				}
				//重新创建形状
				_this.createBlock();
			}
		},
		//限制移动
		limitMove:function(){
			var coorArr = _this.block.shapeCoor;
			var result = {left : true , right : true , bottom : true};
			for(var i=0;i<coorArr.length;i++){
				//到达边界，不可移动
				var iX = coorArr[i][0];
				var iY = coorArr[i][1];
				if(iX <= 0 ){
					result.left = false;
				}if(iX >= col){
					result.right = false;	
				}if(iY >= row){
					result.bottom = false;
				}
				_this.block.canbeMove = result;
				//判断当前形状是否被其他形状挡住
				if(iX >=0 && iX <= col && iY >= 0 && iY <= row){
					if( iX < col &&_this.mapArr[ iY ][ iX+1 ] === 1){
						_this.block.canbeMove.right = false;
					
					}if(iX > 0 && _this.mapArr[ iY ][ iX-1 ] === 1){	
						_this.block.canbeMove.left = false;
						
					}if(iY<row && _this.mapArr[ iY+1 ][ iX ] === 1){
						_this.block.canbeMove.bottom = false;
					}			
				}
			}
		},
		//限制形状变化
		limitChange:function(){
			//当前状态（坐标）
			var coor = _this.block.shapeCoor;
			//通过取得 当前位置 变换后的状态，来判断本次是否可变（顺时针变化）
			var rotateArr = [ coor[0],_this.block.rotateDot(coor[0],coor[1]),_this.block.rotateDot(coor[0],coor[2]),_this.block.rotateDot(coor[0],coor[3]) ];
			//逆时针变化
			if(_this.block.rotateOnce === false){
				rotateArr = [ coor[0],_this.block.backRotateDot(coor[0],coor[1]),_this.block.backRotateDot(coor[0],coor[2]),_this.block.backRotateDot(coor[0],coor[3]) ];	
			}
			for(var i=0;i < rotateArr.length;i++){
				//顺时针变化后的坐标
				var x = coor[i][0];
				var y = coor[i][1];
				
				//逆时针变化后的坐标
				var iX = rotateArr[i][0];
				var iY = rotateArr[i][1];
				
				//变换后落到在可视区之外，不可变
				if( iX < 0 || iX > col || iY > row){
					return _this.block.canbeChange =  false;
				}
				//变换后在可视区内，同时旋转时不被挡住，可变换，否则不可以
				else if( x > 0 && x < col && y < row && y > 0 && iX > 0 && iX < col && iY < row && iY > 0 && (_this.mapArr[ iY ][iX ] === 1 || _this.mapArr[ y ][ x-1 ] === 1 || _this.mapArr[ y ][ x+1 ] === 1)){
					return _this.block.canbeChange =  false;	
				}
			}
			return _this.block.canbeChange =  true;	
		},
		//检查是否填满一行,返回行数
		checkFillFull:function(){
			var fullRows = [];
			for(var i=0;i<this.mapArr.length;i++){
				var num = 0;
				for(var j=0;j<this.mapArr[i].length;j++){
					//num为数据地图中每一行的和值
					num += this.mapArr[i][j];
				}
				//行的和值为 col+1 ，表示填满一行
				if(num === col+1){
					fullRows.push(i);	
				}
			}
			//返回填满的行号
			return fullRows;
		},
		
		//填满一行时,更新数据,同时更新视图
		updateData:function(){
			var account = 0;
			var rows = this.checkFillFull();
			for(var i=0;i<rows.length;i++){
				//多行得分增加
				this.score += (++account * 100);
				//更新数据地图
				this.mapArr.splice(rows[i],1);
				this.mapArr.unshift( this.getRowArr() );
				//移除视图中填满的dom元素
				for(var j=0;j<this.domContainer.length;j++){
					var oDiv = this.domContainer[j];
					if(oDiv.data('data')[1] === rows[i]){
						oDiv.remove();
						this.domContainer.splice(j,1);
						j--;
					}
				}
				this.updateMap( rows[i],Math.ceil(rows.length/2)*300 );
			}
		},
		//得分后，更新视图
		updateMap:function(row,time){
			for(var i=0;i<this.domContainer.length;i++){
				//通过元素绑定的data更新视图
				if(this.domContainer[i].data('data')[1] <= row){
					
					var x = this.domContainer[i].data('data')[0];
					var y = this.domContainer[i].data('data')[1];
					var coor = [ x , y+1 ];
					this.domContainer[i].stop().animate({
						top : (y+1)*blockSize
					},time);
					//更新视图，更新div绑定的数据
					this.domContainer[i].data('data',coor);
				}
			}
		},
		//取得分数
		getScore:function(){
			return this.score;
		},
		//是否失败
		getFailed:function(){
			if(!this.block.canbeMove.bottom && this.mapArr[0][ Math.round(col/2)] === 1){
					return this.isFailed = true;
			}
			return this.isFailed = false;
		},
		//数据地图，row行，col列;二维数组，Array[ row ][ col ]
		//为 1 时表示有方块，0 表示空白
		initMap:function(){
			for(var i=0;i<row+1;i++){
				this.mapArr.push(this.getRowArr());
			}
		},
		//每行的数据,初始为0，表示空白
		getRowArr:function(){
			var arr = [];
			for(var i=0;i<col+1;i++){
				arr.push(0);
			}
			return arr;
		},
		haha:function(){
			alert('恭喜你输了。。哈哈~~~~~');
			_this.haha();
		}
	}
	 new Desk().init();
})