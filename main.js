var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
    return `
		<!doctype html>
		<html>
		<head>
		<title>WEB1 - ${title} </title>
		<meta charset="utf-8">
		</head>
		<body>
		<h1><a href="/">WEB</a></h1>
		${list}
		${control}
		${body}
		</body>
		</html>
	`;
}

function templateList(filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    //url에서  http://localhost:3000/main?id=HTML 에서 ?id=HTML 부분이 query string이라고 부르는데 그부분을 입력받는 부분.
    var pathname = url.parse(_url, true).pathname;

    //    console.log(queryData.id);
    //queryData의 id만 추출 만약 ?name=HTML 이었다면 id가 아닌 name을 추출했을것.

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', function (error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTML(
                    title,
                    list,
                    `<h2>${title}</h2> ${description}`,
                    `
		<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function (error, filelist) {
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(
                        title,
                        list,
                        `<h2>${title}</h2> ${description}`,
                        `
		<a href="/create">create</a> <a href="/update?id=${title}">update</a>
		<form action="delete_process" method="post">
			<input type="hidden" name="id" value="${title}">
			<input type="submit" value="delete">
		</form>`
                    );
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', function (error, filelist) {
            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(
                title,
                list,
                `
				<form action="/create_process" method="post">
	
				<p>
					<input type="text" name="title" placeholder="title"/>
				</p>
				<p>
					<textarea name="description" placeholder="description"></textarea>
				</p>
				<p>
					<input type="submit" />
				</p>
				</form>
				`,
                ''
            );
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        //브라우저가 post방식으로 데이터 전달할때마다 function실행
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                response.writeHead(302, { Location: `/?id=${title}` });
                response.end();
            });
        });
    } else if (pathname === '/update') {
        fs.readdir('./data', function (error, filelist) {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(
                    title,
                    list,
                    `
						<form action="/update_process" method="post">
					<input type="hidden" name="id" value="${title}"
				<p>
					<input type="text" name="title" placeholder="title" value="${title}"/>
				</p>
				<p>
					<textarea name="description" placeholder="description">${description}</textarea>
				</p>
				<p>
					<input type="submit" />
				</p>
				</form>

		`,
                    `
		<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(template);
            });
        });
    } else if (pathname === '/update_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        //브라우저가 post방식으로 데이터 전달할때마다 function실행
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function (error) {
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                });
            });
        });
    } 
	else if (pathname === '/delete_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        //브라우저가 post방식으로 데이터 전달할때마다 function실행
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(error){
				response.writeHead(302, { Location: `/` });
                response.end();
			})
        });
    } 
	else {
        response.writeHead(404);
        response.end('Not found');
    }

    //response.end('egoing : '+url); 하면 'egoing : /index.html'로 들어가짐.
});
app.listen(3000);