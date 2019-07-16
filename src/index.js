// settings for stacked bar charts
import settingsRow1 from "./settingsRow1.js";
import settingsRow2 from "./settingsRow2.js";
import settingsRow3 from "./settingsRow3.js";
import settingsRow4 from "./settingsRow4.js";

// settings for other than charts
import settingsAttr from "./settingsAttr.js";
import settingsCityCard from "./settingsCityCard.js";
import settingsArr from "./settingsArrows.js";

// ----------------------------------------------------
// Constants
const twoSigma = 0.9545;
const offscaleDict = {
  "Inch": 11, "Kaoh": 11, "Yila": 11,
  "Clev": 11.1, "L V": 11.1, "Sava": 11.1, "F C": 11,
  "Rotterdam": 11,
  "Quezon": 11, "León": 11, "Gandhinagar": 11, "Izmir": 11
};

// Define number format (2 decimal places) from utils.js
const globalSettings = {
  _selfFormatter: i18n.getNumberFormatter(2),
  formatNum: function(...args) {
    return this._selfFormatter.format(args);
  }
};

const stats = {
  getTail: function(...args) {
    return args[0]*args[1];
  }
};

const noneFill = "#4a6072";

// ----------------------------------------------------
// Setup
// ----------------------------------------------------
const data = []; // for selected attributes used in city card and to colour bars
let dataGHG; // for fixed data attributes that are always needed
let selectedAttribute = "init";
let newText;

let path; // map path projection
const defaultRadius = 3;

// ----------------------------------------------------
// SVGs

// d3js World Map
const mapMargin = {top: 0, right: 0, bottom: 0, left: 0};
const mapWidth = 850 - mapMargin.left - mapMargin.right;
const mapHeight = 290 - mapMargin.top - mapMargin.bottom;

// barChart legend
const margin = {top: 7, right: 5, bottom: 0, left: 0};
const cbWidth = 520 - margin.left - margin.right;
const cbHeight = 35 - margin.top - margin.bottom;

// Bar charts
const chartEA = d3.select(".data.EAdata")
    .append("svg")
    .attr("id", "barChart_groupEastAsia");

const chartNA = d3.select(".data.NAdata")
    .append("svg")
    .attr("id", "barChart_groupNAmer");

const chartEU = d3.select(".data.EUdata")
    .append("svg")
    .attr("id", "barChart_groupRow3");

const chartRow4 = d3.select(".data.dataRow4")
    .append("svg")
    .attr("id", "barChart_groupRow4");

// Colour Bar
const svgCB = d3.select("#barChartLegend").select("svg")
    .attr("width", cbWidth)
    .attr("height", cbHeight)
    .attr("transform", "translate(120,0)")
    .style("vertical-align", "middle");

// -----------------------------------------------------------------------------
// FNS
// page texts
function pageText() {
  d3.select("#download").html(i18next.t("downloadText", {ns: "pageText"}));
  d3.select("#titletag").html(i18next.t("titletag", {ns: "pageText"}));
  d3.select("#pageTitle").html(i18next.t("title", {ns: "pageText"}));
}

function addRect() {
  // city card
  const svgCityCard = d3.select("#mycityCardDiv").append("svg")
      .attr("width", 273)
      .attr("height", mapHeight);

  const svg = svgCityCard
      .attr("width", settingsCityCard.width) // col 2 width
      .attr("height", mapHeight);

  const g = svg.append("g")
      .attr("id", "cityCardg");

  g.append("rect")
      .attr("width", settingsCityCard.rect.width)
      .attr("height", settingsCityCard.rect.height)
      .attr("x", settingsCityCard.rect.pos[0])
      .attr("y", settingsCityCard.rect.pos[1]);
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
      .html(function(d) {
        return d.text;
      });

  selection
      .attr("class", function(d, i) {
        return i === 0 ? `cardrow titlerow row${i}` : `cardrow updated row${i}`;
      })
      .html(function(d) {
        return d.text;
      });

  //  *********************** REGARDE!!!!!!*****************************************************************************
  removedSelection = selection
      .exit()
      .attr("class", "oldrow removed")
      .html(function(d) {
        // return d.text;
      });
}

