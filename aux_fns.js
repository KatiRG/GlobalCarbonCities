//----------
// General
//----------

function format_idName(city) {
  return idName = city.replace(/\s/g, '_')
                 .replace(/\(/g, '')
                 .replace(/\)/g, '')
                 .replace(/\'/g, '')
                 .replace(/\,/g, '')
                 .replace(/\&/g, '');
}

function setupData(ghg){
  data_GHG = ghg.map(function(d) {
    //each d is a line of the csv file represented as a json object
    //use + only for integers, not floats or strings

    city = d['city']
    region = d['Region']
    cityLocation = [ +d['Longitude (others) [degrees]'] -360, +d['Latitude (others) [degrees]']]
    country = d.Country
    popn = +d['Population (others)']
    area = d['City area (others) [km2]']
    totalEmissions = d['Total emissions (CDP) [tCO2-eq]'] 
    scope1 = d['Scope-1 GHG emissions [tCO2 or tCO2-eq]']
    measurementYear = +d['Year of emission']
    GDP = d['GDP-PPP (others) [$BN]']
    scope1_cap = d['Scope-1 GHG emissions [tCO2 or tCO2-eq]']/+d['Population (others)']
    scope1_gdp = d['Scope-1 GHG emissions [tCO2 or tCO2-eq]']/d['GDP-PPP (others) [$BN]']
    GDP_cap = d["GDP-PPP (others) [$BN]"]/d["Population (others)"]*Math.pow(10,9)
    pop_density = +d['Population (others)']/d['City area (others) [km2]']
    HDD155C = +d["HDD 15.5C (clim) [degrees C \xc3\x97 days]"] 
    CDD23C = +d["CDD 23C (clim) [degrees C \xc3\x97 days]"] 
    diesel_price = d["Diesel price 2014 (others) [USD/liter]"]
    gas_price = +d["Gasoline price (GEA+) [USD/liter]"]
    HH = +d["Household size (others) [people/household]"]
    methodology_num = +d['MethodNum'] //1-6 for 6 protocols in total
    methodology_details = d['Methodology details (CDP)']
    delta_emissions = d['Increase/Decrease from last year (CDP)'] //string
    delta_emissions_reason = d['Reason for increase/decrease in emissions (CDP)']//string

    //Urban Areas
    UA_cluster = +d['Urban area name (UEX)']
    //low_BUA_1990 = +d['Low BUA - 1990 (UEX) [km2]']
    //low_BUA_2000 = +d['Low BUA - 2000 (UEX) [km2]']
    low_BUA_2014 = +d['Low BUA - 2014 (UEX) [km2]']
    //high_BUA_1990 = +d['High BUA - 1990 (UEX) [km2]']
    //high_BUA_2000 = +d['High BUA - 2000 (UEX) [km2]']
    high_BUA_2014 = +d['High BUA - 2014 (UEX) [km2]']    
    //low_BUApc_1990 = +d['Low BUA % - 1990 (UEX) [percent]']*100
    //low_BUApc_2000 = +d['Low BUA % - 2000 (UEX) [percent]']
    low_BUApc_2014 = +d['Low BUA % - 2014 (UEX) [percent]']
    //high_BUApc_1990 = +d['High BUA % - 1990 (UEX) [percent]']*100
    //high_BUApc_2000 = +d['High BUA % - 2000 (UEX) [percent]']*100
    high_BUApc_2014 = +d['High BUA % - 2014 (UEX) [percent]']*100
    //low_BUA_pdensity_1990 = +d['Low BUA population density - 1990 (UEX) [people/km2]']
    // low_BUA_pdensity_2000 = +d['Low BUA population density - 2000 (UEX) [people/km2]']
    low_BUA_pdensity_2014 = +d['Low BUA population density - 2014 (UEX) [people/km2]']
    //high_BUA_pdensity_1990 = +d['High BUA population density - 1990 (UEX) [people/km2]']
    //high_BUA_pdensity_2000 = +d['High BUA population density - 2000 (UEX) [people/km2]']
     high_BUA_pdensity_2014 = +d['High BUA population density - 2014 (UEX) [people/km2]']

    //traffic and socio-economic indices
    inrix_congestion = +d['Average congestion rate (INRIX) [percent]']
    inrix_idx = +d['INRIX congestion index (INRIX) [dimensionless]']
    inrix_hours = +d['Peak hours spent in congestion (INRIX) [hours]']
    inrix_rank = +d['Congestion rank (INRIX) [dimensionless]']

    tomtom_congestion = +d['Congestion Level (TomTom)']
    tomtom_rank = +d['Congestion rank (TomTom) [dimensionless]']
    tomtom_congestion_change = +d['Congestion change (TomTom) [\xc3\x97 100 percent]']
    tomtom_am_peak = +d['Morning peak (TomTom) [percent]']
    tomtom_pm_peak = +d['Evening peak (TomTom) [percent]']

    iese_human = +d['Human capital (IESE) [dimensionless]']
    iese_cohesion = +d['Social cohesion (IESE) [dimensionless]']
    iese_economy = +d['Economy (IESE) [dimensionless]']
    iese_management = +d['Public management (IESE) [dimensionless]']
    iese_gov = +d['Governance (IESE) [dimensionless]']
    iese_env = +d['Environment (IESE) [dimensionless]']
    iese_transport = +d['Mobility and transportation (IESE) [dimensionless]']
    iese_urban = +d['Urban planning (IESE) [dimensionless]']
    iese_intl = +d['International impact (IESE) [dimensionless]']
    iese_tech = +d['Technology (IESE) [dimensionless]']
    iese_cimi = +d['CIMI (IESE) [dimensionless]']
    iese_cimi_rank = +d['CIMI ranking (IESE) [dimensionless]']


    idName = format_idName(d.city);

    cityName_array.push(city)
   
    return {      
      "city": city,
      "idName": idName,
      "country": country,
      "region": region,
      "cityLocation": cityLocation,
      "total emissions": totalEmissions,
      "population": popn,
      "population density": pop_density,
      "area": area,
      "Scope1": scope1,
      "measurement year": measurementYear,
      "per capita": scope1_cap,
      "per GDP": scope1_gdp,      
      "GDP": GDP,
      "GDP/capita": GDP_cap,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "diesel price": diesel_price,
      "gas price": gas_price,
      "household size": HH,
      "methodology": methodology_num,
      "methodology details": methodology_details,
      "change in emissions": delta_emissions,
      "reason for change": delta_emissions_reason,
      "low BUA (2014)": low_BUA_2014,
      "low BUA % (2014)": low_BUApc_2014,
      "high BUA (2014)": high_BUA_2014,     
      "high BUA % (2014)": high_BUApc_2014,
      "low BUA density (2014)": low_BUA_pdensity_2014,
      "high BUA density (2014)": high_BUA_pdensity_2014,
      "Avg congestion rate [%] (INRIX)": inrix_congestion,
      "congestion level (INRIX)": inrix_idx,
      "Peak hours spent in congestion (INRIX)": inrix_hours,
      "Congestion rank (INRIX)": inrix_rank,
      "congestion level [%] (TomTom)": tomtom_congestion,
      "World Rank (TomTom)": tomtom_rank,
      "Congestion change [%] (TomTom)": tomtom_congestion_change,
      "Morning peak increase [%] (TomTom)": tomtom_am_peak,
      "Evening peak increase [%] (TomTom)": tomtom_pm_peak,
      "Human Capital index (IESE)": iese_human,
      "Social Cohesion index (IESE)": iese_cohesion,
      "Economy index (IESE)": iese_economy,
      "Public Management index (IESE)": iese_management,
      "Governance index (IESE)": iese_gov,
      "Environment index (IESE)": iese_env,
      "Mobility and Transportation index (IESE)": iese_transport,
      "Urban Planning index (IESE)": iese_urban,
      "International Impact index (IESE)": iese_intl,
      "Technology index (IESE)": iese_tech,
      "Cities in Motion Index (IESE)": iese_cimi
    };
  })

} // ./setupData()

// Reset elements to original style before selection
function resetElements() {
  //reset bar opacity
  d3.selectAll(".bar")
    .style("fill-opacity", 1)
    .style("stroke", "none");


  //clear previously highlighted country
  d3.selectAll(".countries").selectAll("path")
    .style("stroke","#555")
    .style("stroke-width", 1)
    .style("fill", countryColour)
    .style("opacity", 1);

  //reset opacity of world cites and map
  d3.selectAll(".worldcity").style("fill-opacity", 1)
    .style("stroke-opacity", 1);
  d3.selectAll(".countries").selectAll("path").style("opacity", 1) ;
  d3.selectAll(".worldcity")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 1);   
}

