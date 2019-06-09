

// ...............................
// barChart data fns

// concatenate geogroups together, separated by a gap
function fn_concat (barChartGroup, geogroupArray, this_dim) {
  objArray = [];
  count = 0; //for gap id labels
  
  for (idx=0; idx < geogroupArray.length; idx++) {

    //Extract data by region
    ghg_extract = sortByRegion(geogroupArray[idx]);

    //Sort by this_dim in descending order
    //This does NOT work in IE
    //ghg_extract.sort((a, b) => d3.descending(a[this_dim], b[this_dim]));

    ghg_extract.sort(function(a, b){
       return d3.descending(a[this_dim], b[this_dim]);
    })

  //--------------
    //Special cases that do not fit on scale
    //Reduce bar height and indicate true value graphically on the chart
    if (geogroupArray[idx] === "groupEurope" && this_dim === "per capita") {
      //does not work in IE
      // var selectedCity = data_GHG.find(x => x.city === "Rotterdam");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "Rotterdam" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapRotterdam === 0) {
        //rotterdamEmissionsPerCap = formatDecimalSci(selectedCity[label_dataPerCap]);
        storeFlagCapRotterdam = 1;
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
      }      
      
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.1;
    } 

    else if (geogroupArray[idx] === "groupLatinAmer" && this_dim === "per capita") {
      //does not work in IE
      //var selectedCity = data_GHG.find(x => x.city === "León");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "León" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapLeon === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapLeon = 1;
      }
      
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 11;
    } 
    else if (geogroupArray[idx] === "groupSAsia" && this_dim === "per capita") {
      //does not work in IE
      // var selectedCity = data_GHG.find(x => x.city === "Gandhinagar");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "Gandhinagar" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapGandhi === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapGandhi = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 11;
    } 

    else if (geogroupArray[idx] === "groupSEAsia" && this_dim === "per capita") {
      //does not work in IE
      // var selectedCity = data_GHG.find(x => x.city === "Quezon");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "Quezon" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapQuezon === 0) {        
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapQuezon = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.1;
    } else if (geogroupArray[idx] === "groupEastAsia" && this_dim === "per capita") {
      //does not work in IE
      // var selectedCity = data_GHG.find(x => x.city === "Incheon");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "Incheon" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapIncheon === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapIncheon = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.99;

      //Kaohsiung
      //does not work in IE
      // var selectedCity = data_GHG.find(x => x.city === "Kaohsiung");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "Kaohsiung" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapKaohsiung === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapKaohsiung = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.99;

      //Yilan
      //does not work in IE
      // var selectedCity = data_GHG.find(x => x.city === "Yilan");
      var selectedCity = data_GHG.filter(function (d) { return d.city === "Yilan" })[0];
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapYilan === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapYilan = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.99;
    }
    

  //--------------
    //Concatenate with a gap obj in between
    if (idx % 2 == 0) {
      objArray = objArray.concat(ghg_extract);
    } 
    else {
      objArray = objArray.concat(
        [{ "city":"gap" + barChartGroup + count,
           "region": barChartGroup,
           "per capita":0, 
           "per GDP": 0 }]
      );
      count++;
    }
  // --------------  

  } //.for

  return objArray;
}

// Abbreviate city name in x-axis
function fn_abbr(d) {
  if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
  else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
  else abbr = d.substring(0,4);

  return abbr;
}

function sortByRegion(region, this_dim) {
  ghg_byRegion = [];
  data_GHG.forEach(function (d) {
    if (regionDict[d.region] === region && d[this_dim] != "") ghg_byRegion.push(d);
  });

  return ghg_byRegion;
}


// ...............................
// barChart updates

