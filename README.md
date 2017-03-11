# PISA 2012 Data Visualization

## Project

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v4/) to view the **Final Version**!

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v3/) to view **Version 3**!

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v2/) to view **Version 2**!

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v1/) to view **Version 1**!


## Summary

This is an interactive data visualization of teacher survey data from the Programme for International Student Assessment (PISA), a worldwide study by the OECD. The data visualization shows the correlation between various factors for teachers, namely salaries, education level, style of teaching and school climate, from 65 economies. Each plot contains a corresponding text that explains any correlations and any differences between OECD and non-OECD countries.

## Design

### v0

Once the theme was decided, the first step in the design process was to explore the dataset and choose several topics to explore.

The dataset is massive. With data from 510,000 students from 65 economies, and the data dictionary including 635 variables, the unzipped CSV file comes up to around 2.75GB. Thankfully, we don't need all the data, but we do need to go through the data dictionary and select the relevant variables (i.e. those pertaining to teachers and teaching).

<img src="https://i.imgsafe.org/3b5d968cfb.jpg" width="500" height="700">

<img src="https://i.imgsafe.org/3b5db2b174.jpg" width="500" height="700">

From this huge list, I narrowed it down to a select few that I felt would be best for this data visualization.

<img src="https://i.imgsafe.org/3b98ac9f28.jpg" width="500" height="700">

My final list of features were:

* Teachers' salaries (% of GDP per capita)

* Teachers' qualifications, which included:
  1. With certification (%)
  2. With secondary education (%)


* Index of teachers' use of cognitive activation, which in this case, is calculated as the percentage of students who responded with 'agree' or 'strongly agree' to the following statements:
  * The teacher asks us questions that makes us reflect on the problem.
  * The teacher asks us to decide on our own procedure for solving complex problems.
  * The teacher helps us learn from the mistakes we have made.
  * The teacher asks us to explain how we have solved the problem.


### v1

Now that the outline of the visualization is done, it's time to create Version 1! First, I made a quick sketch of what I wanted to do:

<img src="https://i.imgsafe.org/3be5e811b2.jpg" width="1000" height="200">

The plan was to make a simple scatter plot of Teachers salaries (% of GDP per capita) vs Maths Scores, with red circles representing the countries. I also wanted some interactivity and a way for the user to know which country lied where, so I planned on a hover function that displayed the country name on the top left corner when the cursor hovered over a circle. This is what I came up with:

![](https://i.imgsafe.org/3c22f9bfb3.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v1/) to view Version 1!

#### Feedback

Since this was just a midpoint to my idea, I thought I'd ask my parents what they thought. It's particularly useful to hear their ideas because they represent the common users who may not have web design or data visualization knowledge, and their perspective may point out things that I may not have thought of. These are what they pointed out:

> * The line of circles at zero are misleading.
> * The title is really small.
> * The circles on the far right look like they're outside the plot.
> * How do I find out the exact numbers of Maths Scores?
> * Teachers' salaries as % of GDP per capita is difficult to comprehend.

The countries with 0 on the x-axis are actually countries without teacher salary data, and I had kept them because I wanted users to know that those countries were part of the the plot. However, by assigning the value 0 to them, that information (missing data) is not conveyed, and it *is* misleading. I agreed with the rest of the points, and applied the advice in Version 2.

### v2

Here is my quick plan for Version 2:

<img src="https://i.imgsafe.org/3ca275d75c.jpg" width="1000" height="400">

A summary of the features I finally added/changed:

* Removed missing data points.
* Bigger and bolder title.
* Extended axes.
* Circle radius is now a function of GDP per capita. The richer the average person in the country, the bigger the circle. This is useful in visualizing what a teacher would be earning (because the data is in % of GDP per capita).
* Color shows whether country is part of OECD (blue), or not (yellow).
* A tooltip that displays the exact maths score and teacher salary for that country, along with the top-left country name display.

This is what it looks like:

![](https://i.imgsafe.org/3cbe12015a.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v2/) to view Version 2!

#### Feedback

To take my project one level higher, I decided to ask my web developer friend for feedback. I knew I was not utilizing proper web development practices (I had hardcoded the pixel values for the different elements on the page), and her advice on the matter would really improve it. Here's what she recommended:

> * Don't manually enter the pixel values! Use Bootstrap's FlexGrid system to organize the layout of the page.
> * The tooltip and country name display do the same thing, so there's no need for two. The tooltip looks better and is more useful.

She introduced me to Bootstrap to organize the front-end framework and also deal with browser compatibility and viewing on different screen sizes (which would most certainly obfuscate my plot).

Converting my manually entered webpage into the Bootstrap framework while ensuring the d3 still worked turned out to be a lot more challenging than I thought. It felt like I was performing open-heart surgery on my website. Finally, after a few weeks of work (fortunately, websites aren't living things), I finally managed to reorganize it into the Bootstrap framework.

### v3

Once it was in the Bootstrap framework, and the single plot was working, I thought I'd add two more plots: Teachers with certification (%) and Teachers with Secondary Education (%). This is a really big jump from Version 2. The entire page has had a facelift; the HTML has completely changed, the CSS now uses Bootstrap's stylesheet as well, and the Javascript includes functions for building scales, axes, and updating the Chart.

Here's a summary of updates from Version 2:

* Reorganized into Bootstrap framework
* Larger and bolder title
* Bolder axes titles
* Two new plots: Teachers with certification (%) and Teachers with Secondary Education (%).
* The plots can be viewed by clicking the next button (and go back with the previous button), and the animated circles will slide across the chart to their new positions.
* The axes update with a neat animation.
* Navigation title to know the content of the plot.

 Here's what it looks like:

![](https://i.imgsafe.org/3f04875023.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v3/) to view Version 3!


#### Feedback

> It's awesome!

Under Construction! :construction::warning:

### Final Version (v4)

This version has all the elements in my final design for the data visualization, and has made improvements according to any relevant feedback and advice from previous versions.

A summary of the updates from Version 3:

* Changed the number of plots in the visualization. Teacher Certification (%) has been removed, Teachers Use of Cognitive Activation and School Climate have been added.
* The last plot is a 'Try It Yourself' section, where the user can select the x- and y-axes themselves (Reading Score and Science Score has been added). The menu for the axes appears only in this section, and disappears when the user clicks 'previous' and goes backwards.
* Each plot has its own short explanation on the right.
* There are two legends - one for circle size, and one for circle color - on the bottom-right.
* There is now a Data Source and Credits box at the bottom-left of the chart.


![](https://i.imgsafe.org/3f28ca32dc.png)

Here's the 'Try It Yourself' section:

![](https://i.imgsafe.org/3f2bd3597e.png)


#### Feedback

Under Construction! :construction::warning:


## Resources

Under Construction! :construction::warning:
