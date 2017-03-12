# PISA 2012 Data Visualization

## Project

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v4/) to view the **Final Version**!

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v3/) to view **Version 3**!

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v2/) to view **Version 2**!

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v1/) to view **Version 1**!


## Summary

The Programme for International Student Assessment is a triennial international survey which aims to evaluate education systems worldwide by testing the skills and knowledge of 15-year-old students from 65 economies.

This project aims to create an interactive data visualization of teacher survey data from PISA 2012. The data visualization shows the correlation between various factors for teachers, namely salaries, education level, style of teaching and school climate, and maths scores. Each plot contains a corresponding text that explains any correlations and any differences between OECD and non-OECD countries.

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

The plan was to make a simple scatter plot of Teachers salaries (% of GDP per capita) vs Maths Scores, with red circles representing the countries. Displaying teachers salaries in percentage of GDP per capita is important because it takes into account the fact that different countries have different costs of living (and thus a higher salary need not necessarily mean a better standard of living). I also wanted some interactivity and a way for the user to know which country lied where, so I planned on a hover function that displayed the country name on the top left corner when the cursor hovered over a circle. This is what I came up with:

![](https://i.imgsafe.org/3fcdb3422b.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v1/) to view Version 1!

#### Feedback

Since this was just a midpoint to my idea, I thought I'd ask my parents what they thought. It's particularly useful to hear their ideas because they represent the common users who may not have web design or data visualization knowledge, and their perspective may point out things that I may not have thought of. These are what they pointed out:

> * The line of circles at zero are misleading.
> * The title is really small.
> * The circles on the far right look like they're outside the plot.
> * How do I find out the exact numbers of Maths Scores?
> * Teachers' salaries as % of GDP per capita is difficult to comprehend.

The countries with 0 on the x-axis are actually countries without teacher salary data, and I had kept them because I wanted users to know that those countries were part of the the plot. However, by assigning the value 0 to them, that information (missing data) is not conveyed, and it *is* misleading. I agreed with the rest of the points, and applied the advice, as well as my own ideas, in Version 2.

### v2

Here is my quick plan for Version 2:

<img src="https://i.imgsafe.org/3ca275d75c.jpg" width="800" height="450">

A summary of the features I finally added/changed:

* Removed missing data points.
* Bigger and bolder title.
* Extended axes.
* Circle radius is now a function of GDP per capita. The richer the average person in the country, the bigger the circle. This is useful in visualizing what a teacher would be earning (because the data is in % of GDP per capita).
* Color shows whether country is part of OECD (blue), or not (yellow).
* A tooltip that displays the exact maths score and teacher salary for that country, along with the top-left country name display.

This is what it looks like:

![](https://i.imgsafe.org/3fd6921988.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v2/) to view Version 2!

#### Feedback

To take my project one level higher, I decided to ask my web developer friend for feedback. I knew I was not utilizing proper web development practices (I had hardcoded the pixel values for the different elements on the page), and her advice on the matter would really improve it. Here's what she recommended:

> * Don't manually enter the pixel values! Use Bootstrap's FlexGrid system to organize the layout of the page.
> * The tooltip and country name display do the same thing, so there's no need for two. The tooltip looks better and is more useful.
> * Speaking of the tooltip, the information is all squished together and it's kind of hard to figure out what it's saying. It would look better if it was more spaced out maybe.
> * It would look better if there was a bigger gap between the title and the plot. Bootstrap should help you with that.

She introduced me to Bootstrap to organize the front-end framework and also deal with browser compatibility and viewing on different screen sizes (which would most certainly obfuscate my plot).

Converting my manually entered webpage into the Bootstrap framework while ensuring the d3 still worked turned out to be a lot more challenging than I thought. It felt like I was performing open-heart surgery on my website. Finally, after a few weeks of work (fortunately, websites aren't living things), I finally managed to reorganize it into the Bootstrap framework.

### v3

Once it was in the Bootstrap framework, and the single plot was working, I thought I'd add two more plots: Teachers with certification (%) and Teachers with Secondary Education (%). This is a really big jump from Version 2. The entire page has had a facelift; the HTML has completely changed, the CSS now uses Bootstrap's stylesheet as well, and the Javascript includes functions for building scales, axes, and updating the Chart.

Here's a summary of updates from Version 2:

* Reorganized into Bootstrap framework
* Larger and bolder title
* New design and color scheme.
* Bolder axes titles
* Two new plots: Teachers with certification (%) and Teachers with Secondary Education (%).
* The plots can be viewed by clicking the next button (and go back with the previous button), and the animated circles will slide across the chart to their new positions.
* The axes update with a neat animated transition.
* Navigation title to know the content of the plot.
* Tooltip information is more spaced and organized to allow easier reading of the information. Also, the background color has been changed to fit the color scheme.

 Here's what it looks like:

![](https://i.imgsafe.org/3fdea1a6e1.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v3/) to view Version 3!


#### Feedback

> * Why are some circles blue while others yellow? I don't know what the colors stand for.
> * I was trying to find Canada and it took me a really long time to go through all the countries individually. It would be awesome if there was like a search bar where I could type in 'Canada', or any country's name, and it would show me where on the graph it was.

I completely forgot about adding a legend, so that definitely has to go. The search bar is a fantastic idea, I never really thought about the need to follow one country (I guess you'd be more interested about say, the country you're from), and having a search bar solves that. Also, the search bar would have to narrow down as the user types in what he/she is looking for because not all countries in the world are a part of PISA. Onto Version 4!

### Final Version (v4)

This is the sketch I came up with in between that has all the design elements I wanted for this visualization (I added the search bar later):

![](https://i.imgsafe.org/51fd4d3248.jpg)

This version has all the elements in my final design for the data visualization, and has made improvements according to any relevant feedback and advice from previous versions.

There are a few changes I made to this design sketch, namely:

* The color legend is no longer 'Regions' and I've stuck with 'Country Affiliation' (OECD or non-OECD) because it fits my narrative better.
* The x-axis options are different (see summary of updates).
* As a result, the title has also been changed.
* The implementation of the search bar was more challenging than I imagined, and I could not add it successfully. I will implement it once I am more skilled in working with d3.


A summary of the updates from Version 3:

* Changed the number of plots in the visualization. Teacher Certification (%) has been removed because the data is very similar to the secondary education one and doesn't provide any meaningful relationships. Teachers Use of Cognitive Activation and School Climate have been added.
* The title has changed to *PISA 2012: The Value of Teachers and School Climate* to reflect the addition of plots.
* The last plot is a 'Try It Yourself' section, where the user can select the x- and y-axes themselves (Reading Score and Science Score has been added). The menu for the axes appears only in this section, and disappears when the user clicks 'previous' and goes backwards.
* Each plot has its own short explanation on the right.
* There are two legends - one for circle size, and one for circle color - on the bottom-right.
* There is now a Data Source and Credits box at the bottom-left of the chart.


![](https://i.imgsafe.org/3f28ca32dc.png)

Here's the 'Try It Yourself' section:

![](https://i.imgsafe.org/3f2bd3597e.png)

[Click here](https://nehal96.github.io/PISA-2012-Data-Visualization/v4/) to view **Version 4 (Final Version)**!


## Resources

* [PISA 2012 Database](http://www.oecd.org/pisa/pisaproducts/pisa2012database-downloadabledata.htm)
* [PISA 2012 Results: What Students Know and Can Do (Volume I) [PDF]](https://www.google.ae/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjH857r3c7SAhWESRoKHYylA7AQFggYMAA&url=https%3A%2F%2Fwww.oecd.org%2Fpisa%2Fkeyfindings%2Fpisa-2012-results-volume-I.pdf&usg=AFQjCNEbLUh4ptHE9rKVhaU9IiQnfruh7A&sig2=S1rf3P3LjzSWyWOzAjDOWQ&bvm=bv.149397726,d.d2s)
* [PISA 2012 Results: Ready to Learn (Volume III) [PDF]](https://www.google.ae/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjelrGh3s7SAhVHrRoKHVrNDKoQFggYMAA&url=https%3A%2F%2Fwww.oecd.org%2Fpisa%2Fkeyfindings%2Fpisa-2012-results-volume-III.pdf&usg=AFQjCNGsfRxtL5gYydJ9f69fhRrPfnGPSw&sig2=Or1NsHzcVfVG33Ca8qU7ZQ&bvm=bv.149397726,d.d2s)
* [PISA 2012 Results: What Makes Schools Successful (Volume IV) [PDF]](https://www.google.ae/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjlk9C43s7SAhXFXRoKHZ3MCbcQFggYMAA&url=https%3A%2F%2Fwww.oecd.org%2Fpisa%2Fkeyfindings%2Fpisa-2012-results-volume-IV.pdf&usg=AFQjCNEstELODVwtQ8WaIgh_K1ti8YK2dQ&sig2=s1tIeG4RBS1bxjvwKfmZVg&bvm=bv.149397726,d.d2s)
* [Raúl Peralta GitHub Repo](https://github.com/raul-p/pisa2012)
* [Gapminder Wealth and Health of Nations](http://www.gapminder.org/world/#$majorMode=chart$is;shi=t;ly=2003;lb=f;il=t;fs=11;al=30;stl=t;st=t;nsl=t;se=t$wst;tts=C$ts;sp=5.59290322580644;ti=2013$zpv;v=0$inc_x;mmid=XCOORDS;iid=phAwcNAVuyj1jiMAkmq1iMg;by=ind$inc_y;mmid=YCOORDS;iid=phAwcNAVuyj2tPLxKvvnNPA;by=ind$inc_s;uniValue=8.21;iid=phAwcNAVuyj0XOoBL_n5tAQ;by=ind$inc_c;uniValue=255;gid=CATID0;by=grp$map_x;scale=log;dataMin=194;dataMax=96846$map_y;scale=lin;dataMin=23;dataMax=86$map_s;sma=49;smi=2.65$cd;bd=0$inds=;example=75)
* [Wealth and Health of Nations Recreation](https://bost.ocks.org/mike/nations/)
* [Bootstrap + D3 Example](http://output.jsbin.com/aqajoy/11)
* [Interactive Data Visualization For The Web](http://chimera.labs.oreilly.com/books/1230000000345/ch09.html)
* [Learning D3 Part 3: Animation & Interaction](http://synthesis.sbecker.net/articles/2012/07/10/learning-d3-part-3-animation-interaction)
* [d3 API Reference](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md)
* [d3 Legend Library](http://d3-legend.susielu.com/)
* Countless StackOverflow queries.
