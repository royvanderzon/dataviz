var functions = {
	hello : function(){
		var helloWorld = 'Hello world!';
		console.log(helloWorld);
		return helloWorld;
	},
	check : function(req, res, next){
		console.log('Middleware used!');
		return next();
	}
}

module.exports = functions;