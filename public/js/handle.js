var handleChecks = function(){

	var html = '';
	datavis.data.checksList.sort();
	datavis.data.checksList.unshift('ALL CHECKS')
	for(var i = 0;i<datavis.data.checksList.length;i++){
		console.log(datavis.data.checksList[i])
		if(datavis.data.checksList[i] != ''){
			html += '<option value="'+datavis.data.checksList[i]+'">'+datavis.data.checksList[i]+'</option>';
		}
	}
	console.log(html)
	$('#selectChecks').html(html);
	$('#selectChecks').selectpicker('refresh');
}

var handleLangSelect = function(){
	var html = '';
	datavis.data.countries.list.sort();
	datavis.data.countries.list.unshift('ALL COUNTRIES')
	for(var i = 0;i<datavis.data.countries.list.length;i++){
		if(datavis.data.countries.list[i] != ''){
			html += '<option value="'+datavis.data.countries.list[i]+'">'+datavis.data.countries.list[i]+'</option>';
		}
	}

	$('#selectCountries').html(html);
	$('#selectCountries').selectpicker('refresh');
}

$(document).ready(function(){

	///////////////////////////////////////////////////////
	// ADD COUNTRIES
	///////////////////////////////////////////////////////

	$('#selectCountries').on('change',function(){
		var found = (datavis.loadOptions.langs.indexOf($(this).val()) > -1);
		if(!found){
			datavis.loadOptions.langs.push($(this).val());
		}

		if($(this).val() == 'ALL COUNTRIES'){
			datavis.loadOptions.langs = [];
			$(this).val('ALL COUNTRIES');
		}

		var html = '';
		for(var i = 0;i<datavis.loadOptions.langs.length;i++){
			html += '<li class="list-group-item">'+datavis.loadOptions.langs[i]+' <span class="badge delCountry removeButton" data-type="'+datavis.loadOptions.langs[i]+'">&times;</span></li>'
		}
		$('.addCountries').html(html);
		refresh();
	})

	$( ".addCountries" ).on( "click", ".delCountry", function(){
		$(this).parent().remove();
		for(var i = 0;i<datavis.loadOptions.langs.length;i++){
			if(datavis.loadOptions.langs[i] == $(this).attr('data-type')){
				datavis.loadOptions.langs.splice(i,1)
			}
		}
		refresh();
	} );

	///////////////////////////////////////////////////////
	// ADD CHECKS
	///////////////////////////////////////////////////////

	$('#selectChecks').on('change',function(){

		console.log(datavis.loadOptions.checks)
		var found = (datavis.loadOptions.checks.indexOf($(this).val()) > -1);
		if(!found){
			datavis.loadOptions.checks.push($(this).val());
		}

		if($(this).val() == 'ALL CHECKS'){
			datavis.loadOptions.checks = [];
			$(this).val('ALL CHECKS');
		}

		var html = '';
		for(var i = 0;i<datavis.loadOptions.checks.length;i++){
			html += '<li class="list-group-item">'+datavis.loadOptions.checks[i]+' <span class="badge removeButton delCheck" data-type="'+datavis.loadOptions.checks[i]+'">&times;</span></li>'
		}
		$('.addChecks').html(html);
		refresh();
	});

	$( ".addChecks" ).on( "click", ".delCheck", function(){
		$(this).parent().remove();
		for(var i = 0;i<datavis.loadOptions.checks.length;i++){
			if(datavis.loadOptions.checks[i] == $(this).attr('data-type')){
				datavis.loadOptions.checks.splice(i,1)
			}
		}
		refresh();
	} );
	

});