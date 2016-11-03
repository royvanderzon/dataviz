var handleLangSelect = function(){
	var html = '';
	datavis.data.countries.list.sort();
	for(var i = 0;i<datavis.data.countries.list.length;i++){
		if(datavis.data.countries.list[i] != ''){
			html += '<option>'+datavis.data.countries.list[i]+'</option>';
		}
	}

	$('#selectCountries').html(html);
	$('#selectCountries').selectpicker('refresh');
}