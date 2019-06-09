// settings for stacked bar charts
import settingsEA from "./settingsEastAsia.js";
import settingsNA from "./settingsNorthAmerica.js";
import settingsEU from "./settingsEurope.js";
import settingsSEA from "./settingsSoutheastAsia.js";
import settingsLA from "./settingsLatinAmer.js";
import settingsSA from "./settingsSouthAsia.js";
import settingsAF from "./settingsAfrica.js";
import settingsNAWA from "./settingsNAWA.js";
import settingsOC from "./settingsOceania.js";

// ----------------------------------------------------
// Setup
// ----------------------------------------------------
let data = [];
let dataGHG;

const pointRadius = 5;

const cityName_array = [];

// Define the div for the gdpButton tooltip
const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// ----------------------------------------------------
// SVGs
// d3js World Map
const mapMargin = {top: 0, right: 0, bottom: 0, left: 0};
const mapWidth = 850 - mapMargin.left - mapMargin.right;
const mapHeight = 290 - mapMargin.top - mapMargin.bottom;

// barChart legend
const margin = {top: 7, right: 0, bottom: 0, left: 20};
const svg_width = 480 - margin.left - margin.right;
const svg_height = 35 - margin.top - margin.bottom;

const svgCB = d3.select("#barChartLegend").select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .style("vertical-align", "middle");

// Bar charts
const chartEA = d3.select(".data.EAdata")
    .append("svg")
    .attr("id", "barChart_groupEastAsia");

const chartNA = d3.select(".data.NAdata")
    .append("svg")
    .attr("id", "barChart_groupNAmer");

const chartEU = d3.select(".data.EUdata")
    .append("svg")
    .attr("id", "barChart_groupEurope");

const chartSEA = d3.select(".data.SEAdata")
    .append("svg")
    .attr("id", "barChart_groupSEAsia");

const chartLA = d3.select(".data.LAdata")
    .append("svg")
    .attr("id", "barChart_groupLatinAmer");

const chartSA = d3.select(".data.SAdata")
    .append("svg")
    .attr("id", "barChart_groupSouthAsia");

const chartAF = d3.select(".data.AFdata")
    .append("svg")
    .attr("id", "barChart_groupAfrica");

const chartNAWA = d3.select(".data.NAWAdata")
    .append("svg")
    .attr("id", "barChart_groupNAWA");

const chartOC = d3.select(".data.OCdata")
    .append("svg")
    .attr("id", "barChart_groupOceania");

// city card
let svgCityCard = d3.select("#mycityCardDiv").append("svg")
    .attr("width", 273)
    .attr("height", mapHeight);

svgCityCard = d3.select("#mycityCardDiv").select("svg")
    .append("g").attr("id", "cityCardg");
svgCityCard.append("rect")
    .attr("width", 200)
    .attr("height", 300)
    .attr("x", 5)
    .attr("y", -20)
    .attr("fill", "#4c87b5")
    .attr("stroke", "none");

const transx = 15;
const transy = 70;
const deltay = 14;

// -----------------------------------------------------------------------------
// AUX
function formatIDname(city) {
  const idName = city.replace(/\s/g, "_")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/'/g, "")
      .replace(/,/g, "")
      .replace(/&/g, "");
  return idName;
}

// FNS
// page texts
function pageText() {
  d3.select("#titletag").html(i18next.t("titletag", {ns: "pageText"}));
  d3.select("#pageTitle").html(i18next.t("title", {ns: "pageText"}));
}

