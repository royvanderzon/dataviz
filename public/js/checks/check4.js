//The transaction is created during the night

var check4 = function(data,cb){

	for (var i = 0; i < data.length; i++) {
		var points = 0;

		var creationdate = moment(data[i].creationdate, 'YYYY-MM-DD HH:mm:ss');
		var startNight = moment(data[i].creationdate, 'YYYY-MM-DD HH:mm:ss').hours(1).minutes(0).seconds(0);
		var endNight = moment(data[i].creationdate, 'YYYY-MM-DD HH:mm:ss').hours(5).minutes(0).seconds(0);

		if (creationdate.isBetween(startNight, endNight)) {
			points = 5;
		}

		data[i].checks.check4 = {};
		data[i].checks.check4.points = points;
	}

	if(typeof cb === 'function'){
		console.log('check 4 - DONE');
		cb(data);
	}

}
