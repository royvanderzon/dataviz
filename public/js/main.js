///////////////////////////////////////////////////////
//# INIT
///////////////////////////////////////////////////////

var init = function(cb){

	var data = datavis.data.raw;

	//check 1
	check1(data,function(){

		check2(data,function(){

			check3(data,function(){

				check4(data,function(){

					check5(data,function(){

						check6(data,function(){

							if(typeof cb === 'function'){
								cb(data);
							}

						});
						
					});

				});

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

	//load in some testdata!!
	load(data1);

});

$(document).ready(function(){

	$('.loadOne').click(function(){
		load(data1);
	})

	$('.loadTwo').click(function(){
		load(data2);
	})

	$('.loadThree').click(function(){
		load(data3);
	})

})