function setupData(data) {
  dataGHG = data.map(function(d) {
    const city = d["city"];
    const region = d["Region"];
    const cityLocation = [+d["Longitude (others) [degrees]"] -360, +d["Latitude (others) [degrees]"]];
    const country = d.Country;
    const dset = d["Scope-1 source dataset"];
    const popn = +d["Population (consolidated)"];
    const area = d["city area (consolidated) [km2]"];
    const scope1 = d["Scope-1 GHG emissions [tCO2 or tCO2-eq]"];
    const measurementYear = d["Year of emission"];
    const GDP = d["GDP-PPP (others) [$BN]"];
    const s1PerCap = +d["S1 per capita"]; // will be sorted incorrectly without the "+"
    const s1PerGDP = d["Scope-1 GHG emissions [tCO2 or tCO2-eq]"]/d["GDP-PPP (others) [$BN]"];
    const gdpPerCap = d["GDP-PPP/capita (consolidated) [USD/pop]"];
    const popDensity = d["Population density (consolidated) [pop/km2]"];
    const HDD155C = +d["HDD 15.5C (clim)"];
    const CDD23C = +d["CDD 23C (clim)"];
    const dieselPrice = +d["Diesel price 2014 (others) [USD/liter]"];
    const gasPrice = +d["Gasoline price 2014 (others) [USD/liter]"];
    const HH = +d["Household size (others) [people/household]"];
    const methodologyNum = +d["MethodNum"]; // 1-6 for 6 protocols in total
    const methodologyDetails = d["Methodology details (CDP)"];
    const deltaEmissions = d["Increase/Decrease from last year (CDP)"];

    // Urban Areas
    const lowBUA2014 = +d["Low BUA - 2014 (UEX) [km2]"];
    const highBUA2014 = +d["High BUA - 2014 (UEX) [km2]"];
    const lowBUApc2014 = +d["Low BUA % - 2014 (UEX) [percent]"]*100;
    const highBUApc2014 = +d["High BUA % - 2014 (UEX) [percent]"]*100;
    const lowBUApdensity2014 = +d["Low BUA population density - 2014 (UEX) [people/km2]"];
    const highBUApdensity2014 = +d["High BUA population density - 2014 (UEX) [people/km2]"];

    // traffic and socio-economic indices
    const inrixCongestion = +d["Average congestion rate (INRIX) [percent]"];
    const inrixIdx = +d["INRIX congestion index (INRIX) [dimensionless]"];
    const inrixHours = +d["Peak hours spent in congestion (INRIX) [hours]"];
    const inrixRank = +d["Congestion rank (INRIX) [dimensionless]"];

    const tomtomCongestion = +d["Congestion Level (TomTom)"];
    const tomtomRank = +d["Congestion rank (TomTom) [dimensionless]"];
    const tomtomCongestionChange = +d["Congestion change (TomTom) [\xc3\x97 100 percent]"];
    const tomtomAMpeak = +d["Morning peak (TomTom) [percent]"];
    const tomtomPMpeak = +d["Evening peak (TomTom) [percent]"];

    const ieseHuman = +d["Human capital (IESE) [dimensionless]"];
    const ieseCohesion = +d["Social cohesion (IESE) [dimensionless]"];
    const ieseEconomy = +d["Economy (IESE) [dimensionless]"];
    const ieseManagement = +d["Public management (IESE) [dimensionless]"];
    const ieseGov = +d["Governance (IESE) [dimensionless]"];
    const ieseEnv = +d["Environment (IESE) [dimensionless]"];
    const ieseTransport = +d["Mobility and transportation (IESE) [dimensionless]"];
    const ieseUrban = +d["Urban planning (IESE) [dimensionless]"];
    const ieseIntl = +d["International impact (IESE) [dimensionless]"];
    const ieseTech = +d["Technology (IESE) [dimensionless]"];
    const ieseCIMI = +d["CIMI (IESE) [dimensionless]"];
    const ieseRank = +d["CIMI ranking (IESE) [dimensionless]"];

    const idName = formatIDname(d.city);

    cityName_array.push(city);

    return {
      "city": city,
      "idName": idName,
      "country": country,
      "region": region,
      "cityLocation": cityLocation,
      "dataset": dset,
      "Population": popn,
      "Population density": popDensity,
      "area": area,
      "Scope1": scope1,
      "Measurement year": measurementYear,
      "per capita": s1PerCap,
      "per GDP": s1PerGDP,
      "GDP-PPP": GDP,
      "GDP-PPP/capita": gdpPerCap,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "Diesel price": dieselPrice,
      "Gas price": gasPrice,
      "household size": HH,
      "methodology": methodologyNum,
      "methodology details": methodologyDetails,
      "change in emissions": deltaEmissions,
      "Low BUA (2014)": lowBUA2014,
      "Low BUA % (2014)": lowBUApc2014,
      "High BUA (2014)": highBUA2014,
      "High BUA % (2014)": highBUApc2014,
      "Low BUA density (2014)": lowBUApdensity2014,
      "High BUA density (2014)": highBUApdensity2014,
      "Avg congestion rate [%] (INRIX)": inrixCongestion,
      "congestion level (INRIX)": inrixIdx,
      "Peak hours spent in congestion (INRIX)": inrixHours,
      "Congestion rank (INRIX)": inrixRank,
      "congestion level [%] (TomTom)": tomtomCongestion,
      "World Rank (TomTom)": tomtomRank,
      "Congestion change [%] (TomTom)": tomtomCongestionChange,
      "Morning peak increase [%] (TomTom)": tomtomAMpeak,
      "Evening peak increase [%] (TomTom)": tomtomPMpeak,
      "Human Capital index (IESE)": ieseHuman,
      "Social Cohesion index (IESE)": ieseCohesion,
      "Economy index (IESE)": ieseEconomy,
      "Public Management index (IESE)": ieseManagement,
      "Governance index (IESE)": ieseGov,
      "Environment index (IESE)": ieseEnv,
      "Mobility and Transportation index (IESE)": ieseTransport,
      "Urban Planning index (IESE)": ieseUrban,
      "International Impact index (IESE)": ieseIntl,
      "Technology index (IESE)": ieseTech,
      "Cities in Motion Index (IESE)": ieseCIMI,
      "Cities in Motion Rank (IESE)": ieseRank
    };
  });
}
// Map reset button
d3.select("#mapResetButton")
    .on("click", resetMap);

