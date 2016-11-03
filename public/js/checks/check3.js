//Card number already used by other shopper (shopper email)

var check3 = function(data,cb){

	var cardNumbers = [];
	var cardNumbersWithEmails = [];

	//get all unique card numbers
	for(var i = 0;i<data.length;i++){

		if(cardNumbers.length < 1){
			cardNumbers.push(data[i].card_id);
		}

		var found = false;
		for(var ii = 0;ii<cardNumbers.length;ii++){
			if(cardNumbers[ii] == data[i].card_id){
				found = true;
				break;
			}
		}
		if(!found){
			cardNumbers.push(data[i].card_id);
		}

	}

	//get all emails used by the cards
	//loop --> cardnumbers
	for(var i = 0;i<cardNumbers.length;i++){

		var obj = {};
		obj.emails = [];
		obj.countTransactions = 0;
		obj.card_id = cardNumbers[i];

		//loop --> data
		for(var ii =0;ii<data.length;ii++){
			if(cardNumbers[i] == data[ii].card_id){
				var found = false;

				//loop --> emails
				for(var iii = 0;iii<obj.emails.length;iii++){
					if(obj.emails[iii] == data[ii].email_id){
						found = true;
						break;
					}
				}
				if(!found){
					obj.emails.push(data[ii].email_id);
				}
				obj.countTransactions++;
			}
		}
		cardNumbersWithEmails.push(obj);
	}

	// console.log(cardNumbersWithEmails);

	//set points to data
	for(var i = 0;i<data.length;i++){
		
		for(var ii = 0;ii<cardNumbersWithEmails.length;ii++){

			if(data[i].card_id == cardNumbersWithEmails[ii].card_id){
				
				data[i].checks.check3 = {
					data : cardNumbersWithEmails[ii],
					points : datavis.drempels.checks.check3(cardNumbersWithEmails[ii].emails.length)
				}
			}

		}

	}

	datavis.data.cardNumbersWithEmails = cardNumbersWithEmails;


	// cardNumbersWithEmails.sort()
	// console.log(cardNumbers);
	// console.log(cardNumbersWithEmails)

	if(typeof cb === 'function'){
		console.log('check 3 - DONE');
		cb(data);
	}

}