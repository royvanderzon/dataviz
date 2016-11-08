// // EXAMPLES
// var data1 = [{
// 	State: '1',
// 	alert: '5234',
// 	denied: '2300',
// 	fraud: '404'
// }, {
// 	State: '2',
// 	alert: '2505',
// 	denied: '2004',
// 	fraud: '403'
// }, {
// 	State: '3',
// 	alert: '1250',
// 	denied: '1200',
// 	fraud: '140'
// }, {
// 	State: '4',
// 	alert: '4250',
// 	denied: '3200',
// 	fraud: '240'
// }, {
// 	State: '5',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }, {
// 	State: '6',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }];

// var data2 = [{
// 	State: '1',
// 	alert: '250',
// 	denied: '200',
// 	fraud: '40'
// }, {
// 	State: '2',
// 	alert: '250',
// 	denied: '200',
// 	fraud: '40'
// }, {
// 	State: '3',
// 	alert: '250',
// 	denied: '200',
// 	fraud: '40'
// }, {
// 	State: '4',
// 	alert: '250',
// 	denied: '200',
// 	fraud: '40'
// }, {
// 	State: '5',
// 	alert: '250',
// 	denied: '200',
// 	fraud: '40'
// }];

// var data3 = [{
// 	State: '1',
// 	alert: '5234',
// 	denied: '2300',
// 	fraud: '404'
// }, {
// 	State: '2',
// 	alert: '2505',
// 	denied: '2004',
// 	fraud: '403'
// }, {
// 	State: '3',
// 	alert: '1250',
// 	denied: '1200',
// 	fraud: '140'
// }, {
// 	State: '4',
// 	alert: '4250',
// 	denied: '3200',
// 	fraud: '240'
// }, {
// 	State: '5',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }, {
// 	State: '6',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }, {
// 	State: '7',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }, {
// 	State: '8',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }, {
// 	State: '9',
// 	alert: '15250',
// 	denied: '4200',
// 	fraud: '1340'
// }, {
// 	State: '10',
// 	alert: '5250',
// 	denied: '4200',
// 	fraud: '1340'
// }];

// // RENDER

// var margin = {
// 		top: 20,
// 		right: 20,
// 		bottom: 30,
// 		left: 80
// 	},
// 	width = 480 - margin.left - margin.right,
// 	height = 370 - margin.top - margin.bottom;

// var x0 = d3.scale.ordinal()
// 	.rangeRoundBands([0, width], .1);

// var x1 = d3.scale.ordinal();

// var y = d3.scale.linear()
// 	.range([height, 0]);

// var color = d3.scale.ordinal()
// 	.range(["#683D3D", "#955757", "#C97979"]);

// var xAxis = d3.svg.axis()
// 	.scale(x0)
// 	.orient("bottom");

// var yAxis = d3.svg.axis()
// 	.scale(y)
// 	.orient("left")
// 	.ticks("10")

// var svg = d3.select("#insertGraph").append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var load = function(data) {

// 	var ageNames = d3.keys(data[0]).filter(function(key) {
// 		return key !== "State";
// 	});

// 	data.forEach(function(d) {
// 		d.ages = ageNames.map(function(name) {
// 			return {
// 				name: name,
// 				value: +d[name]
// 			};
// 		});
// 	});


// 	x0.domain(data.map(function(d) {
// 		return d.State;
// 	}));
// 	x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
// 	y.domain([0, d3.max(data, function(d) {
// 		return d3.max(d.ages, function(d) {
// 			return d.value;
// 		});
// 	})]);

// 	svg.select(".selectXAxis").remove();
// 	svg.append("g")
// 		.attr("class", "x axis selectXAxis")
// 		.attr("transform", "translate(0," + height + ")")
// 		.call(xAxis);

// 	svg.select(".selectYAxis").remove();
// 	svg.append("g")
// 		.attr("class", "y axis selectYAxis")
// 		.call(yAxis)
// 		.select("yText")
// 		.attr("transform", "rotate(-90)")
// 		.attr("y", 6)
// 		.attr("dy", ".71em")
// 		.style("text-anchor", "end")
// 		.text("Population");



// 	// var state = svg.selectAll(".state").data(data, function(d) { return d.state; })

// 	var state = svg.selectAll(".state").remove();
// 	state.selectAll("rect").remove();



// 	var state = svg.selectAll(".state")
// 		.data(data)
// 		.enter().append("g")
// 		.attr("class", "state")
// 		.attr("transform", function(d) {
// 			return "translate(" + x0(d.State) + ",0)";
// 		});

// 	state.selectAll("rect")
// 		.data(function(d) {
// 			return d.ages;
// 		})
// 		.enter().append("rect")
// 		.attr("width", x1.rangeBand())
// 		.attr("x", function(d) {
// 			return x1(d.name);
// 		})
// 		.attr("y", function(d) {
// 			return y(d.value);
// 		})
// 		.attr("height", function(d) {
// 			return height-9 - y(d.value);
// 		})
// 		.style("fill", function(d) {
// 			return color(d.name);
// 		});


