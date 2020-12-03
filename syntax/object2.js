var f = function (){
	console.log(1+1);
	console.log(1+2);
}

console.log(f);
f();
//function이 값이 될수가 있다.

var a = [f];
a[0]();

var o = {
	func:f
}

o.func();

//배열에도 존재할수 있고, object로 grouping 할수도 있다.