//----------------------------------------------
// Functions for map
//----------------------------------------------
function highlightCountry(countryName, idName, dataObj)  {
  var matchColour = regionColourMap[
                        dataObj.find(x => x.idName.includes(idName)).region
                      ];

  if (countryName === "South Africa") {
      d3.select("#mapSouth Africa")
        .style("stroke-width", 4)
        // .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);
        .style("stroke", "#555");
  }
  else {
    d3.select("#map" + countryName)
      .style("stroke-width", 4)
      .style("stroke", "#555")
      .style("stroke-opacity", 1);
      // .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);

    // d3.selectAll(".countries")
    //   .selectAll("path:not(#map" + countryName + ")")
    //   .style("opacity", 0.3);
  }
}

//----------------------------------------------
// Functions for emissionsBarChart()
//----------------------------------------------

//...............................
// barChart data fns

//concatenate geogroups together, separated by a gap
function fn_concat (barChartGroup, geogroupArray, this_dim) {
  objArray = [];
  count = 0; //for gap id labels
  
  for (idx=0; idx < geogroupArray.length; idx++) {   
    //Extract data by region
    ghg_extract = sortByRegion(geogroupArray[idx]);
    console.log('ghg_extract: ', ghg_extract)

    //Sort by this_dim in descending order
    ghg_extract.sort((a, b) => d3.descending(a[this_dim], b[this_dim]));

    //Rotterdam, Kaohsiung, Taoyuan, Lagos -- special cases that do not fit on scale
    //Reduce bar height and indicate true value graphically on the chart
    if (geogroupArray[idx] === "groupEurope" && this_dim === "per capita") {     
      var selectedCity = data_GHG.find(x => x.city === "Rotterdam");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCap === 0) {
        rotterdamEmissionsPerCap = formatDecimalSci(selectedCity[label_dataPerCap]);
        storeFlagCap = 1;
      }
      
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 11;
    } else if (geogroupArray[idx] === "groupAsia" && this_dim === "per GDP") {      
      var selectedCity1 = data_GHG.find(x => x.city === "Kaohsiung");
      var selectedCity2 = data_GHG.find(x => x.city === "Taoyuan");     

      //Store actual value for later display.Store only once!!!
      if (storeFlagGDP === 0) {
        kaohsiungEmissionsPerGDP = formatDecimalSci(selectedCity1[label_dataPerGDP]);
        taoyuanEmissionsPerGDP = formatDecimalSci(selectedCity2[label_dataPerGDP]);       
        storeFlagGDP = 1;
      }
      
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity1[label_dataPerGDP] = 0.114;
      selectedCity2[label_dataPerGDP] = 0.114;    

    } else if (geogroupArray[idx] === "groupAfrica" && this_dim === "per GDP") {
      var selectedCity = data_GHG.find(x => x.city === "Lagos");

      //Store actual value for later display.Store only once!!!
      if (storeFlagGDPAfrica === 0) {
        lagosEmissionsPerGDP = formatDecimalSci(selectedCity[label_dataPerGDP]);
        storeFlagGDPAfrica = 1;
      }    

      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerGDP] = 0.23;
    } 

    //Concatenate with a gap obj in between
    if (idx % 2 == 0) {
      objArray = objArray.concat(ghg_extract);
    } else {
      objArray = objArray.concat(
        [{ "city":"gap" + barChartGroup + count,  
           "region": barChartGroup,
           "per capita":0, 
           "per GDP": 0 }]
      );
      count++;
    }
  } //.for

  //save cityOrder
  if (this_dim === "per capita") {
    if (barChartGroup === "groupUSAAsia") cityOrder_row1 = objArray.map(x => x["city"]);
    else cityOrder_row2 = objArray.map(x => x["city"]);
  }


  return objArray;
}

