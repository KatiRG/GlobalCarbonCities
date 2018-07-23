var formatDecimalSci = d3.format(".3n");
var formatDecimalk = d3.format(".2s"); //.2s //d3.format(".3n");
var formatComma = d3.format(",");

//------------------------------------------------
//Technical labels
label_dataPerCap = "per capita";
label_dataPerGDP = "per GDP";

//------------------------------------------------
//Map zoom fns
//https://jsfiddle.net/aftabnack/bs79qn9d/
function zoomed() {
  var g = d3.select("#map").select(".mapg");
  // g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
  g.style('stroke-width', '${1.5 / d3.event.transform.k}px')
  g.attr('transform', d3.event.transform) // updated for d3 v4
}

const zoom = d3.zoom()
             .on("zoom", zoomed);

function resetMap() {  
  //NB: must apply reset to svg not g
  var svg = d3.select("#map").select("svg")
  zoom.transform(svg, d3.zoomIdentity);
}


//------------------------------------------------
//COLOURS

nanColour = "#E6E8E3"; //barChart fill colour for NaN values

//map
//http://www.colourlovers.com/palette/1072/rainforest
//http://www.colourlovers.com/palette/659861/Snowy_Pine_Forest
var countryColour = "#18471B"; //"#172214"; //#2B292E", #000, "#d9d9d9"
var countryHighlightColour = "#BEC3BC";//"#718351"; //"#d3d3d3";  "#44522F"; "#718351"

//barChart labels + highlight colour
var colour_labels = "#636363";
var colour_labelsHighlight = "#3d3d3d";

var regionColourMap = { 
  "groupEastAsia": "#d15081", 
  "groupNAmer": "#c398db",
  "groupEurope": "#80c2ff", 
  "groupLatinAmer": "#ee8370",
  "groupSEAsia": "#C399D9", 
  "groupSAsia": "#40d5c7", 
  "groupAfrica": "#fcc751", 
  "groupOceania": "#ffa5ca",
  "groupNAfrica": "#bbd15d"
};



//Primary Methodology colours
//http://www.colourlovers.com/palette/1107950/Indecent_Proposal
//http://www.colourlovers.com/palette/1217220/Ice_Cream_Party
//http://www.colourlovers.com/palette/1645043/Vanilla_Blueberry
//http://www.colourlovers.com/palette/2832327/nostalgia
var colour_methodNum = {
  1: "#9DD3DF", //GPC 
  2: "#C3BBE2", //US ICLEI
  3: "#E35B5D", //IPCC
  4: "#EB9F9F", //ICLEI
  5: "#F18052", //OTHER
  6: "#F4DD51" //Statistical
}

var dimExtentDict = {}; //for discretizing attribute value according to range extent
var num_levels = 6;  //5; //number of discrete levels
var cb_values = [];

var choose_colourArray = {
  "none": ["#bbd4e2","#bbd4e2","#bbd4e2","#bbd4e2","#bbd4e2","#bbd4e2"],
  "methodology": ["#9DD3DF","#C3BBE2","#E35B5D","#EB9F9F","#F18052","#F4DD51"],
  "Measurement year": ["#D8E6DB","#DBC28F","#CCA26A","#997E68","#6B5344","#3a2d25"],
  "change in emissions": ["#53442F","#BABE98","#DBC28F","#BEC3BC","#E6E8E3"],
  "Population": ["#DED8B6","#F9C869","#5D5061","#875979","#6A3058","#2F274C"],
  "GDP-PPP/capita": ["#b8aca2","#E394A7","#9e9ac8","#756bb1","#54278f","#3a1b64"],
  "area": ["#EDDAD0","#D5DED9","#99B2B7","#5b6a6d","#948C75", "#676251"],
  "Population density": ["#DED8B6","#F9C869","#E1F5C4","#ADD6BC","#486d6c","#6A3058"],
  "diesel price": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"],
  "gas price": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"],
  "HDD 15.5C": ["#e3dded", "#c8bcdc","#74a9cf","#26ADE4","#034e7b"],
  "CDD 23C": ["#E1F5C4", "#ffeda0","#F9D423","#FC913A","#FF4E50"],  
  "low BUA (2014)": ["#d7b5d8","#CD7CB7","#885F9A","#B65873","#5F323F"],
  "low BUA % (2014)": ["#d7b5d8","#CD7CB7","#885F9A","#B65873","#5F323F"],
  "low BUA density (2014)": ["#d7b5d8","#CD7CB7","#885F9A","#B65873","#5F323F"],
  "high BUA (2014)": ["#EEDAA7","#E6D472","#E79C74","#D45659","#7D4755"],
  "high BUA % (2014)": ["#EEDAA7","#E6D472","#E79C74","#D45659","#7D4755"],
  "high BUA density (2014)": ["#EEDAA7","#E6D472","#E79C74","#D45659","#7D4755"],
  "Congestion rank (INRIX)": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"],
  "World Rank (TomTom)": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"],
  "Cities in Motion Index (IESE)": ["#F1F2C4","#F2EA72","#fec44f","#CDAF7B","#634414"]
}

var choose_textArray = {
  "methodology": ["GPC","US ICLEI","IPCC","ICLEI","Other","Statistical"],
  "change in emissions": ["+","-","same","1st yr","N/A"]
}

//------------------------------------------------
//Dictionaries

