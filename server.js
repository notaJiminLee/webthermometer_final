var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: './public/images/'});
var http = require('http'); 
var socket = require('socket.py')

// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jmlee',
  password : '12345678',
  database : 'mysql',
  port: 3306,
  insecureAuth: true
});
connection.connect();
console.log('database conenct success');
var app = express();
app.use(express.static(__dirname + '/public'));

// connection.query('SELECT * FROM temp', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
// });

app.get("/data",function(request,response){  
  if(request.query.date == null){
    connection.query('SELECT * FROM temp', function (error, results, fields) {
      if (error) {
          console.log(error);
      }
      else {
        //console.log(results);
        fs.writeFile('list.json', JSON.stringify(results), function(err){
          if(err) throw err;
          //console.log('Saved!');
        })
        response.json(results); 
      }
    })
  }
  else{
    query = 'SELECT * FROM temp where webpath like "http://34.64.149.18:5051/images/' + request.query.date + '%";'
    connection.query(query, function (error, results, fields) {
      if (error) {
          console.log(error);
      }
      else {
        //console.log(query);
        fs.writeFile('list.json', JSON.stringify(results), function(err){
          if(err) throw err;
          //console.log('Saved!');
        })
        response.json(results); 
      }
    })
  }
})

app.get("/",function(request,response){  
  response.sendfile(__dirname + '/public/html/list.html');
})

app.get("/send", function(request, response){
	console.log(request.query.sql);
	response.send('done')
})

app.post('/upload', upload.array('file', 12), function(req, res, next){
	fs.rename(req.files[0].path, 'public/images/' + req.files[0].originalname, function(err) {
		console.log('done')
	})
	console.log(req.files)
	console.log(req.query.webpath)

	query = "INSERT INTO temp(temp, webpath) values(" + req.query.temp + ", '" + req.query.webpath + "');"
	connection.query(query, function(err, results, fields) {
		if(err) console.log(err)
		else
			console.log(query + " query success")
	})

	res.send("done");
})

app.listen(5051);