//Abbreviate city name in x-axis
function fn_abbr(d) {
  if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
  else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
  else abbr = d.substring(0,4);

  return abbr;
}

function sortByRegion(region, this_dim) {
  console.log("region in sortByRegion: ", region)

  ghg_byRegion = [];
  data_GHG.forEach(function (d) {
    if (regionsDict[d.region] === region && d[this_dim] != "") ghg_byRegion.push(d);
  });
  console.log('ghg_byRegion: ', ghg_byRegion)
  return ghg_byRegion;
}

function fn_reorderByEmissionsPerCapita(region, emissions_perGDP) {
  var city_order = [];
  var objArray = [];

  // if (region === "groupUSAAsia") {
  //   city_order = cityOrder_row1;
  // } else city_order = cityOrder_row2;

  city_order = (region === "groupUSAAsia" ? cityOrder_row1 : cityOrder_row2);

  //Re-order emissions_perGDP according to city_order of emissions per capita
  for (idx = 0; idx < city_order.length; idx++) {
    match = emissions_perGDP.filter(x => x.city === city_order[idx]); //in array form
    if (match.length != 0) objArray.push(match[0]);
  }

  return objArray;
}

//...............................
// barChart updates

function fn_colour_barChart (attrFlag, attrValue) {
  //console.log("fn_colour_barChart")
  
  if (attrFlag === "methodology") {//integers from 1-5, no mapping needed
    return colour_methodNum[attrValue];
  } else if (attrFlag === "change in emissions") {
    return choose_colourArray[attrFlag][ emissionsChangeDict[attrValue] ];
  } else {
     
    colourmapDim = fn_colourmapDim(attrFlag);

    //plot missing data in light gray
    if (attrFlag === "HDD 15.5C" || attrFlag === "CDD 23C") {return colourmapDim(attrValue);} //zeros are real
    else {return attrValue === 0 ? "#E6E8E3" : colourmapDim(attrValue);}
  } 
}
function fn_colourmapDim (attrFlag) {
  //console.log("fn_colourmapDim")
  dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];

  //colour map to take data value and map it to the colour of the level bin it belongs to
  colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
            .domain([dimExtent[0], dimExtent[1]])
            .range(choose_colourArray[attrFlag]);

  return colourmapDim;
}
function fn_updateLegend (attrFlag) {
  console.log("fn_updateLegend")
  if (attrFlag != "methodology") {  
    dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];
    //difference between max and min values of selected attribute
    delta = ( dimExtent[1] - dimExtent[0] )/num_levels;
    
    console.log("delta: ", delta)
    console.log("dimExtent: ", dimExtent)

    cb_values=[]; //clear
    for (idx=0; idx < num_levels; idx++) {
      if (attrFlag === "diesel price" || attrFlag === "gas price" ||
          attrFlag === "area" || attrFlag === "HDD 15.5C" || attrFlag === "CDD 23C" ||
          attrFlag === "low BUA (2014)" || attrFlag === "high BUA (2014)" ||
          attrFlag === "low BUA density (2014)" || attrFlag === "measurement year" ||
          attrFlag === "Congestion rank (INRIX)" || attrFlag === "World Rank (TomTom)" ||
          attrFlag === "Cities in Motion Index (IESE)") {
        cb_values.push(dimExtent[0] + idx*delta);
      }
      else if (attrFlag === "low BUA % (2014)" || attrFlag === "high BUA % (2014)") {
        //delta = Math.round(delta);
        cb_values.push( 20 + idx*20 );
      }
      else {
        delta = Math.round(delta/1000)*1000;
        cb_values.push(Math.round((dimExtent[0] + idx*delta)/1000)*1000);
      }
    }
    console.log("cb_values: ", cb_values)

    //colour map to take data value and map it to the colour of the level bin it belongs to
    var colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
              .domain([dimExtent[0], dimExtent[1]])
              .range(choose_colourArray[attrFlag]);
  }

   //svg crated in fn_barChartLegend()
  var svgCB = d3.select("#barChartLegend").select("svg");

  //tooltip for legend rects  
  var tool_tip = d3.tip()
      .attr("class", function () {
        // if (attrFlag === "population density" || attrFlag === "GDP/capita") {
        if (attrFlag != "methodology") {
          return "d3-tip-deactive";
        }
        else return "d3-tip";
      })
      .offset([-10, 0])
      .html(function (d, i) {
        // if (attrFlag === "population density" || attrFlag === "GDP/capita") {return "";}
        if (attrFlag != "methodology") {return "";}
        else {
          return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                     + Object.values(protocolDict)[i];
        }
      });
  svgCB.call(tool_tip);

  //Colour legend squares
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .attr("fill", function (i, j) {
      //colourmapDim(cb_values[j]);
      return choose_colourArray[attrFlag][j];
    })
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);


  //label the legend squares
  d3.select("#barChartLegend")
    .selectAll("text")
    .text(function (i, j) {
      if (attrFlag === "methodology" || attrFlag === "change in emissions") {
        updateText = choose_textArray[attrFlag][j];
      // } else if (attrFlag === "change in emissions") {
      //   updateText = Object.keys(emissionsChangeDict)[j];
      } else {
        console.log("cb_values format: ", cb_values[j] )

        if (attrFlag === "diesel price" || attrFlag === "gas price" || attrFlag === "measurement year") {
          firstValue = cb_values[1];
          nextValues = cb_values[j];
        } else if (attrFlag === "low BUA % (2014)" || attrFlag === "high BUA % (2014)") {
          firstValue = 20;
          nextValues = cb_values[j-1];
        } else {
          firstValue = formatDecimalk(cb_values[1]);
          nextValues = formatDecimalk(cb_values[j]);
        }

        if (j === 0) updateText = "< " + firstValue;
        else updateText = "> " + nextValues;
      }
      return updateText;
    })
    .attr("x", function (d, i) {
      if (attrFlag === "methodology") xpos = [10,63,150,215,284];
      else if (attrFlag === "change in emissions") xpos = [26,96,147,217,295];
      else if (attrFlag === "population density") xpos = [4,75,147,217,288];
      else if (attrFlag === "GDP/capita") xpos = [7,77,146,216,281];
      else if (attrFlag === "diesel price" || attrFlag === "gas price") xpos = [4,75,145,215,285];
      else if (attrFlag === "low BUA % (2014)" ||
               attrFlag === "high BUA % (2014)") xpos = [13,84,153,224,295];
      else xpos = [4,75,145,215,285];
      return xpos[i];
    });

    //update the units displayed in the legend
    d3.select("#barChartLegendUnits")
      .text(function () {return dimUnits[attrFlag]});
}

