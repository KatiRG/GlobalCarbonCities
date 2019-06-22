// settings for stacked bar charts
import settingsRow1 from "./settingsRow1.js";
import settingsRow2 from "./settingsRow2.js";
import settingsRow3 from "./settingsRow3.js";
import settingsRow4 from "./settingsRow4.js";

// ----------------------------------------------------
// Constants
const twoSigma = 0.9545;
const dummyNum = -99999999; // NaN holder
const offscaleDict = {
  "Incheon": 10, "Kaohsiung": 10, "Yilan": 10, "Rotterdam": 10, "Quezon": 10, "León": 10, "Gandhinagar": 12
};

// Define number format (2 decimal places) from utils.js
const globalSettings = {
  _selfFormatter: i18n.getNumberFormatter(2),
  formatNum: function(...args) {
    return this._selfFormatter.format(args);
  }
};

const barColourDict = {
  "protocol": ["#9DD3DF", "#C3BBE2", "#E35B5D", "#EB9F9F", "#F18052", "#F4DD51"],
  "year": ["#D8E6DB", "#DBC28F", "#CCA26A", "#997E68", "#6B5344", "#3a2d25"],
  "change in emissions": ["#53442F", "#BABE98", "#DBC28F", "#BEC3BC", "#E6E8E3"],
  "population": ["#DED8B6", "#F9C869", "#5D5061", "#875979", "#6A3058", "#2F274C"],
  "GDP_PPP_percap": ["#b8aca2", "#E394A7", "#9e9ac8", "#756bb1", "#54278f", "#3a1b64"],
  "area": ["#EDDAD0", "#D5DED9", "#99B2B7", "#5b6a6d", "#948C75", "#676251"],
  "pop_density": ["#DED8B6", "#F9C869", "#E1F5C4", "#ADD6BC", "#486d6c", "#6A3058"],
  "diesel": ["#F1F2C4", "#F2EA72", "#fec44f", "#c2cd7b", "#bf6456", "#634414"],
  "gas": ["#F1F2C4", "#F2EA72", "#fec44f", "#c2cd7b", "#bf6456", "#634414"],
  "HDD": ["#F5F5C6", "#F5DDB5", "#d6c2d0", "#a27696", "#b8d7ff", "#B8FAFF"],
  "CDD": ["#E1F5C4", "#ffeda0", "#F9D423", "#FC913A", "#FF4E50", "#e70081"],
  "Low BUA (2014)": ["#d7b5d8", "#CD7CB7", "#885F9A", "#B65873", "#5F323F", "red"],
  "low_bua_pc_2014": ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A", "#7D4755"],
  "Low BUA density (2014)": ["#d7b5d8", "#CD7CB7", "#885F9A", "#B65873", "#5F323F", "red"],
  "High BUA (2014)": ["#EEDAA7", "#E6D472", "#E79C74", "#D45659", "#7D4755", "red"],
  "high_bua_pc_2014": ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A", "#7D4755"],
  "High BUA density (2014)": ["#EEDAA7", "#E6D472", "#E79C74", "#D45659", "#7D4755", "red"],
  "Congestion rank (INRIX)": ["#F1F2C4", "#F2EA72", "#fec44f", "#CDAF7B", "#634414", "red"],
  "World Rank (TomTom)": ["#F1F2C4", "#F2EA72", "#fec44f", "#CDAF7B", "#634414", "red"],
  "Cities in Motion Index (IESE)": ["#F1F2C4", "#F2EA72", "#fec44f", "#CDAF7B", "#634414", "red"]
};

// ----------------------------------------------------
// Setup
// ----------------------------------------------------
let data = []; // for selected attributes used in city card and to colour bars
let dataGHG; // for fixed data attributes that are always needed
let selectedAttribute = "init";

const pointRadius = 5;

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

const chartRow4 = d3.select(".data.dataRow4")
    .append("svg")
    .attr("id", "barChart_groupRow4");

