function compare(a,b) {
  if (a.email_id < b.email_id){
    return -1;
  }
  if (a.email_id > b.email_id){
    return 1;
  }
  return 0;
}

var handleLangSelect = function(){
	var html = '';
	datavis.data.countries.list.sort();
	datavis.data.countries.list.unshift('ALL COUNTRIES');
	for(var i = 0;i<datavis.data.countries.list.length;i++){
		if(datavis.data.countries.list[i] != ''){
			var ISOCountryCode = datavis.data.countries.list[i];
			var fullCountryName = getCountryName(ISOCountryCode);

			html += '<option value="'+ISOCountryCode+'">'+fullCountryName+'</option>';
		}
	}

	$('#selectCountries').html(html);
	$('#selectCountries').selectpicker('refresh');
}

var handleChecks = function(){

	var html = '';
	datavis.data.checksList.sort();
	datavis.data.checksList.unshift('ALL CHECKS')
	for(var i = 0;i<datavis.data.checksList.length;i++){
		// console.log(datavis.data.checksList[i])
		if(datavis.data.checksList[i] != ''){
			html += '<option value="'+datavis.data.checksList[i]+'">'+datavis.data.checksList[i]+'</option>';
		}
	}

	$('#selectChecks').html(html);
	$('#selectChecks').selectpicker('refresh');
}

var handleEmail = function(){

	var html = '';
	datavis.data.uniqueEmailsWithFraud.sort(compare);
	datavis.data.uniqueEmailsWithFraud.unshift({
		email_id : 'ALL EMAILS',
		fraud : 0
	})

	if(datavis.settings.fraudEmails){

		html += '<option class="none hide" value="'+datavis.data.uniqueEmailsWithFraud[0].email_id+'">'+datavis.data.uniqueEmailsWithFraud[0].email_id+'</option>';
		html += '<option value="'+datavis.data.uniqueEmailsWithFraud[0].email_id+'">'+datavis.data.uniqueEmailsWithFraud[0].email_id+'</option>';
		// for(var i = 0;i<50;i++){
		for(var i = 0;i<datavis.data.uniqueEmailsWithFraud.length;i++){
			if(datavis.data.uniqueEmailsWithFraud[i].email_id != ''){
				if(datavis.data.uniqueEmailsWithFraud[i].fraud > 0){
					html += '<option class="lightRed" value="'+datavis.data.uniqueEmailsWithFraud[i].email_id+'">'+datavis.data.uniqueEmailsWithFraud[i].email_id+'</option>';
				}
			}
		}

	}else{

		for(var i = 0;i<50;i++){
			if(datavis.data.uniqueEmailsWithFraud[i].email_id != ''){
				if(datavis.data.uniqueEmailsWithFraud[i].fraud < 1){
					html += '<option value="'+datavis.data.uniqueEmailsWithFraud[i].email_id+'">'+datavis.data.uniqueEmailsWithFraud[i].email_id+'</option>';
				}else{
					html += '<option class="lightRed" value="'+datavis.data.uniqueEmailsWithFraud[i].email_id+'">'+datavis.data.uniqueEmailsWithFraud[i].email_id+'</option>';
				}
			}
		}

	}

	$('#selectEmail').html(html);
	$('#selectEmail').selectpicker('refresh');
}