//...............................
// barChart visual interactivity

//Enlarge x-axis labels and reset
function fn_enlargeName(geogroup_name, cityName) {
  idName = format_idName(cityName);

  //Enlarge city label of selected bar
  newSize="14px";
  //Need different sizes on account of the vieweBox scale stretching
  if (geogroup_name === "groupEurope" || geogroup_name === "groupLatinAmer" ||
      geogroup_name === "groupUSA"|| geogroup_name === "groupOceania" ) newSize = "21px";
  else if (geogroup_name === "groupAfrica") newSize = "18px";
  else if (geogroup_name === "groupAsia") newSize = "18px";
  
  d3.select("#tick" + idName).text(cityName)
    .style("font-size", newSize).style("opacity", 1)
    .attr("fill", colour_labelsHighlight);
}

function fn_cityLabels_perCapita (d, i, thisCityGroup) {
  if (thisCityGroup === "bar class_groupUSA") {    
    if (d === "Cleveland" || d === "Las Vegas") {
      xtrans = 60; ytrans = -5; rot = -90;
    }
    else if (d === "Savannah") ytrans = -75;
    else if (d === "Emeryville, CA" || d === "Knoxville") ytrans = -45 + (i*1.3);
    else ytrans = -35 + (i*1.1);
  } else if (thisCityGroup === "bar class_groupAsia") {    

    if (d === "Incheon") {
      // ytrans = -110;
      xtrans = 60; ytrans = -5; rot = -90;
    }
    else if (d === "Kaohsiung") ytrans = -70;
    else if (d === "Yilan") ytrans = -65;
    else if (d === "Taoyuan") ytrans = -25;
    else if (d === "Hong Kong") ytrans = 0;
    else ytrans = -49 + (i*1.1);

  } else if (thisCityGroup === "bar class_groupEurope") {
                       
    if (d === "Rotterdam") {// || d === "Ljubljana") {
      xtrans = 60; ytrans = 20; rot = -90;
    }
    else ytrans = -30 + (i*1.9);

  } else if (thisCityGroup === "bar class_groupCan") {
    if (d === "Hamilton, ON" || d === "Windsor, ON" || d === "Edmonton") {
      xtrans = 60; ytrans = 0; rot = -90;
    }
    else if (d === "Vancouver") ytrans = -10;
    else if (d === "North Vancouver") ytrans = 5;
    else if (d === "Ajax") ytrans = 30;
    else ytrans = -120 + (i*1.9);

  } else if (thisCityGroup === "bar class_groupOceania") {
    if (d === "Auckland") ytrans = -29;
    else ytrans = -130 + (i*2.3);
    
  } else if (thisCityGroup === "bar class_groupLatinAmer") {
    if (d === "Buenos Aires") ytrans = -20;
    else if (d === "Guaratinguetá") ytrans = -15;
    else ytrans = -110 + (i*1.9);
    
  } else if (thisCityGroup === "bar class_groupAfrica") ytrans = -160 + (i*2.2);
}