// ----------------------------------------------------------------
function colourBars() {
  // Colour bars according to selected attribute
  d3.selectAll(".bar-group")
      .each(function(d) {
        if (d.city.indexOf("_gap") === -1) {
          const thisCity = d.city;
          let thisColour;
          if (selectedAttribute === "region") {
            const thisRegion = data[selectedAttribute].filter(function(p) {
              return (p.city === thisCity);
            })[0].value;
            thisColour = i18next.t(thisRegion, {ns: "regionColours"});
          } else {
            const val = data[selectedAttribute].filter(function(p) {
              return (p.city === thisCity);
            })[0].value;

            if (val === null) {
              d3.select(this).select("rect").classed("isNan", true);
              thisColour = "none";
            } else {
              thisColour = data[selectedAttribute].mappingFn(val);
            }
          }
          // Apply thisColour to bar
          d3.select(this).select("rect").style("fill", thisColour);
        }
      });
}

// ----------------------------------------------------------------
// Map reset button
d3.select("#mapResetButton")
    .on("click", function() {
      // Reset zoom. NB: must apply reset to svg not g
      // const svg = d3.select("#map").select("svg");
      // zoom.transform(svg, d3.zoomIdentity);

      // Clear previous enlarged text and selected bar
      d3.selectAll(".enlarged").classed("enlarged", false);
      d3.selectAll("rect.active").classed("active", false);
      d3.selectAll(".cityactive").classed("cityactive", false);
    });

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

  path = d3.geoPath()
      .projection(projection)
      .pointRadius([defaultRadius]);

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

      g.attr("class", "mapg")
          .selectAll("path")
          .data(world.features)
          .enter().append("path")
          .attr("d", path)
          .attr("id", function(d) {
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
          .attr("id", function(d) {
            const cityName = i18next.t(d.id, {ns: "reverse"});
            return "city" + i18next.t(cityName, {ns: "cities"});
          })
          .attr("class", function(d) {
            // const cityMatch = d.id;
            const cityMatch = i18next.t(d.id, {ns: "reverse"});
            const r = dataGHG.filter(function(d) {
              return d.city === cityMatch;
            })[0];
            if (r) return `worldcity ${i18next.t(r.region, {ns: "regions"})}`;
            else return "horsService";
          })
          .attr("r", 10)
          .on("mouseover", function(d) {
            console.log(d.id)
            // Clear any previous enlarged text in barChart x axis
            d3.selectAll(".enlarged").classed("enlarged", false);

            // Enlarge barChart x axis text of current city
            // const thisCity = i18next.t(d.id, {ns: "cities"});
            const thisCity = i18next.t(d.id, {ns: "reverse"});
            d3.select(`#text_${i18next.t(thisCity, {ns: "cities"})}`).classed("enlarged", true);

            // highlightElements(d.id);
            highlightElements(i18next.t(thisCity, {ns: "cities"}));
          })
          .on("mouseout", function(d) {
            resetElements();

            const lastCity = d3.select(".enlarged").text();
            d3.select(`.bar-group.${i18next.t(lastCity, {ns: "cities"})}`)
                .select("rect")
                .classed("active", true);
            d3.select(`#city${i18next.t(lastCity, {ns: "cities"})}`).classed("cityactive", true);
          });
    }); // ./inner d3.json
  }); // ./outer d3.json

  // svg.call(zoom);
}

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
    const regionDataPadded = padRegion(regionData, 3);

    // add "Southeast Asia"
    regionData = regionDataPadded.concat(makeRegionObj("Southeast Asia"));
  } else if (region === "Latin America & Caribbean") {
    const region1Padded = padRegion(regionData, 1);
    const region2Padded = padRegion(makeRegionObj("South Asia"), 1);
    const region3Padded = padRegion(makeRegionObj("Africa"), 1);
    const region4Padded = padRegion(makeRegionObj("N Africa & W Asia"), 1);
    const region5Padded = makeRegionObj("Oceania");
    // concat the regions into one row
    regionData = region1Padded.concat(region2Padded).concat(region3Padded).concat(region4Padded).concat(region5Padded);
  }

  barChart(chart, settings, regionData);

  d3.select("#barChart_groupEastAsia").select(".margin-offset").attr("transform", "translate(0, -50)");
  d3.select("#barChart_groupNAmer").select(".margin-offset").attr("transform", "translate(0, -75)");
  d3.select("#barChart_groupRow3").select(".margin-offset").attr("transform", "translate(0, -100)");
  d3.select("#barChart_groupRow4").select(".margin-offset").attr("transform", "translate(0, -125)");

  // Define the div for the barChart rect tooltip
  const div = d3.select("body").append("div")
      .attr("class", "tooltip-bar")
      .style("opacity", 0);

  // hover over xaxis text
  d3.selectAll(".x.axis").selectAll("text")
      .on("touchmove mousemove", function(d, i) {
        // clear previous enlarged text
        d3.selectAll(".enlarged").classed("enlarged", false);

        if (d3.select(this).text().indexOf("_gap") === -1) {
          const cityName = (d3.select(this).text().indexOf(" ") !== -1) ?
            i18next.t(d3.select(this).text(), {ns: "cities"}) : d3.select(this).text();

          d3.select(this).classed("enlarged", true);
          d3.selectAll(`.x.axis g :not(#text_${cityName})`)
              .classed("fadeText", true);

          highlightElements(d3.select(this).text());
        }
      })
      .on("mouseout", function(d) {
        d3.selectAll(".x.axis g text").classed("fadeText", false);

        resetElements();

        const lastCity = d3.select(".enlarged").text();
        d3.select(`.bar-group.${i18next.t(lastCity, {ns: "cities"})}`)
            .select("rect")
            .classed("active", true);
        d3.select(`#city${i18next.t(lastCity, {ns: "cities"})}`).classed("cityactive", true);
      });

  d3.selectAll(".bar-group")
      .on("touchmove mousemove", function(d, i) {
        // Clear previous enlarged text
        d3.selectAll(".enlarged").classed("enlarged", false);

        // Enlarge current text
        const thisCity = i18next.t(d.city, {ns: "cities"});
        d3.select(`#text_${thisCity}`).classed("enlarged", true);

        const count = i + 1;
        highlightElements(d.city);

        // Tooltip
        const displayName = i18next.t(d.city, {ns: "displayName"})
        const thisValue = d.storeOrig ? d.storeOrig : d.value;
        const tipx = 30;
        const tipy = -50;
        div.style("opacity", 1);
        div.html(`#${count}. ${displayName} <br>${globalSettings.formatNum(thisValue)} ${i18next.t("emissions per cap", {ns: "units"})}`)
            .style("left", d3.event.pageX + tipx + "px")
            .style("top", d3.event.pageY + tipy + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
        resetElements();

        const lastCity = d3.select(".enlarged").text();
        d3.select(`.bar-group.${i18next.t(lastCity, {ns: "cities"})}`)
            .select("rect")
            .classed("active", true);
        d3.select(`#city${i18next.t(lastCity, {ns: "cities"})}`).classed("cityactive", true);
      });
}

