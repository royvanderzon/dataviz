var datavis = {
	loadOptions : {
		langs : [],
		checks : [],
		emails : []
	},
	settings : {
		showTotal : false,
		averageLine : false
	},
	data : {
		countries : {
			list: [],
			stats : {}
		},
		counts : {
			emails : 0,
			transactions : 0,
			alert : 0,
			denied : 0,
			fraud : 0
		},
		uniqueEmails : [],
		cardNumbersWithEmails : [],
		raw : [],
		merged : [],
		checksList : []
	},
	drempels : {
		denied : 80,
		checks : {
			check1 : function(percent){
				return Math.floor(percent * datavis.drempels.checks.check1Factor);
			},
			check1Factor : 1, //percentage factor
			check2 : {
				unknown : 10, //point -
				different : 10 //point -
			},
			check3 : function(times){
				if(times < 2){
					return 0;
				}else{
					return datavis.drempels.checks.check3Points;
				}
			},
			check3Points : 20,
			check5 : 35,
			check6 : 35
		}
	},
	getters : {
		emails : function(data){

			var newData = [];

			newData.push(data[0].email_id);

			for(var i = 0;i<data.length;i++){

				var found = false;
				for(var ii = 0;ii<newData.length;ii++){
					if(newData[ii] == data[i].email_id){
						found = true;
						break;
					}
				}
				if(!found){
					newData.push(data[i].email_id);
				}

			}

			datavis.data.uniqueEmails = newData;
			return data;
		},
		countEmails : function(data){

			var newData = [];

			newData.push(data[0].email_id);

			for(var i = 0;i<data.length;i++){

				var found = false;
				for(var ii = 0;ii<newData.length;ii++){
					if(newData[ii] == data[i].email_id){
						found = true;
						break;
					}
				}
				if(!found){
					newData.push(data[i].email_id);
				}

			}

			return newData.length;
		},
		setCounts: function(data){

			datavis.data.counts.alert = 0;
			datavis.data.counts.denied = 0;
			datavis.data.counts.fraud = 0;

			for(var i = 0;i<data.length;i++){
			// for(var i = 0;i<300;i++){

				if(data[i].fraud == '1'){
					datavis.data.counts.fraud++;
				}

				//where totalpoints is higher, count denied
	        	var thisTotalPoints = 0;
	        	var thisChecks = data[i].checks;
	        	//loop --> checks in this data to see how much is denied
	        	for (var checkInThisData in thisChecks){
				    if (typeof thisChecks[checkInThisData] !== 'function') {
				    	// console.log(checkInThisData)
				    	if(thisChecks[checkInThisData].points>0){
				    		datavis.data.counts.alert++;
				    	}
				    	thisTotalPoints = Number(thisTotalPoints) + Number(thisChecks[checkInThisData].points);
				    }
			    }
			    if(thisTotalPoints > datavis.drempels.denied){
			    	datavis.data.counts.denied++;
			    }

			}
		}
	},
	filters : {
		filterLang : function(langs,data){

			var newData = [];
			if(langs.length < 1){
				newData = data;
			}else{
				//langs = ['NL','CO','CA','US','DE'];

				for(var i = 0;i<data.length;i++){

					var found = false;
					for(var ii = 0;ii<langs.length;ii++){

						if(data[i].shoppercountrycode == langs[ii]){
							found = true;
						}

					}
					if(found){
						newData.push(data[i]);
					}

				}

			}
			return newData;
		},
		filterUser : function(users,data){
		// data = datavis.filters.filterUser(datavis.loadOptions.users,data);

			if(typeof users !== 'undefined'){

				var newData = [];
				//RANDOM PEOPLE
				// var users = ['email1384'];
				// var users = ['email1318'];
				// var users = ['email64'];
				//FRAUDEURRRRR
				// var users = ['email1613'];
				if(users.length < 1){
					newData = data;
				}else{
					//users = ['NL','CO','CA','US','DE'];

					for(var i = 0;i<data.length;i++){

						var found = false;
						for(var ii = 0;ii<users.length;ii++){

							if(data[i].email_id == users[ii]){
								found = true;
							}

						}
						if(found){
							newData.push(data[i]);
						}

					}

				}
				return newData;
			}else{
				return data;
			}
		}
	},
	checkDefinitions : {
		check1 : 'Shopper country is high risk',
		check2 : 'Different countries used by the same shopper email address',
		check3 : 'Card number already used by other shopper (shopper email)',
		check4 : 'The transaction is made by night',
		check5 : 'This email address has been marked as fraud before',
		check6 : 'This card number has been marked as fraud before',
		total : 'Total stats of this graph'
	}
}

var setLocal = function(data){
	localStorage.setItem('savedStates',JSON.stringify(data));
}

var getLocal = function(){
	var get = localStorage.getItem('savedStates');
	var parseGet = JSON.parse(get);
	return parseGet;
}

var saved = JSON.parse(localStorage.getItem('savedStates'));
if(saved === null){
	var saveStates = [];
	setLocal(saveStates);
}

var addCounter = function(){
	var counter = Number(localStorage.getItem('counter'));
	counter++;
	localStorage.setItem('counter',counter);
}

var getCounter = function(){
	return Number(localStorage.getItem('counter'));
}

var stateCounter = JSON.parse(localStorage.getItem('counter'));
if(stateCounter === null){
	var counter = 0;
	localStorage.setItem('counter',counter);
}
