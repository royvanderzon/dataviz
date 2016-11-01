var file = require('file-system');
var fs = require('fs');
var csv = require("fast-csv");
var functions = require('../functions');

var stream = fs.createReadStream("./data/data.csv");

var csvStream = csv({headers: true})
    .on("data", function(data){
         // console.log(data);
         // functions.data.raw.push(data);


         var obj = {};

         // functions.data.raw = data;
         functions.data.raw.push(data);
    })
    .on("end", function(){
         console.log("done");
    });
 
var getData = function(){
 	
 	var headers = [];

	stream.pipe(csvStream);

}

getData();

module.exports = function(app) {
 
    app.get('/', functions.check, function(req, res) {

    	res.render('home/index',{
    		data : JSON.stringify(functions.data.raw)
    	});

    	// res.json(functions.data.raw);

    });

}