function drawLegend() {
  console.log("selectedAttribute: ", selectedAttribute)
  const xpos = settingsAttr[selectedAttribute].xpos;
  const rectDim = 15;

  // rect fill fn
  const getFill = function(d, i) {
    return settingsAttr[selectedAttribute].colourRange[i];
  };

  // Fn to display value of each level
  const getText = function(i, j) {
    console.log("getText: ", selectedAttribute)
    if (selectedAttribute === "protocol") {
      return i18next.t(`${selectedAttribute}${j + 1}`, {ns: "legend"});
    } else if (selectedAttribute === "region") {
      return "";
    } else {
      let levelVal;
      if (j === 0) levelVal = data[selectedAttribute].lims[j];
      else levelVal = data[selectedAttribute].levels[j-1];

      levelVal = settingsAttr[selectedAttribute].formatLevel ?
        settingsAttr[selectedAttribute].formatLevel(levelVal) : levelVal;
      return `${levelVal}+`;
    }
  };

  // div for the barChart rect tooltip
  const divLegend = d3.select("body").append("div")
      .attr("class", "tooltip-legend")
      .style("opacity", 0);

  // Create the umbrella group
  const rectGroups = svgCB
      .attr("class", "legendCB")
      .selectAll(".legend")
      .data(settingsAttr[selectedAttribute].colourRange);

  // Append g nodes (to be filled with a rect and a text) to umbrella group
  const newGroup = rectGroups
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("id", function(d, i) {
        return `cb${i}`;
      });

  // add rects
  newGroup
      .append("rect")
      .attr("width", rectDim)
      .attr("height", rectDim)
      .attr("y", 5)
      .attr("x", function(d, i) {
        return 51 + i * 85;
      })
      .attr("fill", getFill);

  // hover
  newGroup
      .selectAll(".legend rect")
      .on("touchmove mousemove", function(d, j) {
        if (selectedAttribute === "protocol") {
          const thisText = i18next.t(`${selectedAttribute}${j + 1}`, {ns: "legend"});
          divLegend.style("opacity", 1);
          divLegend.html(`<b>${thisText}</b>: ${i18next.t(`${thisText}`, {ns: "protocolFullName"})}`)
              .style("left", d3.event.pageX - 100 + "px")
              .style("top", d3.event.pageY - 70 + "px");
        }
      })
      .on("mouseout", function(d) {
        divLegend.style("opacity", 0);
      });

  // add text
  newGroup
      .append("text")
      .attr("class", "legendText")
      .text(getText)
      .attr("y", 18)
      .attr("x", function(d, i) {
        return xpos[i];
      });

  // Update rect fill for any new colour arrays passed in
  rectGroups.select("rect")
      .attr("fill", getFill);

  // Update rect text for different year selections
  rectGroups.select("text")
      .text(getText)
      .attr("x", function(d, i) {
        return xpos[i];
      });

  rectGroups.exit().remove();

  // Unit text
  const unitText = settingsAttr[selectedAttribute].units;
  const unitDisplay = d3.select(".units");
  unitDisplay.text(unitText);
  if (selectedAttribute === "HDD" || selectedAttribute === "HDD"
    || selectedAttribute === "low_bua_pc_2014" || selectedAttribute === "high_bua_pc_2014") {
    d3.select(".units").classed("unitsactive", true);
  } else d3.select(".units").classed("unitsactive", false);

  // hover over units for definition text
  const divUnits = d3.select("body").append("div")
      .attr("class", "tooltip-units")
      .style("opacity", 0);

  unitDisplay
      .on("touchmove mousemove", function() {
        if (settingsAttr[selectedAttribute].unitdef) {
          divUnits.style("opacity", 1);
          divUnits.html(`<b>${i18next.t(selectedAttribute, {ns: "attributes"})}</b>: ${settingsAttr[selectedAttribute].unitdef}`)
              .style("left", d3.event.pageX - 100 + "px")
              .style("top", d3.event.pageY - 70 + "px");
        }
      })
      .on("mouseout", function(d) {
        divUnits.style("opacity", 0);
      });
}

