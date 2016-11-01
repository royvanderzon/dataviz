//different countries

var check2 = function(data,cb){

	for(var i = 0;i<data.length;i++){
		if (data[i].issuercountrycode == '(unknown)' || data[i].issuercountrycode ==  '' || data[i].shoppercountrycode == '(unknown)' || data[i].shoppercountrycode == ''){
			data[i].checks.check2 = datavis.drempels.checks.check2.unknown;
		}else if(data[i].issuercountrycode != data[i].shoppercountrycode){
			data[i].checks.check2 = datavis.drempels.checks.check2.different;
		}else{
			data[i].checks.check2 = 0;
		}
	}

	if(typeof cb === 'function'){
		console.log('check 2 - DONE');
		cb(data);
	}

}