function fn_colourmapDim (attrFlag) {

  dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];

  //colour map to take data value and map it to the colour of the level bin it belongs to
  colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
            .domain([dimExtent[0], dimExtent[1]])
            .range(barColourDict[attrFlag]);

  return colourmapDim;
}
function fn_barChartLegend (attrFlag) {

  //initialize SVG for legend rects, their g and text nodes
  //-------------------------------------------------------

  //Rect SVG defined in index.html
  var svgCB = d3.select("#barChartLegend").select("svg")

  //Create the g nodes
  var rects = svgCB.selectAll('rect')
          .data(barColourDict[attrFlag])
          .enter()
          .append('g');

  //Append rects onto the g nodes and fill according to attrFlag
  var rect_dim = 15;
  var appendedRects = rects.append("rect")
                .attr("width", rect_dim)
                .attr("height", rect_dim)
                .attr("y", 5)
                .attr("x", function (d, i) {
                  return 41 + i * 80;
                })
                .attr("fill", function (d, i) {
                  return barColourDict[attrFlag][i];
                });

  //Fill rects. Do not display any rects for "None" menu item.
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .attr("fill", function (i, j) {
      return barColourDict[attrFlag][j];
    })
    .style("display", function () {
      return (attrFlag === "none") ? "none" : "inline";
    });


  //define rect text labels (calculate cb_values)
  if (attrFlag != "methodology" || attrFlag != "none") {  
    dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];
    //difference between max and min values of selected attribute
    delta = ( dimExtent[1] - dimExtent[0] )/num_levels;

    cb_values=[]; //clear
    for (idx=0; idx < num_levels; idx++) {
      if (attrFlag === "area" || attrFlag === "HDD 15.5C" || attrFlag === "CDD 23C" ||
          attrFlag === "Low BUA (2014)" || attrFlag === "High BUA (2014)" ||
          attrFlag === "Low BUA % (2014)" || attrFlag === "High BUA % (2014)" ||
          attrFlag === "Low BUA density (2014)" || attrFlag === "Measurement year" ||
          attrFlag === "Congestion rank (INRIX)" || attrFlag === "World Rank (TomTom)" ||
          attrFlag === "Cities in Motion Index (IESE)") {
        cb_values.push( Math.floor(dimExtent[0] + idx*delta) );
      } else if (attrFlag === "Diesel price" || attrFlag === "Gas price") {        
        cb_values.push( (dimExtent[0] + idx*delta).toFixed(2) );        
      } else {
        delta = Math.round(delta/1000)*1000;
        cb_values.push(Math.round((dimExtent[0] + idx*delta)/1000)*1000);
      }
    }

    //colour map to take data value and map it to the colour of the level bin it belongs to
    var colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
              .domain([dimExtent[0], dimExtent[1]])
              .range(barColourDict[attrFlag]); 
  } //cb_array

 
  //add text node to rect g
  rects.append("text")
       .style("fill","#565656")
       .style("stroke", "none")
       .style("font-size", "11px");
  
  //Display text in text node according to attrFlag
  d3.select("#barChartLegend")
    .selectAll("text")
    .text(function (i, j) {
      if (attrFlag === "methodology" || attrFlag === "change in emissions") {
        updateText = choose_textArray[attrFlag][j];
      } else {
        if (attrFlag === "Diesel price" || attrFlag === "Gas price" || 
            attrFlag === "Measurement year" || attrFlag === "Low BUA % (2014)" ||
            attrFlag === "High BUA % (2014)") {
          firstValue = cb_values[1];
          nextValues = cb_values[j];
        } else {
          firstValue = formatDecimalk(cb_values[1]);
          nextValues = formatDecimalk(cb_values[j]);
        }

        if (j === 0) updateText = "< " + firstValue;
        else updateText = "> " + nextValues;
      }
      return updateText;
    })
    .attr("y", 18)
    .attr("x", function (d, i) {
      if (attrFlag === "methodology") xpos = [14,74,172,251,325,386];
      else if (attrFlag === "Measurement year") xpos = [0,80,160,240,320, 280+120];
      else if (attrFlag === "Population") xpos = [2,81,161,241,321,402];
      else if (attrFlag === "population density") xpos = [4,75,147,217,288,333];
      else if (attrFlag === "GDP/capita") xpos = [7,77,146,216,281,333];
      else if (attrFlag === "Diesel price" || 
               attrFlag === "Gas price") xpos = [4,83,163,244,323,405,481];
      else if (attrFlag === "Low BUA % (2014)" ||
               attrFlag === "High BUA % (2014)") xpos = [13,94,173,254,333,407];
      else xpos = [3,82,162,241,321,403]; 
      return xpos[i];
    })
    .style("display", function () {
      return (attrFlag === "none") ? "none" : "inline";
    });

  
}

function fn_legendRectTooltip(attrFlag) {
  //svg created in fn_barChartLegend()
  var svgCB = d3.select("#barChartLegend").select("svg");

  //tooltip for legend rects  
  var tool_tip = d3.tip()
      .attr("class", function () {
        if (attrFlag != "methodology") {
          return "d3-tip-deactive";
        }
        else return "d3-tip";
      })
      .offset([-10, 0])
      .html(function (d, i) {
        if (attrFlag != "methodology") {return "";}
        else {
          return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                     + Object.values(protocolDict)[i];
        }
      });
  svgCB.call(tool_tip);

  //select rects and call tooltip
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);
}