function resetMap() {  
  // NB: must apply reset to svg not g
  const svg = d3.select("#map").select("svg");
  zoom.transform(svg, d3.zoomIdentity);
}

function drawMap() {
  const options = [
    {name: "Natural Earth", projection: d3.geoNaturalEarth()}
  ];

  options.forEach(function(o) {
    o.projection.rotate([0, 0]).center([40, 0]);
  });

  const projection = options[0]
      .projection
      .scale(151)
      .translate([mapWidth/1.655, mapHeight/1.67]);

  const path = d3.geoPath()
      .projection(projection)
      .pointRadius([3]);

  const graticule = d3.geoGraticule();

  const svg = d3.select("#map").append("svg")
      .attr("width", mapWidth)
      .attr("height", mapHeight);

  const g = svg.append("g");

  g.append("path")
      .datum({type: "Sphere"})
      .attr("class", "sphere")
      .attr("d", path)
      .attr("fill", "#F4F7F7")
      .attr("stroke", "grey");

  g.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  d3.json("geojson/world_countries.json", function(error, world) {
    if (error) throw error;

    d3.json("geojson/our_cities.geojson", function(error, cities) {
      if (error) throw error;

      const countries = g.attr("class", "mapg")
          .selectAll("path")
          .data(world.features)
          .enter().append("path")
          .attr("d", path)
          .attr("id", function (d) {
            const mapName = i18next.t(d.properties.name, {ns: "countries"});
            return `map${mapName}`;
          })
          .attr("class", "worldcountry")
          // tooltips
          .style("stroke-width", 1);

      // City markers from geojson file
      cities = g.selectAll("path")
          .data(cities.features)
          .enter().append("path")
          .attr("d", path)
          .attr("id", function(d, i) {
            return "city" + formatIDname(d.id);
          })
          .attr("class", function(d) {
            const cityMatch = d.id;
            const r = dataGHG.filter(function(d) {return d.city === cityMatch})[0];            
            if (r) return `worldcity ${i18next.t(r.region, {ns: "regions"})}`;
            else return "horsService";
          })
          .attr("r", 10)
          .on("mouseover", function(d) {
            highlightElements(formatIDname(d.properties.city));
          })
          .on("mouseout", function(d) {
            resetElements();
          });
    }); // ./inner d3.json
  }); // ./outer d3.json

  svg.call(zoom);  
} // ./drawMap()

// -----------------------------------------------------------------------------


function showBarChart(chart, settings, region) {
  const regionData = [];
  dataGHG.filter((d) => {
    if (d.region === region) {
      const thisObj = {};
      thisObj.region = d.region;
      thisObj.city = d.city;
      thisObj.s1PerCap = d["per capita"];
      regionData.push(thisObj);
    }
  });
  console.log("regionData: ", regionData);


  barChart(chart, settings, regionData);

  // d3.select("#svgBar").select(".x.axis").selectAll(".tick text").attr("dy", `${xlabelDY}em`);
  // updateTitles();
}

// -----------------------------------------------------------------------------
function uiHandler(event) {
  // if (event.target.name === "radio") {
  //   selectedMode = event.target.value;
  //   updatePage();
  // }
}
// -----------------------------------------------------------------------------
// Initial page load
i18n.load(["src/i18n"], () => {
  // settingsStackedSA.x.label = i18next.t("x_label", {ns: "roadArea"}),
  d3.queue()
      .defer(d3.tsv, "data/cityApp_attributes_consolidated_pruned.tsv")
      // .defer(d3.tsv, "data/cityApp_attributes_consolidated_pruned_testSA.tsv")
      .await(function(error, datafile) {
        data = datafile;

        // Page text
        pageText();

        setupData(data);
        drawMap();

        // Draw graphs
        showBarChart(chartEA, settingsEA, "East Asia");
        showBarChart(chartNA, settingsNA, "North America");
        showBarChart(chartEU, settingsEU, "Europe");
        showBarChart(chartSEA, settingsSEA, "Southeast Asia");
        showBarChart(chartLA, settingsLA, "Latin America & Caribbean");
        showBarChart(chartSA, settingsSA, "South Asia");
        showBarChart(chartAF, settingsAF, "Africa");
        showBarChart(chartNAWA, settingsNAWA, "N Africa & W Asia");
        showBarChart(chartOC, settingsOC, "Oceania");
      });
});

$(document).on("change", uiHandler);
$(document).on("change", uiHandler);
