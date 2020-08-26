var express = require('express');
var mysql = require('mysql');
var fs = require('fs');


// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host     : '192.168.0.4',
  user     : 'pi',
  password : '',
  database : 'mysql',
  port: 3306,
  insecureAuth: true
});
connection.connect();

var app = express();
app.use(express.static(__dirname + '/public'));
  
// connection.query('SELECT * FROM temp', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
// });

app.get("/data",function(request,response){  
  connection.query('SELECT * FROM temp', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    else {
      console.log(results);
      fs.writeFile('list.json', JSON.stringify(results), function(err){
        if(err) throw err;
        console.log('Saved!');
      })
      response.send(results); 
    }
  })
  // var jsonfile = {
  //   "userId": 1,
  //   "id": 1,
  //   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  // }
  // response.send(jsonfile)
})

app.get("/list",function(request,response){  
  response.sendfile(__dirname + '/public/html/list.html');
})

app.listen(8000);
