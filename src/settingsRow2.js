export default {
  aspectRatio: 8.2,
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 30
  },
  width: 1200,
  groupPadding: 0.0,
  pOuter: 0.9,
  pInner: 0.15,
  filterData: function(data) {
    // data.sort(function(a, b) {
    //   return d3.descending(a["s1PerCap"], b["s1PerCap"]);
    // });

    const thisRegion = i18next.t(data[0].region, {ns: "regions"});

    return [{
      category: thisRegion,
      values: data.map((p, i) => {
        return {
          city: p.city,
          value: p.s1PerCap,
          storeOrig: p.storeOrig,
          idx: i
        };
      })
    }];
  },
  x: {
    // label: i18next.t("x_label", {ns: "railBar"}),
    getId: function(d) {
      return d.city;
    },
    getValue: function(...args) {
      return this.x.getId.apply(this, args);
    },
    getClass: function(...args) {
      return this.x.getId.apply(this, args);
    },
    getTickText: function(val) {
      return i18next.t(val, {ns: "railBar"});
    }
  },

  y: {
    label: i18next.t("y_label", {ns: "railBar"}),
    getValue: function(d) {
      return d.value;
    },
    getText: function(d) {
      return d.value;
    },
    getDomain: function(data) {
      return [0, 10];
    },
    ticks: 5,
    tickSizeOuter: 0
  },

  z: {
    label: i18next.t("z_label", {ns: "railTable"}),
    getId: function(d) {
      return d.category;
    },
    getKeys: function(object) {
      const keys = Object.keys(object[0]);
      console.log(keys)
      keys.splice(keys.indexOf("category"), 1);
      return keys;
    },
    formatData: function(data) {
      return data[0].values;
    },
    getClass: function(...args) {
      return this.z.getId.apply(this, args);
    },
    getDataPoints: function(d) {
      return d.values;
    },
    getText: function(d) {
      return i18next.t(d.key, {ns: "rail"});
    }
  },
  _selfFormatter: i18n.getNumberFormatter(0),
  formatNum: function(...args) {
    return this._selfFormatter.format(args);
  }
};
