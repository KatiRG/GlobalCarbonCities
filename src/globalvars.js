var formatDecimalSci = d3.format(".3n");
var formatDecimalk = d3.format(".2s"); //.2s //d3.format(".3n");
var formatComma = d3.format(",");



//------------------------------------------------
//COLOURS

nanColour = "#E6E8E3"; //barChart fill colour for NaN values

//map

var countryHighlightColour = "#e70081"; //"#BEC3BC";//"#718351"; //"#d3d3d3";  "#44522F"; "#718351"

//barChart labels + highlight colour
var colour_labels = "#636363";
var colour_labelsHighlight = "#3d3d3d";





//Primary Methodology colours
//http://www.colourlovers.com/palette/1107950/Indecent_Proposal
//http://www.colourlovers.com/palette/1217220/Ice_Cream_Party
//http://www.colourlovers.com/palette/1645043/Vanilla_Blueberry
//http://www.colourlovers.com/palette/2832327/nostalgia


//------------------------------------------------
//Dictionaries

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
  "Diesel price": "USD/litre",
  "Gas price": "USD/litre",
  "HDD 15.5C": "[deg C x days]",
  "CDD 23C": "[deg C x days]",
  "Low BUA (2014)": "km2 (year 2014)",
  "High BUA (2014)": "km2 (year 2014)",
  "Low BUA % (2014)": "% of total BUA (year 2014)",
  "High BUA % (2014)": "% of total BUA (year 2014)",
  "Low BUA density (2014)": "pop/km2 (year 2014)",
  "High BUA density (2014)": "pop/km2 (year 2014)",
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