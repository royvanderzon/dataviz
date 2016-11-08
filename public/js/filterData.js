var filterData = function(data){


	//als er naar emails wordt gezocht landen uit zetten!
	if(datavis.loadOptions.emails.length < 1){
		//filter countries --> (language array,data)
		data = datavis.filters.filterLang(datavis.loadOptions.langs,data);
		$('.addCountries').fadeTo(0.5,1);
	}else{
		$('.addCountries').fadeTo(1,0.5);
	}
	
	//filter users --> (users array,data)
	data = datavis.filters.filterUser(datavis.loadOptions.emails,data);

	return data;

}