function fn_cityLabels_perGDP (d, i, thisCityGroup) {
  // thisRegion = data_GHG.find(x => x.city.includes(d)).region;  

  if (thisCityGroup === "bar class_groupUSA") {
    if (d === "Las Vegas") {rot = -90; xtrans = 60; ytrans = -15;}
    else if (d === "DC") ytrans = -40; //-3 + (i*1.6);
    else if (d === "Nashville & Davidson") ytrans = -20; //-3 + (i*1.6);
    //else if (d === "Cleveland") ytrans = -3 + (i*1.6);
    else ytrans = -36 + (i*1.2);
  } else if (thisCityGroup === "bar class_groupAsia") {
    if (d === "Kaohsiung" || d === "Taoyuan") {
      xtrans = 60; ytrans = -5; rot = -90;
    }  else if (d === "Taoyuan") {rot = -65; ytrans = -25;}
    else if (d === "Hong Kong") ytrans = -75;
    else if (d === "Incheon") ytrans = -35;
    else ytrans = -75 + (i*1.5);

  } else if (thisCityGroup === "bar class_groupEurope") {          
      if (d === "Manchester") ytrans = -20;
      else if (d === "Warsaw" || d === "Rotterdam") ytrans = 0;
      else ytrans = 20 + (i*0.7);

  } else if (thisCityGroup === "bar class_groupCan") {
      if (d === "Winnipeg") ytrans = -175 + (i*3.7);
      else if (d === "Edmonton" || d === "Calgary") ytrans = -185 + (i*4.3);      
      else ytrans = -170 + (i*4.3);

  } else if (thisCityGroup === "bar class_groupOceania") {
      if (d === "Auckland") ytrans = -50;
      else ytrans = -175 + (i*3.9);
  } else if (thisCityGroup === "bar class_groupLatinAmer") {
      if (d === "Caracas") {xtrans = 60; ytrans = -5; rot = -90;}
      else if (d === "Santiago") ytrans = -36;
      else ytrans = -135 + (i*2.2);
    
  } else if (thisCityGroup === "bar class_groupAfrica") {//ytrans = -160 + (i*2.2);
      // xtrans = 60; ytrans = 15; rot = -90;
      ytrans = -340 + (i*4.2);
    }
}

