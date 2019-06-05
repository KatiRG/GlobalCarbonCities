(function () {
  'use strict';

  // settings for Sankey

  var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0); // SVGs
  // ----------------------------------------------------
  // d3js World Map

  var mapMargin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  var mapHeight = 290 - mapMargin.top - mapMargin.bottom; // barChart legend

  var margin = {
    top: 7,
    right: 0,
    bottom: 0,
    left: 20
  };
  var svg_width = 480 - margin.left - margin.right;
  var svg_height = 35 - margin.top - margin.bottom;
  var svgCB = d3.select("#barChartLegend").select("svg").attr("width", svg_width).attr("height", svg_height).style("vertical-align", "middle"); // city card
  // ---------

  var svgCityCard = d3.select("#mycityCardDiv").append("svg").attr("width", 273).attr("height", mapHeight);
  svgCityCard = d3.select("#mycityCardDiv").select("svg").append("g").attr("id", "cityCardg");
  svgCityCard.append("rect").attr("width", 200).attr("height", 300).attr("x", 5).attr("y", -20).attr("fill", "#4c87b5").attr("stroke", "none");
  // FNS
  // page texts

  function pageText() {
    d3.select("#titletag").html(i18next.t("titletag", {
      ns: "pageText"
    }));
    d3.select("#pageTitle").html(i18next.t("title", {
      ns: "pageText"
    }));
  } // -----------------------------------------------------------------------------
  // Initial page load


  i18n.load(["src/i18n"], function () {
    // settingsStackedSA.x.label = i18next.t("x_label", {ns: "roadArea"}),
    d3.queue().defer(d3.json, "data/cityApp_attributes_consolidated_pruned.tsv")["await"](function (error, datafile) {
      data = datafile1; // Page text

      pageText(); // Draw graphs
      // showStackedBar(chartSA, settingsSA, stackedSA);
    });
  });

}());
