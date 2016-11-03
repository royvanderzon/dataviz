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

init(function(data){
	console.log('All checks - DONE');

	//load in some data!!
	datavis.data.merged = data;
	load(formData(datavis.data.merged));

	//handle select boxes
	handleLangSelect();

});

$(document).ready(function(){

	$('.loadReal').click(function(){
		load(load(formData(datavis.data.merged)));
	})	

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