// ...............................
// barChart visual interactivity

// Enlarge x-axis labels and reset
function fn_enlargeName(geogroup_name, cityName) {
  idName = format_idName(cityName);
  //hack for Singapore
  var var_cityName = cityName; 
  if (cityName === "Singa") var_cityName = "Singapore";

  //Enlarge city label of selected bar
  newSize="16px";
  //Need different sizes on account of the vieweBox scale stretching
  // if (geogroup_name === "groupEuropeSEAsia" || geogroup_name === "groupLatinAmer" ||
  //     geogroup_name === "groupUSA"|| geogroup_name === "groupOceania" ) newSize = "16px";
  // else if (geogroup_name === "groupAfrica") newSize = "18px";
  
  d3.select("#tick" + idName).text(var_cityName)
    .style("font-size", newSize).style("opacity", 1)
    .attr("fill", colour_labelsHighlight);
}

function fn_cityLabels_perCapita (d, i, thisCityGroup) {
  if (thisCityGroup === "bar class_groupNAmer") {    
    if (d === "Cleveland" || d === "Las Vegas" || d==="Savannah" ||
        d === "Fort Collins" || d === "Hamilton, ON" || d === "Windsor, ON" ||
        d === "Knoxville" || d === "Edmonton" || d === "Emeryville, CA" ||
        d === "Nashville and Davidson") {
      xtrans = 60; ytrans = -5; rot = -90;
    }
    // else if (d === "Emeryville, CA" || d === "Knoxville") ytrans = -45 + (i*1.3);
    else ytrans = -30 + (i*0.7);
  } else if (thisCityGroup === "bar class_groupEastAsia") {    

    if (d === "Incheon" || d === "Kaohsiung" || d === "Yilan" ||
        d === "Taoyuan" || d === "Sapporo" || d === "Sendai") {
      // ytrans = -110;
      xtrans = 60; ytrans = -5; rot = -90;
    }
    else if (d === "Wonju") ytrans = -73;
    else {
    ytrans = (-60 + (i*2)) * 10/i;  //-75 + (i*2)
    }

  } else if (thisCityGroup === "bar class_groupEuropeSEAsia") {
    if (d === "Rotterdam" || d === "Uppsala" || d === "Ljubljana" ||
        d === "Umeå" || d === "Bristol" || d === "Lyon" || d === "Gävle" ||
        d === "Warsaw" || d === "Quezon" || d === "Santa Rosa" || 
        d === "Hat Yai" || d === "Singa" || //Singapore
        d === "Phuket" || d === "Ubon Ratchathani" ) {
      xtrans = 60; ytrans = 20; rot = -90;
    } else {
        if (i < 45) ytrans = -50 + (i*1.9); //Europe
        else ytrans = (-22 + ((i-45)*2)) * 25/(i-45) //SE Asia
    }

  } else if (thisCityGroup === "bar class_groupSouth") {
    if (d === "León" || d === "Toluca" || d === "Gandhinagar" || d === "Surat" ||
        d === "Coimbatore" ||
        d === "Windhoek" || d === "eThekwini" || d === "Ekurhuleni" ||
        d === "Nelson Mandela" || d === "Buffalo City" || d === "Izmir" ||
        d === "Jerusalem" ||
        d === "Auckland" || d === "Melbourne" || d === "Canberra" ) {
      xtrans = 60; ytrans = 10; rot = -90;
    }
    else {
      if (i < 32) ytrans = -15 + (i*1.5); //Latin Amer & Carribbean
      else if (i > 32 && i < 53) ytrans = -55 + (i*1.5); //South Asia
      else if (i > 53 && i < 68) ytrans = -25 + (i-53)*5; //Africa
      else if (i > 68 && i < 76) ytrans = 10 + (i-68)*5; //N Africa & W Asia
      else ytrans = -5 + (i-76)*8; //Oceania
    }

  }
}

// ...............................
// create barChart SVGs


