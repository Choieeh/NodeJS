var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    //url에서  http://localhost:3000/main?id=HTML 에서 ?id=HTML 부분이 query string이라고 부르는데 그부분을 입력받는 부분.
    var pathname = url.parse(_url, true).pathname;
    
    //    console.log(queryData.id);
    //queryData의 id만 추출 만약 ?name=HTML 이었다면 id가 아닌 name을 추출했을것.

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';

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
  	<p>${description}
  	</p>
	</body>
	</html>
`;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
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
  	<p>${description}
  	</p>
	</body>
	</html>
`;
                response.writeHead(200);
                response.end(template);
            });
        }

    } else {
        response.writeHead(404);
        response.end('Not found');
    }



    //response.end('egoing : '+url); 하면 'egoing : /index.html'로 들어가짐.

});
app.listen(3000);