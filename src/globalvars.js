const formatDecimalSci = d3.format(".3n");
const formatDecimalk = d3.format(".2s"); // .2s // d3.format(".3n");
const formatComma = d3.format(",");

//  ------------------------------------------------
//  COLOURS

const nanColour = "#E6E8E3"; // barChart fill colour for NaN values

//  map

const countryHighlightColour = "#e70081"; // "#BEC3BC";// "#718351"; // "#d3d3d3";  "#44522F"; "#718351"

// barChart labels + highlight colour
const colour_labels = "#636363";
const colour_labelsHighlight = "#3d3d3d";

// Primary Methodology colours
// http://www.colourlovers.com/palette/1107950/Indecent_Proposal
// http://www.colourlovers.com/palette/1217220/Ice_Cream_Party
// http://www.colourlovers.com/palette/1645043/Vanilla_Blueberry
// http://www.colourlovers.com/palette/2832327/nostalgia

// x-Scale factors for barChart y-axis tick labels
const xScaleFactor = {
  "#barChart_EU": 2.5, "#barChart_LatinAmer": 3,
  "#barChart_USA": 2.0, "#barChart_Can": 1.2,
  "#barChart_Oceania": 4.0, 
  "#barChart_Africa": 6, "#barChart_Asia": 3.5
}