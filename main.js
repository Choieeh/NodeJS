var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
	//url에서  http://localhost:3000/main?id=HTML 에서 ?id=HTML 부분이 query string이라고 부르는데 그부분을 입력받는 부분.
	var title = queryData.id;
    console.log(queryData.id);
	//queryData의 id만 추출 만약 ?name=HTML 이었다면 id가 아닌 name을 추출했을것.
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
	var template = `
	<!doctype html>
	<html>
	<head>
 	 <title>WEB1 - ${title} </title>
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
  	<p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
  	</p>
	</body>
	</html>
`
    response.end(template);
	//response.end('egoing : '+url); 하면 'egoing : /index.html'로 들어가짐.
 
});
app.listen(3030);