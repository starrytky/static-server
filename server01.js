/*
 * @Descripttion : 
 * @version      : 
 * @Author       : tky
 * @Date         : 2021-11-19 22:47:34
 * @LastEditors  : tky
 * @LastEditTime : 2021-11-19 23:25:09
 */
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号 \nnode server.js 3200 这种')
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  console.log('请求路径（带查询参数）' +  pathWithQuery)

  response.statusCode = 200
  const filePath = path === '/' ? '/index.html' : path
  const index = filePath.lastIndexOf('.')
  const suffix = filePath.substring(index)
  const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'iamge/jpeg'
  }
  response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
  let content
  try {
    content = fs.readFileSync(`./public${filePath}`)
  }catch(err) {
    content = '文件不存在'
    response.statusCode = 404
  }
  response.write(content)
  response.end()
})

server.listen(port)
console.log("成功监听了"+port +" \n请打开 http://localhost:" + port);