// 	//clear data
// 	for (var i = 0; i < data.length; i++) {
// 		delete data[i].ages;
// 	}

// }

// EXAMPLES
var data1 = [{
	State: 'Check 1',
	alert: '5234',
	denied: '2300',
	lost: '404'
}, {
	State: 'Check 2',
	alert: '2505',
	denied: '2004',
	lost: '403'
}, {
	State: 'Check 3',
	alert: '1250',
	denied: '1200',
	lost: '140'
}, {
	State: 'Check 4',
	alert: '4250',
	denied: '3200',
	lost: '240'
}, {
	State: 'Check 5',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}, {
	State: 'Check 6',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}];

var data2 = [{
	State: 'Check 1',
	alert: '250',
	denied: '200',
	lost: '40'
}, {
	State: 'Check 2',
	alert: '250',
	denied: '200',
	lost: '40'
}, {
	State: 'Check 3',
	alert: '250',
	denied: '200',
	lost: '40'
}, {
	State: 'Check 4',
	alert: '250',
	denied: '200',
	lost: '40'
}, {
	State: 'Check 5',
	alert: '250',
	denied: '200',
	lost: '40'
}];

var data3 = [{
	State: 'Check 1',
	alert: '5234',
	denied: '2300',
	lost: '404'
}, {
	State: 'Check 2',
	alert: '2505',
	denied: '2004',
	lost: '403'
}, {
	State: 'Check 3',
	alert: '1250',
	denied: '1200',
	lost: '140'
}, {
	State: 'Check 4',
	alert: '4250',
	denied: '3200',
	lost: '240'
}, {
	State: 'Check 5',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}, {
	State: 'Check 6',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}, {
	State: 'Check 7',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}, {
	State: 'Check 8',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}, {
	State: 'Check 9',
	alert: '15250',
	denied: '4200',
	lost: '1340'
}, {
	State: 'Check 10',
	alert: '5250',
	denied: '4200',
	lost: '1340'
}];

// RENDER

var tooltip = d3.select("body")
	.append("div")
	.attr("class","tip")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("Tooltip");

var margin = {
		top: 40,
		right: 40,
		bottom: 30,
		left: 40
	},
	width = document.querySelector('.graphContainer').offsetWidth - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
	.range([height, 0]);

var color = d3.scale.ordinal()
	.range(["#683D3D", "#955757", "#C97979"]);

var xAxis = d3.svg.axis()
	.scale(x0)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(d3.format("1"));
	// .tickFormat(d3.format(".2s"));

var svg = d3.select("#insertGraph").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var titleLabels = [{ 
		cx: -20, 
		cy: -22, 
		radius: 20, 
		label : "email accounts : " + datavis.data.counts.emails 
	},{ 
		cx: -20, 
		cy: -11, 
		radius: 20, 
		label : "transactions : " + datavis.data.counts.transactions
	}];

var text = svg.selectAll("text")
    .data(titleLabels)
    .enter()
	.append("text")
	.attr("class","textLabels");

var getPercentage = function(input){

	return (input * 100 / datavis.data.counts.transactions).toFixed(2);

}

var renderToolHtml = function(d){

	var html = '';

	html += '<div class="tipcontainer">';

	html += '<p><strong>';
	html += datavis.checkDefenitions[d.State];
	html += '</strong></p>';

	html += '<ul class="tooltip-ul">';
	html += '<li>Alert : <strong>'+d.alert+'</strong> - <em>('+ getPercentage(d.alert)  +'% of total transactions.)</em></li>';
	html += '<li>Denied : <strong>'+d.denied+'</strong> - <em>('+ getPercentage(d.denied)  +'% of total transactions.)</em></li>';
	html += '<li>Fraud : <strong>'+d.fraud+'</strong> - <em>('+ getPercentage(d.fraud)  +'% of total transactions.)</em></li>';
	html += '<li>Email accounts : <strong>'+datavis.data.counts.emails+'</strong></li>';
	html += '<li>Transactions : <strong>'+datavis.data.counts.transactions+'</strong></li>';
	html += '</ul>';

	html += '</div>';

	return html;

}