const transX = 15;
// const transY = 70;
// const deltaY = 14;

// -----------------------------------------------------------------------------
// FNS
// page texts
function pageText() {
  d3.select("#titletag").html(i18next.t("titletag", {ns: "pageText"}));
  d3.select("#pageTitle").html(i18next.t("title", {ns: "pageText"}));
}

function addRect() {
  // city card
  const svgCityCard = d3.select("#mycityCardDiv").append("svg")
      .attr("width", 273)
      .attr("height", mapHeight);

  const svg = svgCityCard
      .attr("width", 292)  // col 2 width
      .attr("height", mapHeight);

  const g = svg.append("g")
      .attr("id", "cityCardg")

  g.append("rect")
      .attr("width", 260)
      .attr("height", 310)
      .attr("x", 5)
      .attr("y", -20);
}

// ----------------------------------------------------------------
const card = d3.select("#mycityCardDiv");
let removedSelection = d3.select();

function showCityCard(textSet) {
  const data = textSet;

  removedSelection.remove();

  const selection = card.selectAll(".cardrow", function(d) {
    // Binds data by id
    return d.id;
  })
      .data(data);

  selection.enter()
      .append("div")
      .attr("class", function(d, i) {
        return i === 0 ? `cardrow titlerow row${i}` : `cardrow subrow row${i}`;
      })
      .html(function(d) { return d.text; });

  selection
      .attr("class", function(d, i) {
        return i === 0 ? `cardrow titlerow row${i}` : `cardrow updated row${i}`;
      })
      .html(function(d) { return d.text; });

  removedSelection = selection
      .exit()
      .attr("class", "oldrow removed")
      .html(function(d) { return d.text; });
}

// ----------------------------------------------------------------
// Returns dim extent of selected attribute
const findDimExtent = function(cb) {
  if ((selectedAttribute === "protocol") | (selectedAttribute === "year") |
    (selectedAttribute === "diesel") | (selectedAttribute === "gas") |
    (selectedAttribute === "CDD") | (selectedAttribute === "low_bua_pc_2014") |
    (selectedAttribute === "high_bua_pc_2014")) {
    data[selectedAttribute]["lims"] = d3.extent(data[selectedAttribute], function(d) {
      if (d.value > dummyNum) return d.value;
    });
  } else { // NB: ignore dummyNum
    data[selectedAttribute]["lims"] = [
      d3.mean(data[selectedAttribute], function(d) {
        if (d.value > dummyNum) return d.value;
      }) -
          d3.mean(data[selectedAttribute], function(d) {
            if (d.value > dummyNum) return d.value;
          }) * twoSigma,
      d3.mean(data[selectedAttribute], function(d) {
        if (d.value > dummyNum) return d.value;
      }) +
          d3.mean(data[selectedAttribute], function(d) {
            if (d.value > dummyNum) return d.value;
          }) * twoSigma
    ];
  }
  cb();
};

function mapValueToColour(thisCity) {
  // colour map to take data value and map it to the colour of the level bin it belongs to
  const d0 = data[selectedAttribute].lims[0];
  const d1 = data[selectedAttribute].lims[1];

  if (data[selectedAttribute].filter(function(p) {
    return (p.city === thisCity);
  }).length > 0) {
    const val = data[selectedAttribute].filter(function(p) {
      return (p.city === thisCity);
    })[0].value;

    const colourmapDim = d3.scaleQuantile()
        .domain([d0, d1])
        .range(barColourDict[selectedAttribute]);

    return colourmapDim(val); // colour for bar
  } else {
    console.log("nan: ")
    return "#e6e8e3";
  }
}

