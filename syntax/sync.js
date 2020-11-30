var fs = require('fs');
/*
//readFileSync

console.log('A');
var result = fs.readFileSync('sample.txt', 'utf8');
console.log(result);
console.log('C');
*/
//결과 A B C


console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){
	console.log(result);
});
//file읽는 작업이 끝나면 function을 실행시킴.
console.log('C');

//결과 A C B -->비동기적이기 때문.