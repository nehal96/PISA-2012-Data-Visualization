

// Main function
function draw(data) {
  "use strict";
  var margin = 59,
      width = 960 - margin,
      height = 550 - margin,
      OECD_colour = '#3498DB',
      non_OECD_colour = '#ff9a00'
      //'#F89406';


  // Building menus
  var xAxis = "Teachers' salaries";
  var yAxis = "Maths Score";

  var xAxisOptions = ["Teachers' salaries",
                      "Teachers with secondary education (%)",
                      "Cognitive Activation Index",
                      "School Climate"];

  var yAxisOptions = ["Maths Score",
                      "Reading Score",
                      "Science Score"];

  var labels = {
      "Maths Score": "Mean Maths Score",
      "Reading Score": "Mean Reading Score",
      "Science Score": "Mean Science Score",
      "Teachers' salaries": "Teachers' salaries (% GDP per capita)",
      "Teachers with secondary education (%)": "Teachers with secondary education (%)",
      "Cognitive Activation Index": "Index of Teachers use of Cognitive Activation",
      "School Climate": "Late Students (%)"
  };

  d3.select("#x-axis-menu")
    .selectAll('p')
    .data(xAxisOptions)
    .enter()
    .append('p')
    .text(function(d) {
        return d;
    })
    .classed('selected', function(d) {
        return d === xAxis;
    })
    .on('click', function(d) {
        xAxis = d;
        updateMenu();
        updateChart(scales, xAxis, yAxis);
    });

  d3.select("#y-axis-menu")
    .selectAll('p')
    .data(yAxisOptions)
    .enter()
    .append('p')
    .text(function(d) {
        return d;
    })
    .classed('selected', function(d) {
        return d === yAxis;
    })
    .on('click', function(d) {
        yAxis = d;
        updateMenu();
        updateChart(scales, xAxis, yAxis)
    });


  // Navigation titles and explanations
  var nav_titles = [
    "1. Teachers' Salaries",
    "2. Teachers' Education Level",
    "3. Teachers' Use of Cognitive Activation",
    "4. School Climate",
    "5. Try It Yourself!"
  ]

  var explanation_text = [
    "Teachers' salaries have some sort of impact on Maths Scores, this is sample text. Lorem ipsum.",
    "Teachers' education level have some sort of impact on Maths Scores, this is sample text. Lorem ipsum.",
    "Teachers' use of cognitive activation has some sort of impact on Maths Scores, this is sample text. Lorem ipsum.",
    "Lots of students being late to school have some sort of impact on Maths Scores, this is sample text. Lorem ipsum.",
    "Try it yourself!"
  ]


  // Change title, explanation text and axes for each step in navigation

  function navigation(d) {
    d3.select("#plot-title h4")
      .text(nav_titles[menuOption]);

    d3.select("#explanation-text p")
      .text(explanation_text[menuOption]);

    if (menuOption == 0) {
      xAxis = xAxisOptions[0];
      yAxis = yAxisOptions[0];
      build_x_axis(teacher_salaries_scale, labels[xAxis]);
      updateChart(scales, "Teachers' salaries", yAxis);
    }

    if (menuOption == 1) {
      xAxis = xAxisOptions[1];
      yAxis = yAxisOptions[0];
      build_x_axis(teacher_ed_scale, labels[xAxis]);
      updateChart(scales, "Teachers with secondary education (%)", yAxis);
    }

    if (menuOption == 2) {
      xAxis = xAxisOptions[2];
      yAxis = yAxisOptions[0];
      build_x_axis(teacher_cog_scale, labels[xAxis]);
      updateChart(scales, "Cognitive Activation Index", yAxis)
    }

    if (menuOption == 3) {
      xAxis = xAxisOptions[3];
      yAxis = yAxisOptions[0];
      build_x_axis(school_climate_scale, labels[xAxis]);
      updateChart(scales, "School Climate", yAxis)

      d3.select("#menu")
        .style('opacity', '0')
        .style('transition', 'opacity 0.7s linear')

      d3.classed('show', false)
        .classed('hidden', true);
    }

    if (menuOption == 4) {
      xAxis = xAxisOptions[0];
      yAxis = yAxisOptions[0];
      build_x_axis(teacher_salaries_scale, labels[xAxis]);
      updateChart(scales, "Teachers' salaries", yAxis);

      d3.select("#menu")
        .classed('hidden', false)
        .classed('show', true)
        .style('opacity', '1')
        .style('transition', 'opacity 1s linear')
    }
  };


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
            navigation();
        }
        if (menuOption == 3) {
            d3.select('#navigation #next-button img')
              .attr('src', 'images/next.png');
        }
        if (menuOption == 0) {
            d3.select('#navigation #prev-button img')
              .attr('src', 'images/prev_light.png');
        }
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
        if (menuOption < 4) {
            menuOption += 1;
            navigation();
        }
        if (menuOption == 4) {
            d3.select('#navigation #next-button img')
              .attr('src', 'images/next_light.png')
        }
        if (menuOption == 1) {
            d3.select('#navigation #prev-button img')
              .attr('src', 'images/prev.png')
        }
    })
    .on('mouseover', function() {
        if (menuOption < 4) {
            d3.select('#navigation #next-button img')
              .style('cursor', 'pointer');
        } else {
            d3.select('#navigation #next-button img')
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


  // Initializing circle elements and binding with data
  var circles = d3.select('svg')
                  .append('g')
                  .attr('id', 'plot')
                  .selectAll('circle')
                  .data(data)
                  .enter()
                  .append('circle');


  // Building x- and y-axis scales

  function build_y_axis_scale(data, axis_label) {
      var scale_max = d3.max(data, function(d) {
          return d[axis_label];
      });

      var scale_min = d3.min(data, function(d) {
          return d[axis_label];
      });

      return d3.scale.linear()
                     .range([height, margin])
                     .domain([scale_min - 50, scale_max + 30]);
  }

  var teachers_salaries_max = d3.max(data, function(d) {
      return d["Teachers' salaries"];
  });

  var teachers_salaries_min = d3.min(data, function(d) {
      return d["Teachers' salaries"];
  });

  var math_score_scale = build_y_axis_scale(data, 'Maths Score');

  var reading_score_scale = build_y_axis_scale(data, 'Reading Score');

  var science_score_scale = build_y_axis_scale(data, 'Science Score');

  var teacher_salaries_scale = d3.scale.linear()
      .range([margin, width])
      .domain([0, teachers_salaries_max + 20]);

  var teacher_ed_scale = d3.scale.linear()
      .range([margin, width])
      .domain([0, 100]);

  var teacher_cog_scale = d3.scale.linear()
      .range([margin, width])
      .domain([25, 85]);

  var school_climate_scale = d3.scale.linear()
      .range([margin, width])
      .domain([0, 75]);

  var scales = {
    'Maths Score': math_score_scale,
    'Reading Score': reading_score_scale,
    'Science Score': science_score_scale,
    "Teachers' salaries": teacher_salaries_scale,
    "Teachers with secondary education (%)": teacher_ed_scale,
    "Cognitive Activation Index": teacher_cog_scale,
    "School Climate": school_climate_scale
  };


  // Building the x- and y-axis
  function build_y_axis(y_axis_scale, y_axis_label) {
      var y_axis_elem = d3.svg.axis()
                              .scale(y_axis_scale)
                              .orient('left')
                              .ticks(5);

      return d3.select('#yAxis')
               .transition()
               .call(y_axis_elem)
               .select('#xLabel')
               .text(y_axis_label);
  }

  function build_x_axis(x_axis_scale, x_axis_label) {
      var x_axis_elem = d3.svg.axis()
                              .scale(x_axis_scale)
                              .orient('bottom')
                              .ticks(10);

      return d3.select('#xAxis')
               .transition()
               .call(x_axis_elem)
               .select('#xLabel')
               .text(x_axis_label);
  }

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
    .attr('x', -height / 2)
    .attr('y', -42)
    .attr('transform', 'rotate(-90)')
    .text(yAxis);

  d3.select('#xAxis')
    .append('text')
    .attr('class', 'axis-label')
    .attr('id', 'xLabel')
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
                .text(labels[yAxis] + ": " + d[yAxis])

              d3.select('#tooltip #x')
                .text(labels[xAxis] + ": " + d[xAxis])

              d3.select('#tooltip')
                .classed("hidden", false);
         });

  function updateMenu() {
    d3.select("#x-axis-menu")
      .selectAll('p')
      .classed('selected', function(d) {
          return d === xAxis;
      });

    d3.select("#y-axis-menu")
      .selectAll('p')
      .classed('selected', function(d) {
          return d === yAxis;
      });
  }

  function updateChart(scales_dict, xAxis, yAxis) {

    d3.select('#plot')
      .selectAll('circle')
      .transition()
      .duration(1000)
      .ease('cubic-out')
      .attr('cx', function(d) {
          return scales_dict[xAxis](d[xAxis])
      })
      .attr('cy', function(d) {
          return scales_dict[yAxis](d[yAxis])
      })
      .attr('r', function(d) {
          return d[xAxis] == 0 ? 0 : radius(d['GDP per capita']);
      });
  };

};


// Loads data
d3.csv("data/pisa_teacher_data.csv", function(d) {
    d['GDP per capita'] = +d['GDP per capita'];
    d['Maths Score'] = +d['Maths Score'];
    d["Reading Score"] = +d["Reading Score"];
    d["Science Score"] = +d["Science Score"];
    d["Teachers' salaries"] = +d["Teachers' salaries"];
    d["Teachers with secondary education (%)"] = +d["Teachers with secondary education (%)"];
    d["Cognitive Activation Index"] = +d["Cognitive Activation Index"];
    d["School Climate"] = +d["School Climate"];
    return d;
  }, draw);