function colourBars() {
  // Colour bars according to attribute selected
  d3.selectAll(".bar-group")
      .each(function(d) {
        const thisCity = d.city;
        let thisColour;
        if (selectedAttribute === "region") {
          const thisRegion = data[selectedAttribute].filter(function(p) { return (p.city === thisCity); })[0].value;
          thisColour = i18next.t(thisRegion, {ns: "regionColours"});
        } else {
          findDimExtent(() => {
            thisColour = mapValueToColour(thisCity);
          });
        }
        d3.select(this).select("rect").style("fill", thisColour);
      });
}

// ----------------------------------------------------------------
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
      .attr("height", mapHeight)
      .attr("transform", "translate(" + -25 + "," + 0 + ")");

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
            const cityName = (d.id.indexOf(" ") !== -1) ?
              i18next.t(d.id, {ns: "cities"}) : d.id;
            return "city" + cityName;
          })
          .attr("class", function(d) {
            const cityMatch = d.id;
            const r = dataGHG.filter(function(d) {return d.city === cityMatch})[0];            
            if (r) return `worldcity ${i18next.t(r.region, {ns: "regions"})}`;
            else return "horsService";
          })
          .attr("r", 10)
          .on("mouseover", function(d) {
            highlightElements(d.properties.city);
          })
          .on("mouseout", function(d) {
            resetElements();
          });
    }); // ./inner d3.json
  }); // ./outer d3.json

  svg.call(zoom);
} // ./drawMap()

// -----------------------------------------------------------------------------
function makeRegionObj(region) {
  const regionData = [];
  dataGHG.filter((d) => {
    if (d.region === region) {
      const thisObj = {};
      thisObj.region = d.region;
      thisObj.city = d.city;
      thisObj.s1PerCap = d["s1PerCap"];
      thisObj.storeOrig = d.storeOrig ? d.storeOrig : null;
      regionData.push(thisObj);
    }
  });

  regionData.sort(function(a, b) {
    return d3.descending(a["s1PerCap"], b["s1PerCap"]);
  });

  return regionData;
}
function padRegion(data, n) {
  data.sort(function(a, b) {
    return d3.descending(a["s1PerCap"], b["s1PerCap"]);
  });

  for (let idx = 0; idx < n; idx++) {
    const thisObj = {};
    thisObj.region = data[0].region;
    thisObj.city = `${data[0].region}_gap${idx}`;
    thisObj.s1PerCap = null;
    thisObj.storeOrig = null;
    data.push(thisObj);
  }
  return data;
}


function showBarChart(chart, settings, region) {
  let regionData = [];
  regionData = makeRegionObj(region);
  if (region === "Europe") {
    const regionDataPadded = padRegion(regionData, 2);

    // add "Southeast Asia"
    regionData = regionDataPadded.concat(makeRegionObj("Southeast Asia"));
  } else if (region === "Latin America & Caribbean") {
    const region1Padded = padRegion(regionData, 2);
    const region2Padded = padRegion(makeRegionObj("South Asia"), 2);
    const region3Padded = padRegion(makeRegionObj("Africa"), 2);
    const region4Padded = padRegion(makeRegionObj("N Africa & W Asia"), 2);

    // concat the regions into one row
    regionData = region1Padded.concat(region2Padded).concat(region3Padded).concat(region4Padded);
  }

  barChart(chart, settings, regionData);

  // Define the div for the barChart rect tooltip
  const div = d3.select("body").append("div")
      .attr("class", "tooltip-bar")
      .style("opacity", 0);

  // hover over xaxis text
  d3.selectAll(".x.axis").selectAll("text")
      .on("touchmove mousemove", function(d, i) {
        if (d3.select(this).text().indexOf("_gap") === -1) {
          const cityName = (d3.select(this).text().indexOf(" ") !== -1) ?
            i18next.t(d3.select(this).text(), {ns: "cities"}) : d3.select(this).text();

          d3.select(this).classed("enlarged", true);
          d3.selectAll(`.x.axis g :not(#text_${cityName})`).style("opacity", 0.3);

          highlightElements(d3.select(this).text());
        }
      })
      .on("mouseout", function(d) {
        d3.select(this).classed("enlarged", false);
        d3.selectAll(".x.axis g text").style("opacity", 1);
        resetElements();
      });

  d3.selectAll(".bar-group")
      .on("touchmove mousemove", function(d, i) {
        const count = i + 1;
        highlightElements(d.city);

        // Tooltip
        const thisValue = d.storeOrig ? d.storeOrig : d.value;
        const tipx = 30;
        const tipy = -10;
        div.style("opacity", 1);
        div.html(`#${count}. ${d.city} <br>${globalSettings.formatNum(thisValue)} ${i18next.t("emissions per cap", {ns: "units"})}`)
            .style("left", d3.event.pageX + tipx + "px")
            .style("top", d3.event.pageY + tipy + "px");
      })
      .on("mouseout", function(d) {
        resetElements();
      });
}

