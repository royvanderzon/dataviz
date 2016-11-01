var datavis = {
	data : {
		countries : {
			list: [],
			stats : {}
		},
		raw : []
	},
	drempels : {
		denied : 100,
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
	}
}