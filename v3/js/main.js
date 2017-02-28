

// Main function
function draw(data) {
  "use strict";
  var margin = 59,
      width = 960 - margin,
      height = 550 - margin,
      OECD_colour = '#3498DB',
      non_OECD_colour = '#F89406';


  function scale_max(data, axis_label) {
      return d3.max(data, function(d) {
          return d[axis_label];
      });
  }

  function scale_min(data, axis_label) {
      return d3.min(data, function(d) {
          return d[axis_label];
    });
  }

  var math_max = scale_max(data, 'Maths Score');

  // Building menus
  var xAxis = "Teachers' salaries (% GDP per capita)";
  var yAxis = "Maths Score";

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


  // Navigation titles and explanations
  var nav_titles = [
    "1. Teachers' Salaries",
    "2. Teachers' Certifications",
    "3. Teachers' Education Level"
  ]

  var explanation_text = [
    "Teachers' salaries have some sort of impact on Maths Scores, this is sample text. Lorem ipsum.",
    "Teachers' certifications have some sort of impact on Maths Scores, this is sample text. Lorem ipsum.",
    "Teachers' education level have some sort of impact on Maths Scores, this is sample text. Lorem ipsum."
  ]


  // Building navigation
  var menuOption = 0

  d3.select("#plot-title h4")
    .text(nav_titles[menuOption]);

  d3.select("#explanation-text p")
    .text(explanation_text[menuOption]);

  d3.select('#navigation #prev-button')
    .on('click', function() {
        if (menuOption > 0) {
            menuOption -= 1;
        }
        if (menuOption == 0) {
            d3.select('#navigation #prev-button img')
              .attr('src', 'images/prev_light.png')
        }
        if (menuOption == 1) {
            d3.select('#navigation #next-button img')
              .attr('src', 'images/next.png')
        }
        navigation();
    })
    .on('mouseover', function() {
        if (menuOption > 0) {
              d3.select('#navigation #prev-button img')
                .style('cursor', 'pointer');
        } else {
          d3.select('#navigation #prev-button img')
            .style('cursor', 'default');
        }
    });

  d3.select('#navigation #next-button')
    .on('click', function() {
        if (menuOption < 2) {
            menuOption += 1;
            navigation();
        }
        if (menuOption == 2) {
            d3.select('#navigation #next-button img')
              .attr('src', 'images/next_light.png')
        }
        if (menuOption == 1) {
            d3.select('#navigation #prev-button img')
              .attr('src', 'images/prev.png')
        }
    })
    .on('mouseover', function() {
        if (menuOption < 2) {
            d3.select('#navigation #next-button img')
              .style('cursor', 'pointer');
        } else {
            d3.select('#navigation #next-button img')
            .style('cursor', 'default');
        }
    });


  // Change title, explanation text and axes for each step in navigation
  function navigation(d) {
    d3.select("#plot-title h4")
      .text(nav_titles[menuOption]);

    d3.select("#explanation-text p")
      .text(explanation_text[menuOption]);

    if (menuOption == 0) {
      xAxis = xAxisOptions[0];
      yAxis = yAxisOptions[0];
    }

    if (menuOption == 1) {
      xAxis = xAxisOptions[1];
      yAxis = yAxisOptions[0];
    }

    if (menuOption == 2) {
      xAxis = xAxisOptions[2];
      yAxis = yAxisOptions[0];
    }

    //updateChart(xAxis, yAxis);
  };


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
  var math_score_max = scale_max(data, 'Maths Score');

  var math_score_min = scale_min(data, 'Maths Score');

  var reading_score_max = d3.max(data, function(d) {
      return d['Reading Score'];
  });

  var reading_score_min = d3.min(data, function(d) {
      return d['Reading Score'];
  });

  var science_score_max = d3.max(data, function(d) {
      return d['Science Score'];
  });

  var science_score_min = d3.min(data, function(d) {
      return d['Science Score'];
  });

  var teachers_salaries_max = d3.max(data, function(d) {
      return d["Teachers' salaries"];
  });

  var teachers_salaries_min = d3.min(data, function(d) {
      return d["Teachers' salaries"];
  });

  //var teacher_salaries_extent = d3.extent(data, function(d) {
  //    return d["Teachers' salaries"];
  //});

  var math_score_scale = d3.scale.linear()
      .range([height, margin])
      .domain([math_score_min - 50, math_score_max]);

  var reading_score_scale = d3.scale.linear()
      .range([height, margin])
      .domain([reading_score_min - 50, reading_score_max]);

  var science_score_scale = d3.scale.linear()
      .range([height, margin])
      .domain([science_score_min - 50, science_score_max]);

  var teacher_salaries_scale = d3.scale.linear()
      .range([margin, width])
      .domain([0, teachers_salaries_max + 20]);

  var teacher_cert_scale = d3.scale.linear()
      .range([margin, width])
      .domain([0, 100]);

  var teacher_ed_scale = d3.scale.linear()
      .range([margin, width])
      .domain([0, 100]);

  var scales = {
    'Maths Scores': math_score_scale,
    'Reading Score': reading_score_scale,
    'Science Score': science_score_scale,
    "Teachers' salaries (% GDP per capita)": teacher_salaries_scale,
    "Certified teachers (%)": teacher_cert_scale,
    "Teachers with secondary education (%)": teacher_ed_scale
  };


  // Building the x- and y-axis
  var math_score_axis = d3.svg.axis()
      .scale(math_score_scale)
      .orient('left')
      .ticks(5);

  var teacher_salaries_axis = d3.svg.axis()
      .scale(teacher_salaries_scale)
      .orient('bottom')
      .ticks(10);

  d3.select('svg')
    .append('g')
    .attr("id", "yAxis")
    .attr("transform", "translate(" + 59 + ",0)")
    .call(math_score_axis);

  d3.select("svg")
    .append("g")
    .attr("class", "col-lg-1")
    .attr("id", "xAxis")
    .attr("transform", "translate(0, " + height + ")")
    .call(teacher_salaries_axis);


  // X- and y-axis labels
  d3.select('#yAxis')
    .append('text')
    .attr('class', 'axis-label')
    .attr('id', 'yLabel')
    .attr('text-anchor', 'middle')
    //.attr('transform', 'translate(-42, 315)rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -42)
    .attr('transform', 'rotate(-90)')
    .text(yAxis);

  d3.select('#xAxis')
    .append('text')
    .attr('class', 'axis-label')
    .attr('id', 'xLabel')
    //.attr('transform', 'translate(500, 42)')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', 42)
    .text(xAxis);


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

         // Mouse over functions that change border and displays info box
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

              var xPosition = coordinates[0] + 150;
              var yPosition = coordinates[1] - 20;

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
  /*
  function updateScales(xAxis, yAxis) {
      var x_scale = scales[xAxis];
      var y_scale = scales[yAxis];
  };

  function updateChart(xAxis, yAxis) {

    updateScales(xAxis, yAxis);

    d3.select('#plot')
      .selectAll('circle')
      .transition()
      .duration(1000)
      .ease('cubic-out')
      .attr('cx', function(d) {
          return isNaN(d[xAxis]) ? d3.select(this).attr('cx'): x_scale(d[xAxis]);
      })
      .attr('cy', function(d) {
          return isNan(d[yAxis]) ? d3.select(this).attr('cy'): y_scale(d[yAxis]);
      })
      .attr('r', function(d) {
          return return d[yAxis] == 0 ? 0 : radius(d['GDP per capita']);
      });
  };
  */
};


// Loads data
d3.csv("data/pisa_teacher_data.csv", function(d) {
    d['GDP per capita'] = +d['GDP per capita'];
    d['Maths Score'] = +d['Maths Score'];
    d["Reading Score"] = +d["Reading Score"];
    d["Science Score"] = +d["Science Score"];
    d["Teachers' salaries"] = +d["Teachers' salaries"];
    d["Certified teachers (%)"] = +d["Certified teachers (%)"];
    d["Teachers with secondary education (%)"] = +d["Teachers with secondary education (%)"]
    return d;
  }, draw);