// -----------------------------------------------------------------------------
// Fn to load attribute data
const loadData = function(cb) {
  if (!data[selectedAttribute]) {
    d3.json(`data/cityApp_attributes_consolidated_${selectedAttribute}.json`, function(err, filedata) {
      data[selectedAttribute] = filedata;
      console.log("data in loadData: ", data)
      cb();
    });
  } else {
    cb();
  }
};

// -----------------------------------------------------------------------------
function uiHandler(event) {
  selectedAttribute = event.target.value;
  loadData(() => {
    colourBars();
  });
}
// -----------------------------------------------------------------------------
// Initial page load
i18n.load(["src/i18n"], () => {
  // settingsStackedSA.x.label = i18next.t("x_label", {ns: "roadArea"}),
  d3.queue()
      .defer(d3.json, "data/cityApp_attributes_consolidated_fixedSet.json")
      .await(function(error, datafile) {
        dataGHG = datafile;
        dataGHG.map(function(d) {
          d.scope1 = d3.format(".3n")(d.scope1 / 1e6);
          if (Object.keys(offscaleDict).find((k) => k === d.city)) {
            d.storeOrig = d.s1PerCap;
            d.s1PerCap = offscaleDict[d.city];
          }
        });

        pageText();
        drawMap();

        addRect();
        const textSet = [
          {id: 1, text: i18next.t("initTitle", {ns: "cityCard"})},
          {id: 2, text: i18next.t("initRow1", {ns: "cityCard"})},
          {id: 3, text: i18next.t("initRow2", {ns: "cityCard"})},
          {id: 4, text: i18next.t("initRow3", {ns: "cityCard"})},
          {id: 5, text: i18next.t("initRow4", {ns: "cityCard"})}
        ];
        showCityCard(textSet);

        // Draw barCharts
        showBarChart(chartEA, settingsRow1, "East Asia");
        showBarChart(chartNA, settingsRow2, "North America");
        showBarChart(chartEU, settingsRow3, "Europe");
        showBarChart(chartRow4, settingsRow4, "Latin America & Caribbean");
      });
});

$(document).on("change", uiHandler);

