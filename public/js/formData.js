var formData = function(data){

	console.log(data);

	console.log(data[0]);

	var target = data[0].checks;
	var formedChecks = [];

	//iteration for each check
	for (var iterationCheckKey in target){
	    if (typeof target[iterationCheckKey] !== 'function') {

	    	console.log('/////////////////////////////////////////////////');
	        console.log("Key is " + iterationCheckKey + ", value is " + target[iterationCheckKey].points);

	        //make check obj
	        var obj = {};

	        obj.State = iterationCheckKey;
	        obj.alert = 0;
	        obj.denied = 0;
	        obj.fraud = 0;

	        //for this check get points of each transaction
	        for(var i = 0;i<data.length;i++){

	        	//check if alert
	        	var thisData = data[i];
	        	var thisChecks = thisData.checks;

	        	if(thisChecks[iterationCheckKey].points > 0){
	        		obj.alert++;
	
		        	//check if this transaction is denied
		        	if(thisData.fraud > 0){
		        		obj.fraud++;
		        	}

		        	//where totalpoints is higher, count denied
		        	var thisTotalPoints = 0;
		        	//loop --> checks in this data to see how much is denied
		        	for (var checkInThisData in thisChecks){
					    if (typeof thisChecks[checkInThisData] !== 'function') {
					    	thisTotalPoints = Number(thisTotalPoints) + Number(thisChecks[checkInThisData].points);
					    }
				    }

				    if(thisTotalPoints > 80){
				    	// console.log('Higheerrrr')
				    	obj.denied++;
				    }

	        	}

	        }

	        formedChecks.push(obj);

	    }
	}

	console.log(formedChecks);

	return formedChecks;
}