var load = function(data) {


	var ageNames = d3.keys(data[0]).filter(function(key) {
		return key !== "State";
	});

	data.forEach(function(d) {
		d.ages = ageNames.map(function(name) {
			return {
				name: name,
				value: +d[name]
			};
		});
	});

	//add totals bar
	if(datavis.settings.showTotal){

		var totalBar = {};
		totalBar.State = 'total';
		totalBar.ages = [];
		totalBar.alert = datavis.data.counts.alert;
		totalBar.denied = datavis.data.counts.denied;
		totalBar.fraud = datavis.data.counts.fraud;

		var agesArray = [{
			name : 'alert',
			value : totalBar.alert
		},{
			name : 'denied',
			value : totalBar.denied
		},{
			name : 'fraud',
			value : totalBar.fraud
		}];

		totalBar.ages = agesArray;

		data.unshift(totalBar);
		
	}
	// console.log(data);

	//set text labels with totals
	svg.selectAll(".textLabels").remove();

	var titleLabels = [{ 
		cx: -20, 
			cy: -30, 
			radius: 20, 
			label : "email accounts : " + datavis.data.counts.emails 
		},{ 
			cx: -20, 
			cy: -17, 
			radius: 20, 
			label : "transactions : " + datavis.data.counts.transactions
		}];

	var text = svg.selectAll("textLabels")
	    .data(titleLabels)
	    .enter()
		.append("text")
		.attr("class","textLabels");

	var textLabels = text
     	.attr("x", function(d) { return d.cx; })
     	.attr("y", function(d) { return d.cy; })
     	.text( function (d) { return d.label; })
     	.attr("font-family", "sans-serif")
     	.attr("font-size", "12px")
        .attr("fill", "#333");

    //set domains 
	x0.domain(data.map(function(d) {
		return d.State;
	}));
	x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	y.domain([0, d3.max(data, function(d) {
		return d3.max(d.ages, function(d) {
			return d.value;
		});
	})]);

	svg.select(".selectXAxis").remove();
	svg.append("g")
		.attr("class", "x axis selectXAxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.select(".selectYAxis").remove();
	svg.append("g")
		.attr("class", "y axis selectYAxis")
		.call(yAxis)
		.select("yText")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Population");



	// var state = svg.selectAll(".state").data(data, function(d) { return d.state; })

	var state = svg.selectAll(".state").remove();
	state.selectAll("rect").remove();
	svg.selectAll(".averageLine").remove();
	svg.selectAll(".barsEndlineText").remove();



	var state = svg.selectAll(".state")
		.data(data)
		.enter().append("g")
		.attr("class", "state")
		.attr("transform", function(d) {
			return "translate(" + x0(d.State) + ",0)";
		}).on("mouseover", function(d,i) {
			tooltip.html(renderToolHtml(d));
			tooltip.style("visibility", "visible");
		}).on("mousemove",function(){
			tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
		})
		.on("mouseout", function(d, i) {
				tooltip.style("visibility", "hidden");
		});
			// d3.select(otherEl[i])
			// 	.attr("fill", "steelblue");
			// d3.select(this)
			// 	.attr("fill", "steelblue");
			// tooltip.html(createTipList(d));

	state.selectAll("rect")
		.data(function(d) {
			return d.ages;
		})
		.enter().append("rect")
		.attr("width", x1.rangeBand())
		.attr("x", function(d) {
			return x1(d.name);
		})
		.attr("y", function(d) {
			return y(d.value);
		})
		.attr("height", function(d) {
			return height - y(d.value);
		})
		.style("fill", function(d) {
			return color(d.name);
		});

	var legend = svg.selectAll(".legend").remove();
	var legend = svg.selectAll(".legend")
		.data(ageNames.slice().reverse())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
			return "translate(0," + i * 20 + ")";
		});

	legend.select("rect").remove();
	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);

	legend.select("text").remove();
	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {
			return d;
		});

	if(datavis.settings.averageLine){

		console.log(data);

		//set averages
		var averages = {};
		averages.alert = 0;
		averages.denied = 0;
		averages.fraud = 0;

		for(var i = 0;i<data.length;i++){
			averages.alert = averages.alert + data[i].alert;
			averages.denied = averages.denied + data[i].denied;
			averages.fraud = averages.fraud + data[i].fraud;
		}

		console.log(averages.alert)
		console.log(averages.denied)
		console.log(averages.fraud)

		averages.alert = averages.alert / data.length;
		averages.denied = averages.denied / data.length;
		averages.fraud = averages.fraud / data.length;
			
		//average lines
		var line = svg.append('g');

		//alert
		line.append("line")
			.attr("class","averageLine")
		    .style("stroke", "#333")
		    .attr("stroke-width","1")
		    .attr("x1", 0)
		    .attr('transform','translate(0,'+y(averages.alert)+')')
		    .attr("x2", width);

	    line.append('text')
            .attr('class', 'barsEndlineText')
		    .attr('transform','translate('+(width-20)+','+y(averages.alert)+')')
            .text('alert ' + (averages.alert.toFixed(0)));

        //denied
        line.append("line")
			.attr("class","averageLine")
		    .style("stroke", "#333")
		    .attr("stroke-width","1")
		    .attr("x1", 0)
		    .attr('transform','translate(0,'+y(averages.denied)+')')
		    .attr("x2", width);

	    line.append('text')
            .attr('class', 'barsEndlineText')
		    .attr('transform','translate('+(width-20)+','+y(averages.denied)+')')
            .text('denied ' + (averages.denied.toFixed(0)));

        //fraud
        line.append("line")
			.attr("class","averageLine")
		    .style("stroke", "#333")
		    .attr("stroke-width","1")
		    .attr("x1", 0)
		    .attr('transform','translate(0,'+y(averages.fraud)+')')
		    .attr("x2", width);

	     line.append('text')
            .attr('class', 'barsEndlineText')
		    .attr('transform','translate('+(width-20)+','+y(averages.fraud)+')')
            .text('fraud ' + (averages.fraud.toFixed(0)));

	}

	//clear data
	for (var i = 0; i < data.length; i++) {
		delete data[i].ages;
	}

}