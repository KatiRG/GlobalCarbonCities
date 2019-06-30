

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