// -----------------------------------------------------------------------------
// Fn to load attribute data
const loadData = function(cb) {
  if (!data[selectedAttribute]) {
    d3.json(`data/cityApp_attributes_consolidated_${selectedAttribute}.json`, function(err, filedata) {
      data[selectedAttribute] = filedata;

      // Find data [min, max] for all attributes except Region and store in "lims"
      if (settingsAttr[selectedAttribute].whichLim) {
        if (settingsAttr[selectedAttribute].whichLim === "d3extent") {
          data[selectedAttribute]["lims"] = d3.extent(data[selectedAttribute], function(d) {
            return d.value;
          });
        } else if (settingsAttr[selectedAttribute].whichLim === "d3mean") {
          const thisMean = d3.mean(data[selectedAttribute], function(d) {
            return d.value;
          });

          data[selectedAttribute]["lims"] = [
            thisMean - stats.getTail(thisMean, twoSigma), thisMean + stats.getTail(thisMean, twoSigma)
          ];
        }
      } // else: region handled separately in colourBars()

      // Floor to nearest modx except for region and protocol
      if (data[selectedAttribute]["lims"]) {
        console.log("raw lims: ", data[selectedAttribute]["lims"])
        if (settingsAttr[selectedAttribute].modx) {
          const modx = settingsAttr[selectedAttribute].modx;
          data[selectedAttribute]["lims"] = data[selectedAttribute]["lims"].map((x) => {
            return Math.floor(x/modx)*modx;
          });
          console.log("floored lims: ", data[selectedAttribute]["lims"])
        }
      }
      cb();
    });
  } else {
    cb();
  }
};

function getMapping() {
  if (data[selectedAttribute].lims) {
    const d0 = data[selectedAttribute].lims[0];
    const d1 = data[selectedAttribute].lims[1];
    console.log(d0, d1)

    const mapping = d3.scaleQuantile()
        .domain([d0, d1])
        .range(settingsAttr[selectedAttribute].colourRange);

    let levels;
    if (!settingsAttr[selectedAttribute].cbValues) {
      levels = mapping.quantiles();
    } else { // protocol
      levels = settingsAttr[selectedAttribute].cbValues;
    }
    console.log("levels: ", levels)

    // store mappings in data object array
    data[selectedAttribute]["mappingFn"] = mapping;
    data[selectedAttribute]["levels"] = levels;
  }
}

