var datavis = {
	data : {
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
				unknown : 10,
				different : 5
			}
		}
	}
}