function highlightElements(cityName) {
  const idName = (cityName.indexOf(" ") !== -1) ?
              i18next.t(cityName, {ns: "cities"}) : cityName;

  // Clear Previous
  resetElements();

  // Update city card
  const thisCountry = dataGHG.filter(function(d) {
    return (d.city === cityName);
  })[0]["country"];
  const thisScope1 = dataGHG.filter(function(d) {
    return (d.city === cityName);
  })[0]["scope1"];
  const thisYear = dataGHG.filter(function(d) {
    return (d.city === cityName);
  })[0]["year"];
  const thisDataset = dataGHG.filter(function(d) {
    return (d.city === cityName);
  })[0]["dataset"];
  const thisProtocol = dataGHG.filter(function(d) {
    return (d.city === cityName);
  })[0]["protocol"];

  let thisAttr;

  const newText = [
    {id: 1, text: `${cityName}, ${thisCountry}`},
    {id: 2, text: i18next.t("scope1Row", {ns: "cityCard"})},
    {id: 3, text: `${thisScope1} ${i18next.t("scope1", {ns: "units"})} ${i18next.t("defn", {ns: "units"})}`},
    {id: 4, text: i18next.t("yearRow", {ns: "cityCard"})},
    {id: 5, text: thisYear},
    {id: 6, text: i18next.t("datasetRow", {ns: "cityCard"})},
    {id: 7, text: i18next.t(thisDataset, {ns: "datasets"})},
    {id: 8, text: i18next.t("protocolRow", {ns: "cityCard"})},
    {id: 9, text: i18next.t(thisProtocol, {ns: "protocol"})}
  ];

  if (!data[selectedAttribute]) {
    // dropdown menu not yet selected (init page load)
    thisAttr = dataGHG.filter(function(d) {
      return (d.city === cityName);
    })[0]["region"];

    newText.push(
        {id: 10, text: i18next.t("region", {ns: "attributes"})},
        {id: 11, text: `${thisAttr}`}
    );
  } else {
    if (selectedAttribute !== "protocol" & selectedAttribute !== "year") {
      const val = data[selectedAttribute].filter(function(d) {
        return (d.city === cityName);
      })[0]["value"];

      thisAttr = val === dummyNum ? "N/A" : d3.format(",")(val) ? val : d3.format(",")(val);

      const thisUnit = thisAttr === "N/A" ? "" : i18next.t(selectedAttribute, {ns: "units"});

      newText.push(
          {id: 10, text: i18next.t(selectedAttribute, {ns: "attributes"})},
          {id: 11, text: `${thisAttr} ${thisUnit}`}
      );
    }
  }
  showCityCard(newText);

  // //Highlight Current
  // //-----------------
  // d3.select("#bar" + idName)
  //   .style("stroke", "#363636");
  d3.select(`.bar-group.${idName}`)
      .select("rect")
      .classed("active", true);

  // d3.selectAll(".bar:not(#bar" + idName + ")")
  //   .style("fill-opacity", 0.1);
  d3.selectAll(`.bar-group:not(.${idName})`)
      .select("rect")
      .classed("fade", true);

  // d3.selectAll(".node:not(#node" + idName + ")")
  //   .style("fill-opacity", 0.1)
  //   .style("stroke-opacity", 0.1);

  // d3.selectAll(".worldcity:not(#city" + idName + ")")
  //   .style("fill-opacity", 0.1)
  //   .style("stroke-opacity", 0.1);

  // //Highlight current country
  // var thisCountry = data_GHG.filter(function (d) { return d.idName === idName })[0].country.replace(/\s/g, '_');

  // d3.select("#map" + thisCountry).style("fill", countryHighlightColour);

  // d3.select("#city" + idName)
  //   .attr("stroke", "black")
  //   .attr("stroke-width", 2);
} // ./highlightElements()

// Reset elements to original style before selection
function resetElements() {
  // reset bar opacity
  d3.selectAll(".bar-group")
      .selectAll("rect")
      .classed("active", false)
      .classed("fade", false);


  // //clear previously highlighted country
  // d3.selectAll(".worldcountry")
  //   .style("stroke", "#555")
  //   .style("stroke-width", 1)
  //   .style("fill", countryColour)
  //   .style("opacity", 1);

  // //reset opacity of world cites and map
  // d3.selectAll(".worldcity").style("fill-opacity", 1)
  //   .style("stroke-opacity", 1);
  // d3.selectAll(".countries").selectAll("path").style("opacity", 1) ;
  // d3.selectAll(".worldcity")
  //   .attr("stroke-width", 1)
  //   .attr("stroke-opacity", 1);
}

function zoomed() {
  const g = d3.select("#map").select(".mapg");
  g.style("stroke-width", `${1.5 / d3.event.transform.k}px`);
  g.attr("transform", d3.event.transform); // updated for d3 v4
}

const zoom = d3.zoom()
    .on("zoom", zoomed);
