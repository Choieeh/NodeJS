var http = require('http');
var fs = require('fs');
//fs 모듈로 파일 입출력
var url = require('url');

var app = http.createServer(function(request,response){
	//요청이 오면 실행되는 콜백 함수
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	//url.parse는 url의 정보를 가져옴. true는 query속성을 객체 형식으로 가져오고 false는 query 속성을 문자열 형식으로 가져옴.
	var title = queryData.id;
	if(_url == '/'){
		title = 'Welcome';
	}
	//home으로 갔을때 if문안 실행
	if(_url == '/favicon.ico'){
		response.writeHead(404);
		response.end();
		return;
	}
	response.writeHead(200);
	//http 프로토콜 header지정
	fs.readFile(`data/${queryData.id}`, 'utf8', function(err,data){
		var description = data;
		var template = `
			<!doctype html>
			<html>
			<head>
			  <title>WEB1 - ${title}</title>
			  <meta charset="utf-8">
			</head>
			<body>
			  <h1><a href="/">WEB</a></h1>
			  <ul>
				<li><a href="/?id=HTML">HTML</a></li>
				<li><a href="/?id=CSS">CSS</a></li>
				<li><a href="/?id=JavaScript">JavaScript</a></li>
			  </ul>
			  <h2>${title}</h2>
			  <p>${description}</p>
			</body>
			</html>
			`;
		response.end(template);
	})
	
	
//	response.end(fs.readFileSync(queryData.id));
	//response.end는 응답 데이터 전송 즉 readFileSync함수를 실행
	/*readFileSync는 filename의 파일을 [options]의 방식으로 읽은 후 callback으로 전달된 함수를 호출한다.
	Sync라는 이름이 붙어있는 메소드는 동기방식을 사용한다.
	동기적 방식은 파일을 읽으면서 다른 작업을 동시에 할 수 없음.
	비동기 형식은 항상 마지막 인수가 수행 완료 시 호출할 콜백 함수로 작성되어야 함
	주로 비동기적 형식을 많이 사용하지만, 서버 시작 시 설정 파일을 읽는 작업과 같이 동기적 형식이 더 적절한 경우도 있음.*/
});
app.listen(3000);
//서버가 요청 대기가 되면 3000 포트로 연결
/*
http://opentutorials.org:3000/main?id=HTML&page=12
http->protocol
opentutorials.org -> host(domain)
3000 -> port
main -> path
?id -> querystring
*/