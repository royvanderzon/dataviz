///////////////////////////////////////////////////////
//# INIT
///////////////////////////////////////////////////////

var init = function(cb){

	var data = datavis.data.raw;

	//check 1
	check1(data,function(){

		check2(data,function(){

			check3(data,function(){

				if(typeof cb === 'function'){
					cb(data);
				}

			});

		});

	});


}

var test = [];

init(function(data){
	console.log('All checks - DONE');
	// console.table(data);
	console.log(data);
	test = data;
});