//通过 id class tagName获取对应元素
//selector : 选择器
//context : 目标位置
function $(selector,context){
	context = context || document;
	if(selector.charAt() === '#'){
		return document.getElementById(selector.slice(1));
	}else if(selector.charAt() === '.'){
		return context.getElementsByClassName(selector.slice(1));
	}else{
		return context.getElementsByTagName(selector);
	}
}