const testFolder = '.././data';
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist){
	console.log(filelist);
})
//file을 list 형식으로 filelist에 저장