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

	$('#selectCountries').on('change',function(){
		console.log($(this).val());

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
			html += '<li class="list-group-item">'+datavis.loadOptions.langs[i]+' <span class="badge delCountry" data-type="'+datavis.loadOptions.langs[i]+'">&times;</span></li>'
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
	} )



});