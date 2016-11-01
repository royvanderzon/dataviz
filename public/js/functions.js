var datavis = {
	data : {
		raw : []
	},
	drempels : {
		denied : 100,
		checks : {
			check1 : function(percent){
				return Math.floor(percent * 1);
			},
			check2 : function(){
			}
		}
	}
}