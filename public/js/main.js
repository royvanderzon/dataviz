///////////////////////////////////////////////////////
//# INIT
///////////////////////////////////////////////////////

var init = function(cb){

	var data = datavis.data.raw;

	data = datavis.getters.emails(data);

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
	handleChecks();
	handleEmail();

	//load in saved states
	refreshSaveList();

});

var refresh = function(){

		var filteredData = filterData(datavis.data.merged);
		//load data
		load(formData(filteredData));
}

$(document).ready(function(){

	$('.loadReal').click(function(){

		//set languages
		datavis.loadOptions.langs = [];

		refresh();

	})

	$('.loadReal-NL').click(function(){

		//set languages
		datavis.loadOptions.langs = ['US'];

		refresh();

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

// add graphs on click

// $('.addgraph').each(function() {
// 	$('.addgraph').on('click', function() {
// 		$(this).replaceWith($('#insertGraph').clone().removeClass('clone').addClass('cloneA'));
// 	});
// });

var getInfoHtml = function(){

	var html = '';

	var loadOptions = datavis.loadOptions;

	if(datavis.loadOptions.emails.length > 0){

		//generate languages list
		html += '<h3>Users</h3>';
		html += '<ul>';
		if(loadOptions.emails.length > 0){
			for(var i = 0;i<loadOptions.emails.length;i++){
				html += '<li>';
				html += loadOptions.emails[i];
				html += '</li>';
			}
		}else{
			html += '<li>';
			html += 'All users';
			html += '</li>';
		}
		html += '</ul>';

		html += '<h3>Languages</h3>'
		html += '<ul>';
		html += '<li>';
		html += 'All countries';
		html += '</li>';
		html += '</ul>';


	}else{

		html += '<h3>Users</h3>'
		html += '<ul>';
		html += '<li>';
		html += 'All users';
		html += '</li>';
		html += '</ul>';

		//generate languages list
		html += '<h3>Languages</h3>';
		html += '<ul>';
		if(loadOptions.langs.length > 0){
			for(var i = 0;i<loadOptions.langs.length;i++){
				html += '<li>';
				html += loadOptions.langs[i];
				html += '</li>';
			}
		}else{
			html += '<li>';
			html += 'All countries';
			html += '</li>';
		}
		html += '</ul>';


	}

	//generate checks list
	html += '<h3>Checks</h3>';
	html += '<ul>';
	if(loadOptions.checks.length > 0){
		for(var i = 0;i<loadOptions.checks.length;i++){
			html += '<li>';
			html += loadOptions.checks[i];
			html += '</li>';
		}
	}else{
		html += '<li>';
		html += 'All checks';
		html += '</li>';
	}
	html += '</ul>';

	return html;

}

$('.graphcontainer').on('click','.addgraph',function(){
	$(this).parent().removeClass('noGraph');
	$(this).html($('#insertGraph').html());

	var infoHtml = getInfoHtml();
	$(this).parent().find('.info').html(infoHtml);
	// $(this).replaceWith($('#insertGraph').clone().removeClass('clone').addClass('cloneA'));
})
$('.graphcontainer').on('click','.delGraph',function(){
	$(this).parent().parent().hide('fast',function(){
		// $(this).parent().remove();
		$(this).remove();
	})
});
$('.graphcontainer').on('click','.addCanvas',function(){
	// $('.graphcontainer').append($('#canvasTemplate').html());
	var html = $('#canvasTemplate').html();
	$(html).insertBefore($('.newCanvas'));
});

$('.graphcontainer').on('click','.renewGraph',function(){
	$(this).parent().parent().find('.addgraph').html($('#insertGraph').html());

	console.log($(this))

	var infoHtml = getInfoHtml();
	$(this).parent().parent().find('.info').html(infoHtml);
});

// autoscrollup

$('.scrollup').click(function() {
  $('html,body').animate(
		{
      scrollTop: $('body').offset().top
		},
		'slow'
	);
});

// $('.removegraph').on('click', derp, function() {
// 	 $('.cloneA').replaceWith($('.addgraph:first').clone());
// });


// function derp() {
// 	$('.addgraph').each(function() {
// 		$('.addgraph').on('click', function() {
// 			$(this).replaceWith($('#insertGraph').clone().removeClass('clone').addClass('cloneA'));
// 		});
// 	});
// }
//
// $('.removegraph').on('click', derp, function() {
// 	 $('.cloneA').replaceWith($('.addgraph:first').clone());
// });
//
// derp();

// $('.removegraph').on('click', function() {
// 	$('.cloneA').remove();
// 	$('.addgraph').remove();
// 	$('.addgraph').clone();
// })
