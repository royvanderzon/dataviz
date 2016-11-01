//if there was already fraud on this card

var check6 = function(data,cb){

	var fraudCards = [];
	var fraudCardsCounter = 0;

	for(var i = 0;i<data.length;i++){

		if(data[i].fraud == 1){

			fraudCardsCounter++;

			if(fraudCards.length < 1){
				fraudCards.push(data[i].card_id);
			}

			var found = false;
			for(var ii = 0;ii<fraudCards.length;ii++){
				if(fraudCards[ii] == data[i].card_id){
					found = true;
					break;
				}
				
			}
			if(!found){
				fraudCards.push(data[i].card_id);
			}
		}

	}

	for(var i = 0;i<data.length;i++){

		var found = false;
		for(var ii = 0;ii<fraudCards.length;ii++){
			if(fraudCards[ii] == data[i].card_id){
				found = true;
				break;
			}
		}
		data[i].checks.check6 = {};
		if(found){
			data[i].checks.check6.points = datavis.drempels.checks.check6;
		}else{
			data[i].checks.check6.points = 0;
		}

	}

	if(typeof cb === 'function'){
		console.log('check 6 - DONE');
		cb(data);
	}

}