// JavaScript Document
function $( v,p ){
	
	var t = typeof v, s = '', doc = document;
		
	if( t === 'string' ){
		
		s = v.charAt();
		
		p = p&&$(p).length ? $(p)[0] : $(p);
				#div1
		if( s === '#' )
			return doc.getElementById( v.substring(1) );
		
		if( s === '.' )
			return getByClass( v.substring(1), p||doc );
			<div>
		if( s === '<' )
			return doc.createElement( v.slice(1,-1) );
			
		return (p||doc).getElementsByTagName( v );
		
	}
	
	if( t === 'function' )
		window.onload = v;
		
	return v;
	
}


function append(o,p){
	o = $(o).length ? $(o)[0] : $(o);
	p = $(p).length ? $(p)[0] : $(p);
	(p||document).appendChild(o);
}

function insert(o1,o2,p){
	o1 = $(o1).length ? $(o1)[0] : $(o1);
	o2 = $(o2).length ? $(o2)[0] : $(o2);
	p = $(p).length ? $(p)[0] : $(p);
	(p||document).insertBefore(o1,o2);
	
}

function remove(o,p){
	o = $(o).length ? $(o)[0] : $(o);
	(p||document).removeChild($(o));
}


function getByClass(s,p){
	
	var aEles,arr,doc = document;
	
	if(doc.getElementsByClassName)
		return (p||doc).getElementsByClassName(s);
	
	aEles = (p||doc).getElementsByTagName('*');
	arr = [];
	
	for(var i=0; i<aEles.length; i++){
		var aClass = aEles[i].className.split(' ');
		for(var j=0; j<aClass.length; j++){
			if(aClass[j]===s)arr.push(aEles[i]);	
		}	
	}
	
	return arr;
}