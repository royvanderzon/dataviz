//if there was already fraud on this email

var check5 = function(data,cb){

	var fraudEmails = [];
	var fraudEmailCounter = 0;

	for(var i = 0;i<data.length;i++){

		if(data[i].fraud == 1){

			fraudEmailCounter++;

			if(fraudEmails.length < 1){
				fraudEmails.push(data[i].email_id);
			}

			var found = false;
			for(var ii = 0;ii<fraudEmails.length;ii++){
				if(fraudEmails[ii] == data[i].email_id){
					found = true;
					break;
				}
				
			}
			if(!found){
				fraudEmails.push(data[i].email_id);
			}
		}

	}

	for(var i = 0;i<data.length;i++){

		var found = false;
		for(var ii = 0;ii<fraudEmails.length;ii++){
			if(fraudEmails[ii] == data[i].email_id){
				found = true;
				break;
			}
		}
		data[i].checks.check5 = {};
		if(found){
			data[i].checks.check5.points = datavis.drempels.checks.check5;
		}else{
			data[i].checks.check5.points = 0;
		}

	}

	if(typeof cb === 'function'){
		console.log('check 5 - DONE');
		cb(data);
	}

}