// Create arrow + text for off-scale emissions
function fn_arrow(geogroup_id, city) {//used for offscale emission values

  var data = [];
  for (idx = 0; idx < city.length; idx++) {    
    if (city[idx] === "Rotterdam") {
      xpair = [-55]; ypair = [-25]; //posn of arrow
      xtext = [109]; ytext = [10]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    } else if (city[idx] === "Quezon") {
      xpair = [385]; ypair = [-25]; //posn of arrow
      xtext = [65]; ytext = [10]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    } 
    else if (city[0] === "Incheon" && city[1] === "Kaohsiung" && city[2] === "Yilan") {
      xpair = [-56, -50, -44]; ypair = [-150, -135, -110]; //posn of arrow and text pair
      xtext = [100, 105, 107]; ytext = [-7, 0, 3]; //posn of text

      emissionText = [offscaleEmissionsDict[city[0]], 
                      offscaleEmissionsDict[city[1]],  offscaleEmissionsDict[city[2]]];
    } else if (city[idx] === "León") {
      xpair = [-56]; ypair = [-25]; //posn of arrow
      xtext = [110]; ytext = [8]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    } else if (city[idx] === "Gandhinagar") {
      xpair = [192]; ypair = [-25]; //posn of arrow
      xtext = [108]; ytext = [8]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    }

    //define arrow name and path
    data.push({ id:idx, name:"arrow" + city[idx], path:"M 2,2 L2,11 L10,6 L2,2" });
  }
  
  
  appendArrowSVG(geogroup_id, data, city);

}
function appendArrowSVG(geogroup_id, data, city) {  
  margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

  for (idx = 0; idx < data.length; idx++) {
    svg = d3.select(geogroup_id).select(".barSVG")
             .append("g")
             .attr('height', height + margin.top + margin.bottom)
            .attr("transform", "translate(" + xpair[idx] + "," + ypair[idx] + ")") //posn of arrow and text
             .append("svg")
            .attr('width', width + margin.left + margin.right);
            

    var defs = svg.append('svg:defs')

    var paths = svg.append('svg:g')
      .attr('id', 'markers' + city[idx])
      .attr('transform', 'translate(' + 42 + ',' + 63 + ')');

    //http://tutorials.jenkov.com/svg/marker-element.html
    var marker = defs.selectAll('marker')
      .data(data)
      .enter()
      .append('svg:marker')
        .attr('id', function(d){ return 'marker_' + d.name })
        .attr('markerHeight', 13)
        .attr('markerWidth', 13)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 2)
        .attr('refY', 6)
        .append('svg:path')
          .attr('d', function(d){ return d.path; })
          .attr('fill', function(d,i) { return "#565656"; });

    ypath = [50, 50, 50]; //arrow length
    var path = paths.selectAll('path')
      .data(data)
      .enter()
      .append('svg:path')
        .attr('d', function (d, i){
          if (d.name=="arrowIncheon") ypath[idx] = 70;   
          return 'M 100,' + 0 + ' V ' + ypath[idx] + ',' + 0 + '';
        })
        .attr('stroke', function(d,i) { return "#565656"; })
        .attr('stroke-width', 1)
        .attr('stroke-linecap', 'round')
        .attr('marker-start', function(d,i){ return 'url(#marker_stub' + city[idx] + ')'; })
        .attr('marker-end', function(d,i){ return 'url(#marker_arrow' + city[idx]  + ')'; })
        .attr("transform", function (d) { //adjusts arrow proportions
          var xscale = 0.5, yscale = 0.8;         
          return "scale(" + xscale + " " + yscale + ")";          
        })
        .append('svg:path')
          .attr('d', function(d){ return d.path; });

    //arrow text
    d3.select("#markers" + city[idx]).append("text").attr("id", "text" + city[idx]);
   
    d3.select("#text" + city[idx])
      .text(emissionText[idx])
      .style("fill", "#565656")
      .attr("transform", function (d) { //adjust arrow proportions
          var xscale = 0.5, yscale = 1.9;         
          
          return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + xtext[idx] + " " + ytext[idx] + ")" ;       
      });
  }
}

// Create barChart titles for each geographic region
function fn_svgHeadings (geogroup_id) {

  if (geogroup_id === "#barChart_groupEastAsia") {
    numHeadings = ["East Asia"];
    svgTrans = [ [148, -20] ]; //y=22?
  } else if (geogroup_id === "#barChart_groupNAmer") {
    numHeadings = ["North America"];
    svgTrans = [ [148, 25] ];
  } else if (geogroup_id === "#barChart_groupEuropeSEAsia") {
    numHeadings = ["Europe", "Southeast Asia"];
    svgTrans = [ [148, 53], [1020, 53]];
  } else if (geogroup_id === "#barChart_groupSouth") {
    numHeadings = ["Latin America & Caribbean", "South Asia", "Africa",
                   "N Africa & W Asia", "Oceania"];
    svgTrans = [ [148, 61], [628, 61], [964, 61], [1109, 61], [1277, 61]];
  }  


  var svgTitle = d3.select(geogroup_id).select(".barSVG")
          .append("g")
          .attr("transform", function () {
            transx = 0;
            transy = (geogroup_id === "#barChart_EUCWLatAmerAfrica") ? 0 : -30;
            return "translate(" + transx + "," + transy + ")";
          });

  svgTitle.append("svg")
          .attr('width', 700)
          .attr('height', 100);

  for (idx = 0; idx < numHeadings.length; idx++) {
    svgTitle.append("g")
      .append("text").attr("class", "headingClass")
      .text(numHeadings[idx])
      .attr("transform", function (d) {
          var xscale = 0.5, yscale = 1.9;
          
          return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + svgTrans[idx][0] + " " + svgTrans[idx][1] + ")" ;
        });
  }
}

