
// Main function
function draw(data) {
  "use strict";
  var margin = 75,
      width = 1000 - margin,
      height = 650 - margin,
      OECD_colour = '#3498DB',
      non_OECD_colour = '#F89406';


  // Adding the title
  d3.select('#title')
    .append('h1')
    .text("PISA 2012: How valuable are our teachers?");


  // Building menus
  var xAxisOptions = ["Teachers' salaries (% GDP per capita)",
                      "Certified teachers (%)",
                      "Teachers with secondary education (%)"];

  var yAxisOptions = ["Maths Score",
                      "Reading Score",
                      "Science Score"];

  d3.select("#x-axis-menu")
    .selectAll('li')
    .data(xAxisOptions)
    .enter()
    .append('li')
    .text(function(d) {
        return d;
    });

  d3.select("#y-axis-menu")
    .selectAll('li')
    .data(yAxisOptions)
    .enter()
    .append('li')
    .text(function(d) {
        return d;
    });


  // Building navigation
  var menuOption = 0

  d3.select('#navigation #prev')
    .on('click', function() {
        if (menuOption > 0) {
            menuOption -= 1;
        }
        if (menuOption == 0) {
            d3.select('#navigation #prev')
              .style('background-image', 'url("images/prev_light.png")')
        }
        if (menuOption == 1) {
            d3.select('#navigation #next')
              .style('background-image', 'url("images/next.png")')
        }
        //navigation();
    })
    .on('mouseover', function() {
        if (menuOption > 0) {
              d3.select('#navigation #prev')
                .style('cursor', 'pointer');
        } else {
          d3.select('#navigation #prev')
            .style('cursor', 'default');
        }
    });

  d3.select('#navigation #next')
    .on('click', function() {
        if (menuOption < 2) {
            menuOption += 1;
            //navigation();
        }
        if (menuOption == 2) {
            d3.select('#navigation #next')
              .style('background-image', 'url("images/next_light.png")')
        }
        if (menuOption == 1) {
            d3.select('#navigation #prev')
              .style('background-image', 'url("images/prev.png")')
        }
    })
    .on('mouseover', function() {
        if (menuOption < 2) {
            d3.select('#navigation #next')
              .style('cursor', 'pointer');
        } else {
            d3.select('#navigation #next')
            .style('cursor', 'default');
        }
    });


  // Initializing tooltip as 'hidden'
  d3.select('#tooltip')
    .classed('hidden', true);


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
      .ticks(5);

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
  d3.select('#yAxis')
    .append('text')
    .attr('id', 'yLabel')
    .attr('transform', 'translate(-42, 350)rotate(-90)')
    .text('Maths Score');

  d3.select('#xAxis')
    .append('text')
    .attr('id', 'xLabel')
    .attr('transform', 'translate(515, 42)')
    .attr('text-anchor', 'middle')
    .text("Teachers' salaries (as % of GDP per capita)");


  // Element for Country name when mouse hovers over point
  d3.select('svg g#plot')
    .append('text')
    .attr('id', 'countryLabel')
    .attr('transform', 'translate(100, 130)');


  // Setting the scale for the circle radius
  var gdp_per_capita_max = d3.max(data, function(d) {
      return d['GDP per capita'];
  });

  var radius = d3.scale.sqrt()
                 .domain([0, gdp_per_capita_max])
                 .range([0, 30]);


  // Applying scales and interactivity to the circles
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
         .attr('r', function(d) {
            return d["Teachers' salaries"] == 0 ? 0 : radius(d['GDP per capita']);
         })
         .attr("fill", function(d) {
            if (d['OECD'] == "yes") {
                return OECD_colour;
            } else {
                return non_OECD_colour;
            };
         })
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

              d3.select('#tooltip')
                .classed("hidden", false);
         })
         .on('mouseout', function() {
              d3.select(this)
                .transition()
                .attr('stroke-width', 0)

              d3.select('svg g#plot #countryLabel')
                .transition()
                .duration(1000)
                .attr('opacity', 0);

              d3.select('#tooltip')
                .classed("hidden", true);
         })
          // Mouse move function that displays tooltip
         .on('mousemove', function(d) {
              var coordinates = [0, 0];
              coordinates = d3.mouse(this);

              var xPosition = coordinates[0] + 100;
              var yPosition = coordinates[1] - 120;

              d3.select('#tooltip')
                .style('left', xPosition + "px")
                .style('top', yPosition + "px")
                .select('#country')
                .text(d['Country'] + " (" + d['Region'] + ")");

              d3.select('#tooltip #y')
                .text("Mean Maths Score: " + d['Maths Score'])

              d3.select('#tooltip #x')
                .text("Teachers' salaries (% GDP per capita): " + d["Teachers' salaries"])

              d3.select('#tooltip')
                .classed("hidden", false);
         });
};


// Loads data
d3.csv("data/pisa_teacher_data.csv", function(d) {
    d['GDP per capita'] = +d['GDP per capita'];
    d['Maths score'] = +d['Maths score'];
    d["Teachers' salaries"] = +d["Teachers' salaries"];
    return d;
  }, draw);