//...............................
// create barChart SVGs

//Create colour bar boxes
function fn_barChartLegend() {
  
  //setup params
  var margin = {top: 7, right: 0, bottom: 0, left: 20};
  var svg_width = 450 - margin.left - margin.right,
      svg_height = 35 - margin.top - margin.bottom;

  var rect_dim = 15;

  //colour array
  rect_colourArray = choose_colourArray[attrFlag];

  //make svg
  var svgCB = d3.select("#barChartLegend").select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .style("vertical-align", "middle");

  //tooltip for legend rects  
  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (d, i) {
      return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                   + Object.values(protocolDict)[i];
    });
  svgCB.call(tool_tip);

 //make colourbar rects
  var rects = svgCB.selectAll('rect')
              .data(rect_colourArray)
              .enter()
              .append('g');

  var rectAttributes = rects.append("rect")
                  .attr("width", rect_dim)
                  .attr("height", rect_dim)
                  .attr("y", 5)
                  .attr("x", function (d, i) {
                    return 41 + i * 70;
                  })
                  .attr("fill", function (d, i) {
                    //return colour_methodNum[i + 1];                    
                    return rect_colourArray[i];
                  })
                  .on('mouseover', tool_tip.show)
                  .on('mouseout', tool_tip.hide);

  rects.append("text")
        .text(function (d, i) {
          return Object.keys(protocolDict)[i];
        })
        .attr("y", 10)
        .attr("x", function (d, i) {
          var xpos = [10,63,150,215,284];
          return xpos[i];
        })
        .attr("dy", "6px")
        .style("fill","#565656")
        .style("stroke", "none")
       .style("font-size", "11px");
       
        
}

