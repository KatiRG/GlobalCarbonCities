<script>

// ----------------------------------------------------
// Setup
// ----------------------------------------------------

var container = d3.select("body").append("div")
    .style("width",1205);

// Leaflet map variables
// ---------------------------------
// var width = 700,
//     height = 350; //400;

var pointRadius = 5;

var cityName_array = [];

// Define the div for the gdpButton tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


// SVGs
// ----------------------------------------------------
// d3js World Map
var mapMargin = {top: 0, right: 0, bottom: 0, left: 0};
var mapWidth = 850 - mapMargin.left - mapMargin.right,
    mapHeight = 290 - mapMargin.top - mapMargin.bottom;

//barChart legend
var margin = {top: 7, right: 0, bottom: 0, left: 20};
var svg_width = 480 - margin.left - margin.right,
    svg_height = 35 - margin.top - margin.bottom;

var svgCB = d3.select("#barChartLegend").select("svg")
  .attr("width", svg_width)
  .attr("height", svg_height)
  .style("vertical-align", "middle");


// ----------------------------------------------------
// Code
// ----------------------------------------------------
window.onresize = function() {
  $(window).height();   // returns height of browser viewport
  $(document).height(); // returns height of HTML document (same as pageHeight in screenshot)
  $(window).width();   // returns width of browser viewport
  $(document).width(); // returns width of HTML document (same as pageWidth in screenshot)
}

// ----------------------------------------------------
// Main Code
// ----------------------------------------------------

//Find data range extent for each dim (to be used to discretize into colour values)
var fname = "data/cityApp_attributes_consolidated_pruned.tsv";
d3.tsv(fname, function(ghg) {  
  dimExtentDict = {
    "none": [0,0],
    "methodology": 
          d3.extent(ghg, function (d) { 
            return d['MethodNum']; }),
   "Measurement year": [2005, 2015],
   "Population": [4000, 8000000],
   "GDP-PPP/capita": [5000, 80000],
   "area": [10, 5000], "Population density": [100, 30000],
   "Diesel price": [0.05, 2.1], "Gas price": [0.05, 2.1],
   "HDD 15.5C": [0, 3000], "CDD 23C": [0, 3000],
   "High BUA % (2014)": [0, 90], "Low BUA % (2014)": [0, 90]
  }
}) //end read tsv

d3.tsv(fname, function(ghg) {
  setupData(ghg);
  drawMap();
  emissionsBarChart("groupEastAsia", "#barChart_groupEastAsia");
  emissionsBarChart("groupNAmer", "#barChart_groupNAmer");
  emissionsBarChart("groupEuropeSEAsia", "#barChart_groupEuropeSEAsia");
  emissionsBarChart("groupSouth", "#barChart_groupSouth");
});

// ----------------------------------------------------
// Main Functions
// ----------------------------------------------------
function highlightElements(idName) {
  // clear any previous story first
  d3.select("#ghgStory").text("");
  var selectedCity = data_GHG.filter(function (d) { return (d.idName.indexOf(idName) >= 0 ) })[0].city;
  var selectedCityObj = data_GHG.filter(function (d) { return d.city === selectedCity })[0];

  //Clear Previous
  //--------------
  resetElements();
 
  //Display city card
  fn_fillSVGCityCard (selectedCityObj, attrFlag);

  //Highlight Current
  //-----------------
  d3.select("#bar" + idName)
    .style("stroke", "#363636"); 

  d3.selectAll(".bar:not(#bar" + idName + ")")
    .style("fill-opacity", 0.1);

  d3.selectAll(".node:not(#node" + idName + ")")
    .style("fill-opacity", 0.1)
    .style("stroke-opacity", 0.1);
  
  d3.selectAll(".worldcity:not(#city" + idName + ")")
    .style("fill-opacity", 0.1)
    .style("stroke-opacity", 0.1);
  
  //Highlight current country
  var thisCountry = data_GHG.filter(function (d) { return d.idName === idName })[0].country.replace(/\s/g, '_');
  
  d3.select("#map" + thisCountry).style("fill", countryHighlightColour);

  d3.select("#city" + idName)
    .attr("stroke", "black")
    .attr("stroke-width", 2);
} // ./highlightElements()