// -----------------------------------------------------------------------------
function uiHandler(event) {
  d3.selectAll(".data").selectAll("rect").classed("isNan", false);
  selectedAttribute = event.target.value;

  if (selectedAttribute === "none") {
    d3.selectAll(".bar-group rect").style("fill", noneFill);
    drawLegend(); // clears legend
  } else {
    loadData(() => {
      getMapping(); // defines fns to map attribute value to colour and legend rects for barChart
      colourBars(); // applies colour to each bar in barChart
      drawLegend();
      // city card
      if (newText) {
        if (newText[9]) {
          newText = newText.slice(0, 9); // rm last two elements
          if (selectedAttribute === "protocol" || selectedAttribute === "year") {
            showCityCard(newText);
            return;
          }
        }
        if (selectedAttribute !== "protocol" && selectedAttribute !== "year") {
          const cityName = d3.selectAll(".enlarged").text();
          addNewText(selectedAttribute, cityName);
          showCityCard(newText);
        }
      }
    });
  }
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
        // Note: bars are coloured by css region when page first loads. No colour mapping necessary.
        showBarChart(chartEA, settingsRow1, "East Asia");
        showBarChart(chartNA, settingsRow2, "North America");
        showBarChart(chartEU, settingsRow3, "Europe");
        showBarChart(chartRow4, settingsRow4, "Latin America & Caribbean");       

        d3.selectAll(".data svg").style("overflow", "visible");
        // y-label
        d3.select("#barChart_groupRow3")
            .append("text").attr("text-anchor", "middle")            
            .text(i18next.t("yaxText", {ns: "chartHeadings"}))
            .attr("class", "yaxLabel")
            .attr("transform", function(d) {
              return "translate(" + (-35) + " " + (-135) + ")rotate(-90)";
            });

        appendArrow("East Asia");
        appendArrow("North America");
        appendArrow("Europe");
        appendArrow("Southeast Asia");
        appendArrow("Latin America & Caribbean");
        appendArrow("South Asia");
        appendArrow("N Africa & W Asia");

        plotHeadings("h1");
        plotHeadings("h2");
        plotHeadings("h3");
        plotHeadings("h4");
        plotHeadings("h5");
        plotHeadings("h6");
        plotHeadings("h7");
        plotHeadings("h8");
        plotHeadings("h9");
      });
});

$(document).on("change", uiHandler);

function plotHeadings(h) {
  d3.select(`#${h}`)
      .text(i18next.t(h, {ns: "chartHeadings"}));
}

function highlightElements(cityName) {
  const idName = i18next.t(cityName, {ns: "cities"});

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

  const displayName = i18next.t(cityName, {ns: "displayName"});

  newText = [
    {id: 1, text: `${displayName}, ${thisCountry}`},
    {id: 2, text: i18next.t("scope1Row", {ns: "cityCard"})},
    {id: 3, text: `${thisScope1} ${i18next.t("scope1", {ns: "units"})} ${i18next.t("defn", {ns: "units"})}`},
    {id: 4, text: i18next.t("yearRow", {ns: "cityCard"})},
    {id: 5, text: thisYear},
    {id: 6, text: i18next.t("datasetRow", {ns: "cityCard"})},
    {id: 7, text: i18next.t(thisDataset, {ns: "datasets"})},
    {id: 8, text: i18next.t("protocolRow", {ns: "cityCard"})},
    {id: 9, text: i18next.t(thisProtocol, {ns: "protocol"})}
  ];

  if (data[selectedAttribute]) {
    if (selectedAttribute !== "protocol" & selectedAttribute !== "year") {
      addNewText(selectedAttribute, cityName);
    }
  }
  showCityCard(newText);

  // Highlight current city on map, bars and barChart x-axis
  d3.select(`.bar-group.${idName}`)
      .select("rect")
      .classed("active", true);

  d3.selectAll(`.bar-group:not(.${idName})`)
      .select("rect")
      .classed("fade", true);

  d3.selectAll("#city" + idName)
      .classed("cityactive", true);

  d3.selectAll(".worldcity:not(#city" + idName + ")")
      .classed("cityfade", true);

  d3.selectAll(`.worldcountry:not(#map${i18next.t(thisCountry, {ns: "countries"})})`)
      .classed("countryfade", true);
}

// Adds to newText obj array for city card
function addNewText(attr, cityName) {
  let thisAttr;
  const val = data[attr].filter(function(d) {
    return (d.city === cityName);
  })[0]["value"];

  if (typeof val === "string" || val instanceof String) {
    thisAttr = val; // for region string
  } else {
    thisAttr = val === null ? "N/A" : d3.format(",")(val) ? d3.format(",")(val) : val;
  }

  const thisUnit = thisAttr === "N/A" ? "" : i18next.t(attr, {ns: "units"});

  newText.push(
      {id: 10, text: i18next.t(attr, {ns: "attributes"})},
      {id: 11, text: `${thisAttr} ${thisUnit}`}
  );
}

