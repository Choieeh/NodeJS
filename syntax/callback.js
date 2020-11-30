/*
function a(){
	console.log('A');
}*/
var a = function(){
	console.log('A');
}

function slowfunc(callback){
	callback();
	//인자로 var a에 들어있는 함수를 받음. callback()을 실행하면 그 함수인 console.log('A')를 실행함.
}

slowfunc(a);