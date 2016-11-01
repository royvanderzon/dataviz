///////////////////////////////////////////////////////
//# INIT
///////////////////////////////////////////////////////

const init = function(cb){

	const data = datavis.data.raw;

	//check 1
	check1(data,function(){

		if(typeof cb === 'function'){
			cb();
		}	

	})


}

init(function(){
	console.log('All checks - DONE');
});