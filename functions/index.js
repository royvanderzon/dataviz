const functions = {
	check : function(req, res, next){
		console.log('Page loading!');
		return next();
	},
	data : {
		raw : []
	}
}

module.exports = functions;