//Regions
var regionDict = {
  "East Asia": "groupEastAsia" , 
  "North America": "groupNAmer" ,
  "Europe": "groupEurope", 
  "Latin America & Caribbean": "groupLatinAmer",
  "Southeast Asia": "groupSEAsia", 
  "South Asia": "groupSAsia", 
  "Africa": "groupAfrica", 
  "Oceania": "groupOceania",
  "N Africa & W Asia": "groupNAfrica"
}

//Change in emissions
var emissionsChangeDict = {
  "Increased": 0,
  "Decreased": 1,
  "Stayed the same": 2,
  "First year of calculation": 3,
  "N/A": 4
}

//TOOLTIPS
var protocolDict = {
  "GPC": "Global Protocol for Community-Scale Greenhouse Gas Emissions Inventories (GPC), (WRI, C40 and ICLEI)",
  "US ICLEI": "U.S. Community Protocol for Accounting and Reporting of Greenhouse Gas Emissions (ICLEI)",
  "IPCC": "2006 IPCC Guidelines for National Greenhouse Gas Inventories",
  "ICLEI": "International Emissions Analysis Protocol (ICLEI)",
  "Other": "Combinations or subsets of methodologies, or propitiatory methodologies specific to a region/city",
  "Statistical": "Calculated from direct energy consumption statistics [China Urban Statistical Yearbook 2011]"
}

var emissionsToggleDict = {
  "per GDP": "Display emissions <b>per unit GDP</b>, in decreasing order.",
  "per capita": "Display emissions <b>per capita</b>, in decreasing order."
}

//------------------------------------------------
//Variables to store data

//acutal Scope1 Emissions/cap or Emissions/GDP for cities that are off the scale
var storeFlagCapRotterdam = 0, storeFlagCapLeon = 0, storeFlagCapGandhi = 0,storeFlagCapQuezon =0,
    storeFlagCapIncheon = 0, storeFlagCapKaohsiung = 0, storeFlagCapYilan = 0;
var storeFlagGDP = 0, storeFlagGDPAfrica = 0;

var offscaleEmissionsDict = {};

//------------------------------------------------
//FOR DISPLAY TEXTS
// var regionLabel_dict = {
//   "groupEurope": "Europe", "groupUSA": "USA", "groupCan": "Can",
//   "groupOceania": "Aus/NZ",
//   "groupAfrica": "Africa", "groupAsia": "Asia", 
//   "groupLatinAmer": "Latin America"
// };

//9 regions S1 exists/does not exist
// df_final.loc[~df_final[s1].isnull(), var_geo].value_counts()
//'East Asia', 103/102 cities
//'North America', 76/68 cities
//'Europe', 66/44 cities
//'Latin America & Caribbean', 33/30 cities
//'Southeast Asia', 22/21 cities
//'South Asia', 19/19 cities
//'Africa', 12/12 cities
//'N Africa & W Asia', 6/5 cities
//'Oceania', 6/6 cities
//Pairings
//ROW1: 'East Asia'
//ROW2: 'North America'
//ROW3: 'Europe' + 'Southeast Asia'
//ROW4: 'Latin America & Caribbean' + 'South Asia' + 'Africa' + 'N Africa & W Asia' + 'Oceania'
var regionLabel_dict = {
  "groupEastAsia": "East Asia", //103 cities, ROW1
  "groupNAmer": "North America", //75 cities, ROW2
  "groupEurope": "Europe", //69 cities, ROW3

  "groupLatinAmer": "Latin America & Caribbean", //33 cities, ROW4
  "groupSEAsia": "Southeast Asia", //22 cities, also ROW4
  "groupSAsia": "South Asia", //19 cities, also ROW4

  "groupAfrica": "Africa", //12 cities, ROW5
  "groupOceania": "Aus/NZ", //6 cities, also ROW5
  "groupNAfrica": "N Africa & W Asia" //4 cities, also ROW5
};

var dimUnits =  {
  "methodology": "",
  "measurement year": "year",
  "change in emissions": "",
  "total emissions": "[tCO₂eq]",
  "per capita": "[tCO₂eq/capita]",
  "per GDP": "[kgCO₂eq/USD]",
  "Population": "",
  "population density": "per km2",
  "GDP-PPP/capita": "[$BN/capita]",
  "area": "km2",
  "diesel price": "USD",
  "gas price": "USD",
  "HDD 15.5C": "[deg C x days]",
  "CDD 23C": "[deg C x days]",
  "low BUA (2014)": "km2 (year 2014)",
  "high BUA (2014)": "km2 (year 2014)",
  "low BUA % (2014)": "% of total BUA (year 2014)",
  "high BUA % (2014)": "% of total BUA (year 2014)",
  "low BUA density (2014)": "pop/km2 (year 2014)",
  "high BUA density (2014)": "pop/km2 (year 2014)",
  "Congestion rank (INRIX)": "",
  "World Rank (TomTom)": "",
  "Cities in Motion Index (IESE)": "",
  "household size": "",
  "region": "",
  "country": ""
}

//x-Scale factors for barChart y-axis tick labels
var xScaleFactor = {
  "#barChart_EU": 2.5, "#barChart_LatinAmer": 3,
  "#barChart_USA": 2.0, "#barChart_Can": 1.2,
  "#barChart_Oceania": 4.0, 
  "#barChart_Africa": 6, "#barChart_Asia": 3.5
}