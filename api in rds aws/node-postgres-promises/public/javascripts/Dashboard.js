console.log('running dashboard');

queue()
    .defer(d3.json, "/data")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
    console.log('running makegraphs');

//Start Transformations
  	var dataSet = apiData;
  	var dateFormat = d3.time.format("%m/%d/%Y");
  	dataSet.forEach(function(d) {
  		d.date_posted = dateFormat.parse(d.date_posted);
  				d.date_posted.setDate(1);
  		d.total_donations = +d.total_donations;
  	});

  	//Create a Crossfilter instance
  	var ndx = crossfilter(dataSet);

  	//Define Dimensions
  	var datePosted = ndx.dimension(function(d) { return d.id; });

  	//Calculate metrics
  	var projectsByDate = datePosted.group();

  	var all = ndx.groupAll();

  	//Define threshold values for data
  	var minDate = datePosted.bottom(1)[0].date_posted;
  	var maxDate = datePosted.top(1)[0].date_posted;

    console.log(minDate.concat('minDate'));
    console.log(maxDate.concat('maxDate'));

      //Charts
  	var dateChart = dc.lineChart("#date-chart");

    selectField = dc.selectMenu('#menuselect')
          .dimension(state)
          .group(stateGroup);

         dc.dataCount("#row-selection")
          .dimension(ndx)
          .group(all);

  	dateChart
  		//.width(600)
  		.height(220)
  		.margins({top: 10, right: 50, bottom: 30, left: 50})
  		.dimension(datePosted)
  		.group(projectsByDate)
  		.renderArea(true)
  		.transitionDuration(500)
  		.x(d3.time.scale().domain([minDate, maxDate]))
  		.elasticY(true)
  		.renderHorizontalGridLines(true)
      	.renderVerticalGridLines(true)
  		.xAxisLabel("Year")
  		.yAxis().ticks(6);

      dc.renderAll();

  };
