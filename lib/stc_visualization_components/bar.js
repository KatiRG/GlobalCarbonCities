(function(extend) {
var defaults = {
  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 0
  },
  x: {
    getDomain: function(data) {
      var sett = this,
        keys = [],
        i, d, x;

      for (i = 0; i < data.length; i++) {
        d = data[i];
        x = sett.x.getValue.call(sett, d);

        if (keys.indexOf(x) === -1) {
          keys.push(x);
        }
      }

      return keys;
    }
  },
  y: {
    getDomain: function(data) {
      var min = d3.min(data, this.y.getValue.bind(this)),
        max = d3.max(data, this.y.getValue.bind(this));

      if (min > 0) min = 0;
      if (max < 0) max = 0;

      if (this.showValues) {
        if (min < 0 ) min -= (max - min) * .09;
        if (max > 0 ) max += (max - min) * .06;
      }

      return [
        min,
        max
      ];
    }
  },
  z: {
    getDomain: function(data) {
      var sett = this,
        keys = [],
        i, d, x;

      for (i = 0; i < data.length; i++) {
        d = data[i];
        x = sett.z.getId.call(sett, d);

        if (keys.indexOf(x) === -1) {
          keys.push(x);
        }
      }

      return keys;
    }
  },
  groupPadding: 0.2,
  barPadding: 0.1,
  aspectRatio: 16 / 9,
  width: 600,
  barTableID: "barTable"
};

this.barChart = function(svg, settings, data) {
  var mergedSettings = extend(true, {}, defaults, settings),
    outerWidth = mergedSettings.width,
    outerHeight = Math.ceil(outerWidth / mergedSettings.aspectRatio),
    innerHeight = mergedSettings.innerHeight = outerHeight - mergedSettings.margin.top - mergedSettings.margin.bottom,
    innerWidth = mergedSettings.innerWidth = outerWidth - mergedSettings.margin.left - mergedSettings.margin.right,
    chartInner = svg.select("g.margin-offset"),
    dataLayer = chartInner.select(".data"),
    transition = d3.transition()
      .duration(1000),
    draw = function() {
      var sett = this.settings,
        filteredData = (sett.filterData && typeof sett.filterData === "function") ?
          sett.filterData.call(sett, data) : data,
        flatData = [].concat.apply([], filteredData.map(function(d) {
          return sett.z.getDataPoints.call(sett, d);
        })),
        xAxisObj = chartInner.select(".x.axis"),
        yAxisObj = chartInner.select(".y.axis"),
        showValue = sett.showValues,
        valuesX = function() {
          return xFn.apply(this, arguments) + x1.bandwidth() / 2;
        },
        grpClassFn = function(d,i){
          var cl = "bar-group bar-group" + (i + 1);

          const thisClass = (sett.x.getClass.call(sett, d).indexOf(" ") !== -1) ? 
            i18next.t(sett.x.getClass.call(sett, d), {ns: "cities"}) : sett.x.getClass.call(sett, d);

          if (sett.x && sett.x.getClass && typeof sett.x.getClass === "function") {
            cl += " " + thisClass;
          }

          // For the concatenated rows
          if (sett.x && sett.x.getRegion && typeof sett.x.getRegion === "function") {
            cl += " HERE" + (thisClass.indexOf(" ") !== -1) ? i18next.t(thisClass, {ns: "cities"}) : thisClass;
          }
          
          return cl;
        },
        grpTransform = function() {
          return "translate(" + x0(sett.x.getValue.apply(sett, arguments)) + ",0)";
        },
        barClassFn = function(d, i){
          var cl = "bar bar" + (i + 1);

          if (sett.x && sett.z.getClass && typeof sett.z.getClass === "function") {
            cl += " " + sett.z.getClass.call(sett, d);
          }

          return cl;
        },
        barsFn = function() {
          var group = d3.select(this),
            xVal = sett.x.getValue.call(sett, group.data()[0]),
            getDatum = function(d) {
              return sett.z.getDataPoints.call(sett, d)
                  .filter(function(d) {
                    return sett.x.getValue.call(sett, d) === xVal;
                  })[0];
            },
            labelsOffset = function(d) {
              var datum = getDatum.call(sett, d),
                val = sett.y.getValue.call(sett, datum);
              switch(Math.sign(val)) {
              case 1:
                return "-0.5em";
              case -1:
                return "-1.5em";
              }
            },
            bars = group.selectAll(".bar")
              .data(filteredData, sett.z.getId.bind(sett)),
            values = group.selectAll(".value")
              .data(function() {
                if (typeof showValue === "function") {
                  return filteredData.filter(function(d) {
                    return showValue.call(sett, getDatum(d));
                  });
                } else if (showValue !== true) {
                  return[];
                }
                return filteredData;
              }, sett.z.getId.bind(sett));

          bars
            .enter()
            .append("rect")
              .attr("x", xFn)
              .attr("width", x.bandwidth())
              .attr("y", y(0))
              .attr("height", 0)
              .attr("class", barClassFn.bind(sett))
              .attr("class", function(d) {
                const parentClass = d3.select(d3.select(this).node().parentNode).attr("class").split("HERE").slice(1)[0];
                return parentClass ? parentClass: d.category;
              })
              .each(function(d) {
                var idName = (xIdFn(getDatum.call(sett, d)).indexOf(" ") !== -1) ?
                  i18next.t(xIdFn(getDatum.call(sett, d)), {ns: "cities"}) : xIdFn(getDatum.call(sett, d));
                var datum = getDatum.call(sett, d),
                  // id = zIdFn(d) + "_" + xIdFn(datum),
                  id = zIdFn(d) + "_" + idName,
                  yVal = yFn(datum),
                  hVal = heightFn(datum),
                  y0 = y(0);

                d3.select(this)
                  .attr("id", id)
                  .transition(transition)
                  .attr("y", yVal < y0 ? yVal: y0)
                  .attr("height", hVal);
              });


          bars
            .attr("x", xFn)
            .attr("width", x1.bandwidth())
            .attr("class", barClassFn.bind(sett))
            .each(function(d) {
              var datum = getDatum.call(sett, d),
                id = zIdFn(d) + "_" + xIdFn(datum),
                yVal = yFn(datum),
                hVal = heightFn(datum),
                y0 = y(0);

              d3.select(this)
                .attr("id", id)
                .transition(transition)
                .attr("y", yVal < y0 ? yVal: y0)
                .attr("height", hVal);
            });

          bars
            .exit()
              .remove();
        },
        xFn = function() {
          return x1(sett.z.getId.apply(sett, arguments));
        },
        yFn = function(d) {
          return y(sett.y.getValue.call(sett, d));
        },
        xIdFn = sett.x.getId.bind(sett),
        zIdFn = sett.z.getId.bind(sett),
        heightFn = function() {
          var yVal = yFn.apply(this, arguments);

          if (yVal < y(0))
            return y(0) - yVal;
          return yVal - y(0);
        },
        xDomain = sett.x.getDomain.call(sett, flatData),
        barGroups;

      x = rtnObj.x = d3.scaleBand()
        .rangeRound([0, innerWidth], .1)
        .paddingOuter(sett.pOuter)
        .paddingInner(sett.pInner);

      x0 = rtnObj.x0 = d3.scaleBand()
        .paddingInner(sett.groupPadding);

      x1 = rtnObj.x1 = d3.scaleBand()
        .padding(sett.barPadding);

      y = rtnObj.y = d3.scaleLinear()
        .rangeRound([innerHeight, 0]);

  
      x0.domain(xDomain).rangeRound([0, innerWidth]);
      x1.domain(sett.z.getDomain.call(sett, filteredData)).rangeRound([0, x0.bandwidth()]);
      y.domain(sett.y.getDomain.call(sett, flatData));

      x.domain(data.map((k) => k.city));

      if (dataLayer.empty()) {
        dataLayer = chartInner.append("g")
          .attr("class", "data");
      }

      barGroups = dataLayer.selectAll(".bar-group")
        .data(xDomain.map(function(x) {

          for(var i = 0; i < flatData.length; i++) {
            if (sett.x.getValue.call(sett, flatData[i]) === x)
              return flatData[i];
          }
        }).filter(function(d) {
          return d !== undefined;
        }), sett.x.getId.bind(sett));

      barGroups
        .enter()
        .append("g")
          .attr("class", grpClassFn)
          .attr("transform", grpTransform)
          .each(barsFn);

      barGroups
        .attr("class", grpClassFn)
        .transition(transition)
        .attr("transform", grpTransform)
        .each(barsFn);

      barGroups
        .exit()
          .remove();

      if (xAxisObj.empty()) {
        const transX = 0;
        xAxisObj = chartInner.append("g")
        .attr("class", "x axis")
        .attr("aria-hidden", "true")
        .attr("transform", "translate(" + transX + "," + innerHeight + ")");
      } else {
        xAxisObj.select("text").text(settings.x.label);
      }
      xAxisObj.call(
        d3.axisBottom(x0)
          .ticks(sett.x.ticks)
          .tickSizeOuter(sett.x.tickSizeOuter ? sett.x.tickSizeOuter : null)
          .tickFormat(sett.x.getTickText ? sett.x.getTickText.bind(sett) : null)
      );
      // hide ticks and tick text for "gap" bars
      xAxisObj
        .selectAll(".tick")
        .attr("class", function(d, i) {
          return d.indexOf("_gap") !== -1 ? "hideTick" : null;
        })
        .selectAll("text")
        .attr("id", function(d) {
          return d.indexOf(" ") !== -1 ?
              "text_" + i18next.t(d, {ns: "cities"}) : "text_" + d;
        })
        .attr("transform", "translate(0, -5) rotate(40)" )
        .attr("text-anchor", "start");

      if (yAxisObj.empty()) {
        yAxisObj = chartInner.append("g")
          .attr("class", "y axis")
          .attr("aria-hidden", "true");

        yAxisObj
          .append("text")
            .attr("class", "chart-label")
            .attr("fill", "#000")
            .attr("y", "0")
            .attr("dy", "-0.5em")
            .attr("text-anchor", "end")
            .text(sett.y.label);
      } else {
        yAxisObj.select("text").text(settings.y.label);
      }
      yAxisObj.call(
        d3.axisLeft(y)
          .ticks(sett.y.ticks)
          .tickSizeOuter(sett.y.tickSizeOuter ? sett.y.tickSizeOuter : null)
          .tickFormat(sett.y.getTickText ? sett.y.getTickText.bind(sett) : null)
      );
    },
    clear = function() {
      dataLayer.remove();
    },
    x, x0, x1, y, rtnObj, process;

  rtnObj = {
    settings: mergedSettings,
    clear: clear,
    svg: svg
  };

  svg
    .attr("viewBox", "-50 0 " + (outerWidth+50) + " " + (outerHeight+10))
    // .attr("viewBox", "-50 0 " + outerWidth + " " + outerHeight)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("role", "img")
    .attr("aria-label", mergedSettings.altText);

  if (chartInner.empty()) {
    chartInner = svg.append("g")
      .attr("class", "margin-offset")
      .attr("transform", "translate(" + mergedSettings.margin.left + "," + mergedSettings.margin.top + ")");
  }

  process = function() {
    draw.apply(rtnObj);
    d3.stcExt.addIEShim(svg, outerHeight, outerWidth);
  };
  if (data === undefined) {
    d3.json(mergedSettings.url, function(error, xhr) {
      data = xhr;
      process();
    });
  } else {
    process();
  }

  return rtnObj;
};

function filterYear(key) {
  if (key !== "Year") {
    return key;
  } else {
    return "";
  }
};
// TODO: Remove when switched to ES6
if (!Math.sign) {
  Math.sign = function(x) {
    return ((x > 0) - (x < 0)) || +x;
  };
}

})(jQuery.extend, jQuery);