//Regional line legend for barCharts
function fn_appendRegionalLine() {
  var regionalLine = d3.select("#barChartLegend").select("svg")
                       .append("g");

  regionalLine.selectAll("line")
      .data([0])
      .enter().append("line")
      .attr("class", "line")
      .style("stroke", "black")
      .style("opacity", 0.7)
      .style("stroke-width", "1.5px")
      .attr("x1", 417)
      .attr("y1", 12)
      .attr("x2", 440)
      .attr("y2", 12);

  regionalLine.append("text")
    .attr("class", "textLabels")
    .attr("dx", 340)
    .attr("dy", 15)
    .text("regional mean")
    .style("font-size", "11px")
    .style("fill","#565656")
    .style("stroke", "none");


}

//Append regional means as lines to barCharts
function fn_appendRegionalMeans(svg, geogroup_name, this_dim, data, x, y) {
  //data to plot
  var regionalVar = [];
  regionalVar[0] = this_dim === "per capita" ? 
                    regionalAvgs[geogroup_name] : regionalAvgs_GDP[geogroup_name];

  //city at x-axis endpts of horizontal line
  var x1_city = data[0].city;
  var x2_city = data[data.length - 1].city;

  //Tooltip for lines  
  var tool_tip = d3.tip()
    .attr("class", "d3-tip-line")
    .offset([-10, 0])
    .html(function (d, i) {
      console.log("this_dim: ", this_dim)
      console.log("this_dim u: ", dimUnits[this_dim])
      return (this_dim === "per capita" ? regionalVar : formatDecimalk(regionalVar[0]) )
             + " " + dimUnits[this_dim];
    });
  svg.call(tool_tip);

  //append line for regional mean
  svg.append("g").selectAll("line")
    .data(regionalVar)
    .enter().append("line")
    .attr("class", "line")
    .style("stroke", "#555")
    .style("stroke-width", "2px")
    .attr("x1", function (d, i) { return x(x1_city); })
    .attr("y1", function (d, i) { return y(d); })
    .attr("x2", function (d, i) { return x(x2_city); })
    .attr("y2", function (d, i) { return y(d); });

  //make an invisible fat line and use for tooltip so that
  //user does not have to position mouse over thin regional line
  //with surgical precision
  svg.append("g").selectAll("line")
    .data(regionalVar)
    .enter().append("line")
    .attr("class", "line")
    .style("stroke", "#555")
    .style("stroke-width", "6px")
    .style("opacity", 0)
    .attr("x1", function (d, i) { return x(x1_city); })
    .attr("y1", function (d, i) { return y(d); })
    .attr("x2", function (d, i) { return x(x2_city); })
    .attr("y2", function (d, i) { return y(d); })
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide); 
}