function emissionsBarChart(geogroup_name, geogroup_id) {
  // barChart caption in #barChartCaption div
  this_dim = (d3.select("#gdpButton").text() === label_dataPerGDP) ?
                      label_dataPerCap : label_dataPerGDP;

  //https://bl.ocks.org/seemantk/ec245e1f4e824e685982dd5d3fbb2fcc
  var margin = {top: 20, right: 0, bottom: 20, left: 20};
  var width = 700 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

  //Extract scaled emissions data for given region
  if (geogroup_name === "groupEastAsia") {
    geogroupArray = ["groupEastAsia", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap", "gap"];
  } else if (geogroup_name === "groupNAmer") {
    geogroupArray = ["groupNAmer", "gap", "gap", "gap","gap", "gap","gap", "gap","gap","gap"];
  } else if (geogroup_name === "groupEuropeSEAsia") {
    geogroupArray = ["groupEurope", "gap", "gap","gap","gap","gap","gap","gap","gap","gap",
                    "groupSEAsia","gap","gap","gap","gap","gap","gap"];
  } else if (geogroup_name === "groupSouth") {
    geogroupArray = ["groupLatinAmer", "gap",
                     "groupSAsia", "gap", "gap","gap",
                     "groupAfrica", "gap",  "gap","gap","gap","gap",
                     "groupNAfrica", "gap","gap","gap","gap","gap", 
                     "groupOceania","gap","gap"];
  }
                    
  emissions_scaled = fn_concat(geogroup_name, geogroupArray, this_dim);


  if (geogroup_name === "groupEastAsia") {
    pOuter = 0.05;
    pInner = 0.27; //0.1;
  }
  
  else {
    pOuter = 0.05; //0.05;
    pInner = 0.27;
  }

  var x = d3.scaleBand()
            .rangeRound([0, width], .1)
            .paddingOuter(pOuter)
            .paddingInner(pInner);

  var y = d3.scaleLinear()
            .range([height, 0]);

  var xAxis = d3.axisBottom()
    .scale(x);

  var yAxis = d3.axisRight()
    .scale(y)
    .ticks(5)
    .tickFormat(function(d) {
      return this_dim === label_dataPerGDP ? (formatDecimalSci(d)*100)/100 : d;
      // return d;
    }); 

  //https://mathisonian.com/writing/easy-responsive-svgs-with-viewbox
  //https://jsfiddle.net/fh5kxv3k/
  var aspectRatio = '660:241';
  var viewBox = '0 0 ' + aspectRatio.split(':').join(' ');

  //Fit barCharts responsively using viewBox
  //NB: viewBox stretches text labels as well, so they must be fixed later by adjusting the scale
  // my_width = geogroup_id === "#barChart_groupNAmer" ? "97%" : "100%";
  if (geogroup_id === "#barChart_groupEastAsia") my_width = "100%";
  else if (geogroup_id === "#barChart_groupNAmer") my_width = "97%";
  else if (geogroup_id === "#barChart_groupEuropeSEAsia") my_width = "97%";
  var svgBarChart = d3.select(geogroup_id).append("svg").attr("class", "barSVG")
    .attr('width', my_width)
    .attr('height', 125) // height)
    .attr('viewBox', viewBox)
    .attr('viewBox', '0 0 ' +  ( width + margin.left + margin.right ) + ' ' + ( height  + margin.top + margin.bottom ) )
    .attr('preserveAspectRatio', 'none')
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", function () {
      // var transx = (geogroup_id === "#barChart_groupNAmer") ? 60 : margin.top;
      if (geogroup_id === "#barChart_groupEastAsia") transx = margin.top;
      else if (geogroup_id === "#barChart_groupNAmer") transx = 60;
      else if (geogroup_id === "#barChart_groupEuropeSEAsia") transx = 60;
      else if (geogroup_id === "#barChart_groupSouth") transx = 60;

      return "translate(" + margin.left + "," + transx + ")";
    });


  x.domain(emissions_scaled.map(function (d) {
    return d.city;
  }));
  y.domain([0, d3.max(emissions_scaled, function(d) {
    if (this_dim === label_dataPerCap) {
      if (geogroup_name === "groupEastAsia") same_max = 8;
      else if (geogroup_name === "groupNAmer") same_max = 16;
      else if (geogroup_name === "groupEuropeSEAsia") same_max = 8.5;
      else  same_max = 11;      
    } else {
      if (geogroup_name === "groupNAmer") same_max = 10;
      else same_max = 0.2;
    }
    return same_max;
  })]);


  // Define the div for the barChart rect tooltip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip-bar")
    .style("opacity", 0);

  //bars
  var bars = svgBarChart.append("g").selectAll(".bar")
      .data(emissions_scaled)
      .enter().append("rect")
      .attr("class", function (d) { //keep track of original geographic group       
        var var_class = "bar" + " " + "class_" + geogroup_name;        
        return  var_class;
      })
      .attr("id", function (d) {
        idName = format_idName(d.city);
        return "bar" + idName;
      })
      .attr("x", function (d) { return x(d.city); })
      .attr("width", x.bandwidth())
      .attr("y", function (d, i) { return y(d[this_dim]); })
      .attr("height", function(d) { return height - y(d[this_dim]); });

  bars.attr("fill", function (d) {    
    return (attrFlag === "none") ? choose_colourArray[attrFlag][0] :
                            fn_colour_barChart(attrFlag, d[attrFlag]);
  });

  bars.on("touchmove mousemove", function (d, i) {
        fn_enlargeName(geogroup_name, d.city);

        idName = format_idName(d.city);
      
        highlightElements(idName);
        
        if (this_dim === "per capita") {
          if ( d.city === "Incheon" || d.city === "Kaohsiung" || d.city === "Yilan" ||
               d.city === "Rotterdam" || d.city === "Quezon" ||
               d.city === "León" || d.city === "Gandhinagar") {
            emissionIntensity = offscaleEmissionsDict[d.city];//rotterdamEmissionsPerCap;
          }          
          else emissionIntensity = formatDecimalSci(d[this_dim]);
        }

        //bar tooltip
        var count = i + 1; //ranking
        if (d.region === "Southeast Asia") count = count - 49;
        else if (d.region === "South Asia") count = count - 32;
        else if (d.region === "Africa") count = count - 53;
        else if (d.region === "N Africa & W Asia") count = count - 68;
        else if (d.region === "Oceania") count = count - 75;

        var tipx = 50;
        var tipy = -120;
        div.style("opacity", 1);
        div.html(count + ": " + fn_abbr(d.city) + ": " + emissionIntensity + " " + dimUnits[this_dim])
          .style("left", d3.event.pageX + tipx + "px")
          .style("top", d3.event.pageY + tipy + "px");

      })
      .on("mouseout", function (d) {
        resetElements();
        
        d3.select("#tick" + idName).text(function (d) { return fn_abbr(d); })
          .style("opacity", 0.3)
          .style("font-size", "11px") //return to orig size
          .attr("fill", colour_labels);

        div.style("opacity", 0);
      });


  //x-axis
  svgBarChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(-1," + height + ")")
      .call(d3.axisTop(x))
      .selectAll("text")
        .text(function (d) {
          if (d.indexOf("gap") >= 0) return "";
          else return fn_abbr(d); 
        })
        .attr("id", function (d) {
          idName = format_idName(d);
          return "tick" + idName;
        })
        .attr("y", -61)
        .attr("x", 25)
        .attr("dy", 7)
        .attr("class", "xAxisCityName")
        .attr("transform", function (d, i) {
          if (d.indexOf("gap") >= 0) return "";
          else {
            xscale=.6; yscale=1.8; rot=-65; xtrans=45; ytrans=0;
            thisCity = d3.select(this).attr("id").split("tick").pop();
            thisCityGroup = d3.select("#bar" + thisCity).attr("class");

            if (this_dim === "per capita") {
              fn_cityLabels_perCapita(d, i, thisCityGroup);
            } else if (this_dim === "per GDP") {
              if (d3.select("#reorderButton").text() === "Re-order") fn_cityLabels_perGDP(d, i, thisCityGroup);
              else {
                if (d === "New York City") ytrans = 5;
                else if (d === "Austin" || d === "San Antonio") ytrans = -25;
                else if (d === "DC") ytrans = -42;
                else if (d === "Indianapolis") ytrans = 5;
                else if (d === "Edmonton") ytrans = -30;
                else if (d === "Toronto") ytrans = 0;
                else if (d === "Winnipeg" || d === "Montreal") ytrans = -45;
                else ytrans = -15;
              }
            } //this_dim
           
            return  "scale(" + xscale + " " + yscale + ")" + 
                    "translate(" + xtrans + " " + ytrans + ")" + "rotate(" + rot + ")" ;
          }

        })
      .style("text-anchor", "start")
      .on("touchmove mousemove", function (d) {
        fn_enlargeName(geogroup_name, d);
        idName = format_idName(d);
        highlightElements(idName);
      })
      .on("mouseout", function (d) {
        resetElements();

        d3.select("#tick" + idName).text(function (d) { return fn_abbr(d); })
          .style("opacity", 0.3)
          .style("font-size", "11px") //return to orig size;
      });

  //hide x tick mark for "gap" bar  
  svgBarChart.selectAll("line")
    .style("opacity", function (d) {
      return (d.indexOf("gap") >= 0) ? 0 : 1;
    });

  //y-axis
  svgBarChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.9em")
        .attr("dy", ".15em")
        .attr("transform", "scale(" + .7 + " " + 1.3 + ")" );

  //y-axis label
  if (geogroup_name === "groupEuropeSEAsia") {
    svgBarChart.append("text")
          .attr("text-anchor", "middle")  // centre the text
          .attr("class", "ylabelClass")
          .text("Per capita emissions [tCO₂eq/capita]")
          .attr("transform", function (d) {
              var xscale = 0.5, yscale = 1.9;              
              return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + (-35) + " " + (-50) + ")rotate(-90)" ;
            });
  }

  //svg arrow for Rotterdam bar only if on emissions/capita view
  if (geogroup_id === "#barChart_groupEastAsia" && 
    d3.select("#gdpButton").text() === "per GDP") {
    var city = ["Incheon", "Kaohsiung", "Yilan"];
    fn_arrow(geogroup_id, city);


  } else if (geogroup_id === "#barChart_groupEuropeSEAsia" &&
    d3.select("#gdpButton").text() === "per GDP") {    

    var city = ["Rotterdam"];
    fn_arrow(geogroup_id, city);

    city = ["Quezon"];
    fn_arrow(geogroup_id, city);

  } else if (geogroup_id === "#barChart_groupSouth" &&
    d3.select("#gdpButton").text() === "per GDP") {    

    var city = ["León"];
    fn_arrow(geogroup_id, city);

    var city = ["Gandhinagar"];
    fn_arrow(geogroup_id, city);
  }

  //svg chart titles
  fn_svgHeadings(geogroup_id);

} // ./fn emissionsBarChart()


</script>