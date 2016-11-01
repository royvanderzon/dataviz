//shopper country is high risk

var test = [];

var check1 = function(data,cb){

	console.log(data);

	var shoppercountrycodes = {};
	var differentCountries = [];

	//loop --> all data to get all countries and set fraud
	for(var i = 0;i<data.length;i++){

		if(typeof shoppercountrycodes[data[i].shoppercountrycode] === 'object'){

			shoppercountrycodes[data[i].shoppercountrycode].aantal++;

			if(data[i].fraud == 0){
				shoppercountrycodes[data[i].shoppercountrycode].noFraud++;
			}else{
				shoppercountrycodes[data[i].shoppercountrycode].fraud++;
			}

		}else{

			var obj = {
				aantal : 1,
				fraud : 0,
				noFraud : 0
			}

			if(data[i].fraud == 0){
				obj.noFraud = 1;
			}else{
				obj.fraud = 1;
			}

			differentCountries.push(data[i].shoppercountrycode);

			shoppercountrycodes[data[i].shoppercountrycode] = obj;

		}

	}

	//set at each country fraud points and percentage
	for(var i = 0;i<differentCountries.length;i++){
		var fraudPercentage = shoppercountrycodes[differentCountries[i]].fraud * 100 / shoppercountrycodes[differentCountries[i]].aantal;
		shoppercountrycodes[differentCountries[i]].fraudPercentage = fraudPercentage;
		shoppercountrycodes[differentCountries[i]].risk = datavis.drempels.checks.check1(fraudPercentage);
	}

	for(var i = 0;i<data.length;i++){

		// console.log(data[i].shoppercountrycode);

		for(var ii = 0;ii<differentCountries.length;ii++){

			if(data[i].shoppercountrycode == differentCountries[ii]){
				// console.log('match!');

				// console.log(data[i].shoppercountrycode)
				data[i].checks = {};
				data[i].checks.check1 = shoppercountrycodes[differentCountries[ii]].risk;
				// data[i].checks.check1 = 1;

			}

		}

	}

	console.log(shoppercountrycodes);
	console.log(data);
	test = data;

	if(typeof cb === 'function'){
		console.log('check 1 - DONE');
		cb();
	}

}