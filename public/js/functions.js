var datavis = {
	loadOptions : {
		langs : []
	},
	data : {
		countries : {
			list: [],
			stats : {}
		},
		cardNumbersWithEmails : [],
		raw : [],
		merged : []
	},
	drempels : {
		denied : 80,
		checks : {
			check1 : function(percent){
				return Math.floor(percent * datavis.drempels.checks.check1Factor);
			},
			check1Factor : 1, //percentage factor
			check2 : {
				unknown : 20, //point -
				different : 10 //point -
			},
			check3 : function(times){
				if(times < 2){
					return 0;
				}else{
					return 20;
				}
			},
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
		}
	}
}