$(document).ready(function(){

	///////////////////////////////////////////////////////
	// ADD COUNTRIES
	///////////////////////////////////////////////////////

	var refreshCountrySelect = function(){
		$('.addCountries').html();
		var html = '';


		for(var i = datavis.loadOptions.langs.length-1;i>-1;i--){
			var ISOCountryCode = datavis.loadOptions.langs[i];
 			var fullCountryName = getCountryName(ISOCountryCode);
 			html += '<li class="list-group-item">'+fullCountryName+' <span class="badge delCountry removeButton" data-type="'+datavis.loadOptions.langs[i]+'">&times;</span></li>'
			// for(var i = 0;i<datavis.loadOptions.langs.length;i++){
			// html += '<li class="list-group-item">'+datavis.loadOptions.langs[i]+' <span class="badge delCountry removeButton" data-type="'+datavis.loadOptions.langs[i]+'">&times;</span></li>'
		}

		$('.addCountries').html(html);
	}

	$('#selectCountries').on('change',function(){
		var found = (datavis.loadOptions.langs.indexOf($(this).val()) > -1);
		if(!found){
			datavis.loadOptions.langs.push($(this).val());
		}

		if($(this).val() == 'ALL COUNTRIES'){
			datavis.loadOptions.langs = [];
			$(this).val('ALL COUNTRIES');
		}

		refreshCountrySelect();

		refresh();
	})

	$( ".addCountries" ).on( "click", ".delCountry", function(){
		$(this).parent().remove();
		for(var i = 0;i<datavis.loadOptions.langs.length;i++){
			if(datavis.loadOptions.langs[i] == $(this).attr('data-type')){
				datavis.loadOptions.langs.splice(i,1)
			}
		}
		refresh();
	} );

	///////////////////////////////////////////////////////
	// ADD CHECKS
	///////////////////////////////////////////////////////

	var refreshChecksSelect = function(){
		$('.addChecks').html();
		var html = '';
		// for(var i = 0;i<datavis.loadOptions.checks.length;i++){
		for(var i = datavis.loadOptions.checks.length-1;i>-1;i--){
			html += '<li class="list-group-item">'+datavis.loadOptions.checks[i]+' <span class="badge removeButton delCheck" data-type="'+datavis.loadOptions.checks[i]+'">&times;</span></li>'
		}
		$('.addChecks').html(html);
	}

	$('#selectChecks').on('change',function(){

		var found = (datavis.loadOptions.checks.indexOf($(this).val()) > -1);
		if(!found){
			datavis.loadOptions.checks.push($(this).val());
		}

		if($(this).val() == 'ALL CHECKS'){
			datavis.loadOptions.checks = [];
			$(this).val('ALL CHECKS');
		}

		refreshChecksSelect();
		refresh();
	});

	$( ".addChecks" ).on( "click", ".delCheck", function(){
		$(this).parent().remove();
		for(var i = 0;i<datavis.loadOptions.checks.length;i++){
			if(datavis.loadOptions.checks[i] == $(this).attr('data-type')){
				datavis.loadOptions.checks.splice(i,1)
			}
		}
		refresh();
	} );

	///////////////////////////////////////////////////////
	// ADD USER EMAILS
	///////////////////////////////////////////////////////

	var refreshUsersSelect = function(){
		$('.addUsers').html();
		var html = '';
		// for(var i = 0;i<datavis.loadOptions.checks.length;i++){
		for(var i = datavis.loadOptions.emails.length-1;i>-1;i--){
			html += '<li class="list-group-item">'+datavis.loadOptions.emails[i]+' <span class="badge removeButton delUser" data-type="'+datavis.loadOptions.emails[i]+'">&times;</span></li>'
		}
		$('.addUsers').html(html);
	}

	$('#selectEmail').on('change',function(){

		var found = (datavis.loadOptions.emails.indexOf($(this).val()) > -1);
		if(!found){
			datavis.loadOptions.emails.push($(this).val());
		}

		if($(this).val() == 'ALL EMAILS'){
			datavis.loadOptions.emails = [];
			$(this).val('ALL EMAILS');
		}

		refreshUsersSelect();
		refresh();
	});

	$( ".addUsers" ).on( "click", ".delUser", function(){
		$(this).parent().remove();
		for(var i = 0;i<datavis.loadOptions.emails.length;i++){
			if(datavis.loadOptions.emails[i] == $(this).attr('data-type')){
				datavis.loadOptions.emails.splice(i,1)
			}
		}
		refresh();
	} );

	///////////////////////////////////////////////////////
	// SAVE STATE
	///////////////////////////////////////////////////////

	$('.saveState').click(function(){

		var saveObj = {};

		saveObj.name = prompt('Save State name?');
		saveObj.id = getCounter();
		saveObj.time = moment().unix();
		saveObj.langs = datavis.loadOptions.langs;
		saveObj.checks = datavis.loadOptions.checks;
		saveObj.emails = datavis.loadOptions.emails;

		addCounter();

		var saveStates = getLocal();

		saveStates.push(saveObj);

		setLocal(saveStates)

		refreshSaveList();

	});

	$( ".saveStateList" ).on( "click", ".loadState", function(){

		var thisID = $(this).parent().attr('data-type');

		var saveStates = getLocal();

		for(var i = 0;i<saveStates.length;i++){
			if(Number(saveStates[i].id) == Number(thisID)){

				// var newObj = jQuery.extend({},true,saveStates[i]);

				// console.log(newObj);

				datavis.loadOptions = JSON.parse(JSON.stringify(saveStates[i]));

				// console.log(datavis.loadOptions);

				refresh();
				refreshChecksSelect();
				refreshCountrySelect();
				refreshUsersSelect();
				break;
			}
		}


	});

	$( ".saveStateList" ).on( "click", ".delSaveState", function(){

		var thisID = $(this).parent().attr('data-type');
		var saveStates = getLocal();

		console.log(thisID)
		console.log(saveStates)

		for(var i = 0;i<saveStates.length;i++){
			console.log(saveStates[i])
			if(saveStates[i].id == thisID){
				saveStates.splice(i,1);
				setLocal(saveStates);
				refreshSaveList();
				break;
			}
		}

	});

});

var refreshSaveList = function(){

	var saveStates = getLocal();
	var html = '';
	saveStates.sort();
	// for(var i = 0;i<saveStates.length;i++){
	for(var i = saveStates.length-1;i>-1;i--){
		html += '<li class="list-group-item" data-type="'+saveStates[i].id+'"><strong>'+saveStates[i].id+'</strong> - '+saveStates[i].name+'<span class="badge cursor delSaveState">&times;</span><span class="badge cursor loadState"><i class="fa fa-arrow-left"></i></span></li>';
	}
	$('.saveStateList').html();
	$('.saveStateList').html(html);

}


//plus minus buttons
$(document).ready(function(){

	//drempel
	$('#spinner0').val(datavis.drempels.denied);
	$('#spinner0').on('change',function(){
		datavis.drempels.denied = Number($(this).val());
		init();
		refresh();
	})

	//check 1
	$('#spinner1').val(datavis.drempels.checks.check1Factor);
	$('#spinner1').on('change',function(){
		datavis.drempels.checks.check1Factor = Number($(this).val());
		init();
		refresh();
	})

	//check 2
	$('#spinner2').val(datavis.drempels.checks.check2);
	$('#spinner2').on('change',function(){
		datavis.drempels.checks.check2.unknown = Number($(this).val());
		datavis.drempels.checks.check2.different = Number($(this).val());
		init();
		refresh();
	})

	//check 3
	$('#spinner3').val(datavis.drempels.checks.check3Points);
	$('#spinner3').on('change',function(){
		datavis.drempels.checks.check3Points = Number($(this).val());
		init();
		refresh();
	})

	//check 5
	$('#spinner5').val(datavis.drempels.checks.check5);
	$('#spinner5').on('change',function(){
		datavis.drempels.checks.check5 = Number($(this).val());
		init();
		refresh();
	})

	//check 6
	$('#spinner6').val(datavis.drempels.checks.check6);
	$('#spinner6').on('change',function(){
		datavis.drempels.checks.check6 = Number($(this).val());
		init();
		refresh();
	})

})
