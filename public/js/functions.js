var datavis = {
	loadOptions : {
		langs : [],
		checks : []
	},
	data : {
		countries : {
			list: [],
			stats : {}
		},
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
		filterCheck : function(checks,data){

			//fout!

			if(checks.length < 1){

			}else{
				
				for(var i = 0;i<data.length;i++){

					var target = data[i].checks;

					for (var iterationCheckKey in target){
					    if (typeof target[iterationCheckKey] !== 'function') {

					    	var found = false;
					    	for(var ii = 0;ii<checks.length;ii++){
					    		// console.log(String(checks[ii]))
					    		// console.log(target[iterationCheckKey])
					    		if(String(checks[ii]) == String(iterationCheckKey)){
					    			found = true;
					    			// console.log('match')
					    			break;
					    		}
					    	}

					    	if(!found){
					    		delete target[iterationCheckKey];
					    	}

					    }
					}

				}

			}
			console.log(checks);
			console.log(data);
			return data;
		}
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

