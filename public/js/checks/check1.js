//shopper country is high risk

const check1 = function(data,cb){

	console.log(data);

	const shoppercountrycodes = {};
	const differentCountries = [];

	for(const i = 0;i<data.length;i++){

		if(typeof shoppercountrycodes[data[i].shoppercountrycode] === 'object'){

			// if(data[i].shoppercountrycode.length == 0){
			// 	data[i].shoppercountrycode = '(unknown)';
			// }

			shoppercountrycodes[data[i].shoppercountrycode].aantal++;

			if(data[i].fraud == 0){
				shoppercountrycodes[data[i].shoppercountrycode].noFraud++;
			}else{
				shoppercountrycodes[data[i].shoppercountrycode].fraud++;
			}

		}else{

			const obj = {
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



	// for(const i = 0;i<differentCountries.length;i++){

	// 	console.log(i);

	// 	const risk = shoppercountrycodes[i].fraud * 100 / shoppercountrycodes[i].aantal;
	// 	shoppercountrycodes[i].risk = risk;

	// 	console.log(shoppercountrycodes[i]);

	// }

	console.log(differentCountries);

	// switch(1) {
 //    case 1:
 //    	console.log('hallo')
 //    	break;
 //    default:
 //    	console.log('default');
 //    	break;
// }

	console.log(shoppercountrycodes);

	if(typeof cb === 'function'){
		console.log('check 1 - DONE');
		cb();
	}

}