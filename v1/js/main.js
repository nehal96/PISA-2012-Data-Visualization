
// Main function
function draw(data) {
  "use strict";
  var margin = 75,
      width = 1000 - margin,
      height = 650 - margin,
      radius = 15,
      colour = '#e23e57';

  // Adding the title
  d3.select('#title')
    .append('h2')
    .text("PISA 2012: How valuable are our teachers?");

  // Adding the svg element for the plot
  var svg = d3.select('#chart')
              .append('svg')
              .attr('width', width + margin)
              .attr('height', height + margin);
              //.attr("transform", "translate(" + (width / 2) + ", " + (height / 1.2) + ")");

  // Initializing circle elements and binding with data
  var circles = d3.select('svg')
                  .append('g')
                  .attr('id', 'plot')
                  .selectAll('circle')
                  .data(data)
                  .enter()
                  .append('circle');

  // Building x- and y-axis scales
  var math_score_max = d3.max(data, function(d) {
      return d['Maths Score'];
  });

  var math_score_min = d3.min(data, function(d) {
      return d['Maths Score'];
  });

  var teacher_salaries_extent = d3.extent(data, function(d) {
      return d["Teachers' salaries"];
  });

  var math_score_scale = d3.scale.linear()
      .range([height, margin])
      .domain([math_score_min - 20, math_score_max]);

  var teacher_salaries_scale = d3.scale.linear()
      .range([margin, width])
      .domain(teacher_salaries_extent);

  // Building the x- and y-axis
  var math_score_axis = d3.svg.axis()
      .scale(math_score_scale)
      .orient('left')
      .ticks(10);

  var teacher_salaries_axis = d3.svg.axis()
      .scale(teacher_salaries_scale);

  d3.select('svg')
    .append('g')
    .attr("id", "yAxis")
    .attr("transform", "translate(" + (margin - 20) + ",0)")
    .call(math_score_axis);

  d3.select("svg")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate(0, " + (height + 20) + ")")
    .call(teacher_salaries_axis);

  // X- and y-axis labels
  d3.select('svg')
    .append('text')
    .attr('id', 'yLabel')
    .attr('transform', 'translate(12, 330)rotate(-90)')
    .text('Maths Score');

  d3.select('svg')
    .append('text')
    .attr('id', 'xLabel')
    .attr('transform', 'translate(500, 640)')
    .attr('text-anchor', 'middle')
    .text("Teachers' salaries (as % of GDP per capita)");

  // Element for Country name when mouse hovers over point
  d3.select('svg g#plot')
    .append('text')
    .attr('id', 'countryLabel')
    .attr('transform', 'translate(100, 100)');


  circles.attr('id', function(d) {
              return d['Country'].replace(/ /g, '');
         })
         .attr('cy', function(d) {
        //if (isNaN(d["Maths Score"]) || isNaN(d["Teachers' salaries"])) {
        //    return null;
        //} else {
              return math_score_scale(d["Maths Score"]);
        //}
         })
         .attr('cx', function(d) {
      //if (isNaN(d["Teachers' salaries"]) || isNaN(d["Maths Score"])) {
      //    return null;
      //} else {
              return teacher_salaries_scale(d["Teachers' salaries"]);
      //}
         })
         .attr('r', radius)
         .attr("fill", colour)
         .style('cursor', 'pointer')

         // Mouse over functions that change border and displays Country name
         .on('mouseover', function(d) {
              d3.select(this)
                .transition()
                .attr('stroke', 'black')
                .attr('stroke-width', 2);

              d3.select('svg g#plot #countryLabel')
                .text(d["Country"])
                .transition()
                .attr('opacity', 1);
         })
         .on('mouseout', function() {
              d3.select(this)
                .transition()
                .attr('stroke-width', 0)

              d3.select('svg g#plot #countryLabel')
                .transition()
                .duration(1000)
                .attr('opacity', 0);
         });
};

// Loads data
d3.csv("data/pisa_teacher_data.csv", function(d) {
    d['GDP per capita'] = +d['GDP per capita'];
    d['Maths score'] = +d['Maths score'];
    d["Teachers' salaries"] = +d["Teachers' salaries"];
    return d;
  }, draw);
