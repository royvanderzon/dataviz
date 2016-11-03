// EXAMPLES
var data1 = [{
	State: '1',
	alert: '5234',
	denied: '2300',
	fraud: '404'
}, {
	State: '2',
	alert: '2505',
	denied: '2004',
	fraud: '403'
}, {
	State: '3',
	alert: '1250',
	denied: '1200',
	fraud: '140'
}, {
	State: '4',
	alert: '4250',
	denied: '3200',
	fraud: '240'
}, {
	State: '5',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}, {
	State: '6',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}];

var data2 = [{
	State: '1',
	alert: '250',
	denied: '200',
	fraud: '40'
}, {
	State: '2',
	alert: '250',
	denied: '200',
	fraud: '40'
}, {
	State: '3',
	alert: '250',
	denied: '200',
	fraud: '40'
}, {
	State: '4',
	alert: '250',
	denied: '200',
	fraud: '40'
}, {
	State: '5',
	alert: '250',
	denied: '200',
	fraud: '40'
}];

var data3 = [{
	State: '1',
	alert: '5234',
	denied: '2300',
	fraud: '404'
}, {
	State: '2',
	alert: '2505',
	denied: '2004',
	fraud: '403'
}, {
	State: '3',
	alert: '1250',
	denied: '1200',
	fraud: '140'
}, {
	State: '4',
	alert: '4250',
	denied: '3200',
	fraud: '240'
}, {
	State: '5',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}, {
	State: '6',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}, {
	State: '7',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}, {
	State: '8',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}, {
	State: '9',
	alert: '15250',
	denied: '4200',
	fraud: '1340'
}, {
	State: '10',
	alert: '5250',
	denied: '4200',
	fraud: '1340'
}];

// RENDER

var margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 80
	},
	width = 480 - margin.left - margin.right,
	height = 370 - margin.top - margin.bottom;

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
	.ticks("10")

var svg = d3.select("#insertGraph").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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



	var state = svg.selectAll(".state")
		.data(data)
		.enter().append("g")
		.attr("class", "state")
		.attr("transform", function(d) {
			return "translate(" + x0(d.State) + ",0)";
		});

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


	//clear data
	for (var i = 0; i < data.length; i++) {
		delete data[i].ages;
	}

}
