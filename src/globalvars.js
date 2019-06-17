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