//Create arrow + text for off-scale emissions
function fn_arrow(geogroup_id, city) {//used for Rotterdam (per cap) and Lagos (per GDP)
  if (city[0] === "Lagos") {
    if (d3.select("#reorderButton").text() === "Re-order") {//bars sorted by emissions/GDP          
      xpair = [544]; ypair = [-20]; //posn of arrow and text pair
      xtext = [-35]; ytext = [10]; //posn of text

    } else { //bars sorted by emissions/capita
      xpair = [568]; ypair = [-55]; //posn of arrow and text pair
      xtext = [-34]; ytext = [19]; //posn of text
    }
    emissionText = [lagosEmissionsPerGDP + " kgCO₂eq/USD"];
  } else if (city[0] === "Rotterdam") {
      xpair = [-56]; ypair = [-25]; //posn of arrow and text pair    
      xtext = [109]; ytext = [10]; //posn of text
      emissionText = [rotterdamEmissionsPerCap + " kgCO₂eq/USD"];
  } else if (city[0] === "Kaohsiung" && city[1] === "Taoyuan") {
    if (d3.select("#reorderButton").text() === "Re-order") {
      //bars sorted by emissions/GDP
      xpair = [449, 457.5]; ypair = [-55, -55]; //posn of arrow and text pair
      xtext = [-39, -53]; ytext = [10, 36]; //posn of text
    } else { //bars sorted by emissions/capita
      xpair = [457.4, 476]; ypair = [-55, -55]; //posn of arrow and text pair
      xtext = [-38, 105]; ytext = [10, -5]; //posn of text
    }
    emissionText = [kaohsiungEmissionsPerGDP + " kgCO₂eq/USD", 
                    taoyuanEmissionsPerGDP + " kgCO₂eq/USD"];

  }

  var data = [];
  for (idx = 0; idx < city.length; idx++) {
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

    ypath = [50, 80]; //arrow length
    var path = paths.selectAll('path')
      .data(data)
      .enter()
      .append('svg:path')
        .attr('d', function (d, i){          
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

//Create barChart titles for each geographic region
function fn_svgHeadings (geogroup_id) {

  if (geogroup_id === "#barChart_EUCWLatAmerAfrica") {
    numHeadings = ["Europe","Canada", "Australia - NZ", "Latin Amer", "Africa"];
    svgTrans = [ [64, 10], [623, 10], [791, 10], [925, 10], [1259, 10] ];
  } else {
    numHeadings = ["USA", "Asia"];
    svgTrans = [ [64, 15], [1069, 15] ]; //y=22?
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

//----------------------------------------------
// Functions for city card info
//----------------------------------------------

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
  // console.log("selectedCityObj in fn: ", selectedCityObj)
  // console.log("attrFlag in fn: ", attrFlag)

  //show city card
  d3.select("#cityCardg").select("rect").style("opacity", 1);
  
  //city name
  svgCityCard.select("#cityCardCity").text(selectedCityObj.city);

  //country
  svgCityCard.select("#cityCardCountry").text(selectedCityObj["country"]);

  //emissions
  svgCityCard.select("#cityCardEmissionsLabel").text("Scope 1 Emissions:")
    .style("text-decoration", "underline")
    .on("touchmove mousemove", function () {d3.select(this).style("cursor", "pointer"); })  
    .on("click", function() { 
      window.open("http://www.ghgprotocol.org/sites/default/files/ghgp/standards/GHGP_GPC_0.pdf#page=13");
  });
  svgCityCard.select("#cityCardEmissions")
    .text(formatDecimalSci(selectedCityObj["Scope1"]/1e6) + " MtCO₂eq");

  //measurement year
  svgCityCard.select("#cityCardYearLabel").text("Measurement Year:");
  svgCityCard.select("#cityCardYear").text(function () {
    return selectedCityObj["measurement year"];
  });

  //change in emissions
  var changeText = selectedCityObj["change in emissions"] === "First year of calculation" ?
      selectedCityObj["change in emissions"] : selectedCityObj["change in emissions"] + " (from measurement year)";
  svgCityCard.select("#cityCardChangeLabel").text("Emissions Change:");
  svgCityCard.select("#cityCardChange").text(function () {
    return changeText;
  });

  //protocol
  var protocolNum = selectedCityObj["methodology"];
  svgCityCard.select("#cityCardProtocolLabel").text("Protocol:");
  svgCityCard.select("#cityCardProtocol")
    .text(choose_textArray["methodology"][protocolNum - 1]);

  //selected attribute
  if (attrFlag != "methodology" && attrFlag != "change in emissions" && 
      attrFlag != "measurement year") { //these attributes already on display
    if (attrFlag === "gas price" || attrFlag === "diesel price") {
      attrText = attrFlag + " (national value)"; }
    else attrText = attrFlag;
    svgCityCard.select("#cityCardAttrLabel").text(attrText + ":");

    if (attrFlag === "diesel price" || attrFlag === "gas price") attrValue = selectedCityObj[attrFlag];
    else attrValue = formatComma(parseInt(selectedCityObj[attrFlag]));

    svgCityCard.select("#cityCardAttr")
      .text(attrValue + " " + dimUnits[attrFlag]);
  }

}