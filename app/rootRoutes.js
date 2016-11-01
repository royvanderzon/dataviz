const file = require('file-system');
const fs = require('fs');
const csv = require('fast-csv');
const functions = require('../functions');

const stream = fs.createReadStream('./data/data.csv');

const csvStream = csv({headers: true})
    .on('data', function(data){
         // console.log(data);
         // functions.data.raw.push(data);


         const obj = {};

         // functions.data.raw = data;
         functions.data.raw.push(data);
    })
    .on('end', function(){
         console.log('done');
    });

const getData = function(){

 	const headers = [];

	stream.pipe(csvStream);

}

getData();

module.exports = function(app) {

    app.get('/', functions.check, function(req, res) {

    	res.render('home/index',{
    	   data : JSON.stringify(functions.data.raw)
        });

    });
}