// Reset elements to original style before selection
function resetElements() {
  // reset bar opacity
  d3.selectAll(".bar-group")
      .selectAll("rect")
      .classed("active", false)
      .classed("fade", false);

  // Clear previous enlarged text
  // d3.selectAll(".enlarged").classed("enlarged", false);

  // reset map highlight classes
  d3.selectAll(".cityactive").classed("cityactive", false);
  d3.selectAll(".cityfade").classed("cityfade", false);
  d3.selectAll(".countryfade").classed("countryfade", false);
}

// function zoomed() {
//   const g = d3.select("#map").select(".mapg");
//   g.style("stroke-width", `${1.5 / d3.event.transform.k}px`);
//   g.attr("transform", d3.event.transform); // updated for d3 v4
// }

// const zoom = d3.zoom()
//     .on("zoom", zoomed);

// function appendArrow(geogroup, data, city) {
function appendArrow(region) {
  const arrowdata = [];
  const chartId = i18next.t(region, {ns: "barchartGroups"});
  let ns;
  if (region === "Europe") ns = `${chartId}_${region}`;
  else if (region === "Southeast Asia") ns = `${chartId}_SEasia`;
  else if (region === "Latin America & Caribbean") ns = `${chartId}_LA`;
  else if (region === "South Asia") ns = `${chartId}_SA`;
  else if (region === "N Africa & W Asia") ns = `${chartId}_NAWA`;
  else ns = chartId;

  const xpos = settingsArr[ns].xpos;
  const ypos = settingsArr[ns].ypos;
  const len = settingsArr[ns].arrowlength;
  const gid = settingsArr[ns].gid;

  const margin = {top: 0, right: 0, bottom: 0, left: 0};
  const width = 200 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const vals = [];
  let count = 0;
  dataGHG.filter(function(d) {
    if (d.region === region) {
      if (d.storeOrig) {
        vals.push(d.storeOrig);
        arrowdata.push({
          id: count, name: "arrow" + count, path: "M 2,2 L2,11 L10,6 L2,2"
        });
        count++;
      }
    }
  });

  for (let idx = 0; idx < vals.length; idx++) {
    const svg = d3.select(`#barChart_${chartId}`)
        .append("g")
        .attr("class", "barMarker")
        .attr("id", `g_${gid}${idx}`)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + xpos[idx] + "," + ypos[idx] + ")") // posn of arrow and text
        .append("svg")
        .attr("width", width + margin.left + margin.right);

    const defs = svg.append("svg:defs");

    const paths = svg.append("svg:g")
        .attr("id", `markers${idx}`);

    defs.selectAll("marker")
        .data(arrowdata)
        .enter()
        .append("svg:marker")
        .attr("id", function(d) {
          return `marker_arrow${idx}`;
        })
        .attr("markerHeight", 13)
        .attr("markerWidth", 13)
        .attr("markerUnits", "strokeWidth")
        .attr("orient", "auto")
        .attr("refX", 9.5)
        .attr("refY", 6)
        .append("svg:path")
        .attr("d", function(d) {
          return d.path;
        });

    paths.selectAll("path")
        .data(arrowdata)
        .enter()
        .append("svg:path")
        .attr("d", function(d, i) {
          return `M 100, 0 V ${len}, 0 `;
        })
        .attr("stroke-width", 1.2)
        .attr("marker-start", function(d) {
          return `url(#marker_stub${idx})`;
        })
        .attr("marker-end", function(d) {
          return `url(#marker_arrow${idx})`;
        })
        .attr("transform", function(d) { // adjusts arrow proportions
          return `scale(${settingsArr[ns].arrowscale[0]} ${settingsArr[ns].arrowscale[1]})`;
        })
        .append("svg:path")
        .attr("d", function(d) {
          return d.path;
        });

    // arrow text
    d3.select(`#g_${gid}${idx}`)
        .append("text")
        .text(vals[idx])
        .attr("transform", function() { // adjust arrow proportions
          return `scale(${settingsArr[ns].textscale[0]} ${settingsArr[ns].textscale[1]})
            translate(${settingsArr[ns].textposx[idx]} ${settingsArr[ns].textposy[idx]})`;
        });
  }
}