// ----------------------------------------------
// Functions for city card info
// ----------------------------------------------

function fn_setupSVGCityCard(svgCityCard, className, idName, transX, transY) {
  //setup text node label or value
  svgCityCard.append("text").attr("class", className)
    .attr("id", idName)
    .attr("transform", function (d) {
      return "translate(" + transX + " " + transY + ")" ;
    });
}

//Info text in svg
function fn_fillSVGCityCard (selectedCityObj, attrFlag) {
  //show city card
  d3.select("#cityCardg").select("rect").style("opacity", 1);
  
  //city name  
  var var_cityName = selectedCityObj.city;
  //hack for Singapore
  if (selectedCityObj.city === "Singa") var_cityName = "Singapore";
  svgCityCard.select("#cityCardCity").text(var_cityName)
            .style("font-size", "11px");

  //country
  svgCityCard.select("#cityCardCountry").text(selectedCityObj["country"]);

  //emissions
  svgCityCard.select("#cityCardEmissionsLabel").text("Scope-1 Emissions (see defn):")
    .style("text-decoration", "underline")
    .on("touchmove mousemove", function () {d3.select(this).style("cursor", "pointer"); })  
    .on("click", function() { 
      window.open("http://www.ghgprotocol.org/sites/default/files/ghgp/standards/GHGP_GPC_0.pdf#page=13");
  });
  svgCityCard.select("#cityCardEmissions")
    .text(formatDecimalSci(selectedCityObj["Scope1"]/1e6) + " MtCO₂eq");

  //Measurement year
  svgCityCard.select("#cityCardYearLabel").text("Measurement Year:");
  svgCityCard.select("#cityCardYear").text(function () {
    return selectedCityObj["Measurement year"];
  }).style("font-size", "11px");

  //dataset
  // var datasetText = selectedCityObj["change in emissions"] === "First year of calculation" ?
  //     selectedCityObj["change in emissions"] : selectedCityObj["change in emissions"] + " (from Measurement year)";
  if (selectedCityObj["dataset"] === "carbonn") datasetText = "carbonn Climate Registry";
  else if (selectedCityObj["dataset"] === "PKU") datasetText = "Beijing University";
  else datasetText = selectedCityObj["dataset"];

  svgCityCard.select("#cityCardDatasetLabel").text("Dataset Source:");
  svgCityCard.select("#cityCardDataset").text(function () {
    return datasetText;
  }).style("font-size", "11px");

  //protocol
  var protocolNum = selectedCityObj["methodology"];
  svgCityCard.select("#cityCardProtocolLabel").text("Protocol:");
  svgCityCard.select("#cityCardProtocol")
    .text(choose_textArray["methodology"][protocolNum - 1])
    .style("font-size", "11px");

  //selected attribute TITLE
  if (attrFlag != "methodology" && attrFlag != "change in emissions" && 
      attrFlag != "Measurement year" && attrFlag != "none") { //these attributes already on display
    if (attrFlag === "Gas price" || attrFlag === "Diesel price") {
      attrText = attrFlag + " (national value)"; 
    }
    else attrText = attrFlag;
    svgCityCard.select("#cityCardAttrLabel").text(attrText + ":");

    //selected attribute VALUE + units
    if (!selectedCityObj[attrFlag]) attrValue = "N/A";
    else {
      if (attrFlag === "Diesel price" || attrFlag === "Gas price") attrValue = selectedCityObj[attrFlag] + " " + dimUnits[attrFlag];
      else attrValue = formatComma(parseInt(selectedCityObj[attrFlag])) + " " + dimUnits[attrFlag];
    }

    svgCityCard.select("#cityCardAttr")
      .text(attrValue);
  }

}