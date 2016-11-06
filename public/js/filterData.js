var filterData = function(data){

	//filter countries --> (language array,data)
	data = datavis.filters.filterLang(datavis.loadOptions.langs,data);

	return data;

}
