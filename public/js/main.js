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

	//filter data
	var filteredData = filterData(datavis.data.merged);

	console.log(filteredData);

	load(formData(filteredData));

	//handle select boxes
	handleLangSelect();

});

$(document).ready(function(){

	$('.loadReal').click(function(){

		//set languages
		datavis.loadOptions.langs = [];

		//filter data
		var filteredData = filterData(datavis.data.merged);

		//load data
		load(formData(filteredData));

	})	

	$('.loadReal-NL').click(function(){

		//set languages
		datavis.loadOptions.langs = ['US'];

		//filter data
		var filteredData = filterData(datavis.data.merged);

		console.log(formData(filteredData))

		//load data
		load(formData(filteredData));
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