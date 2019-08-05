export default {
  aspectRatio: 6.8,
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 75
  },
  width: 1200,
  groupPadding: 0.0,
  pOuter: 0.9,
  pInner: 0.15,
  filterData: function(data) {
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
    getId: function(d) {
      return d.city;
    },
    getValue: function(...args) {
      return this.x.getId.apply(this, args);
    },
    getClass: function(...args) {
      return this.x.getId.apply(this, args);
    }
  },

  y: {
    getValue: function(d) {
      return d.value;
    },
    getText: function(d) {
      return d.value;
    },
    getDomain: function(data) {
      return [0, 10];
    },
    ticks: 3,
    tickSizeOuter: 1
  },

  z: {
    getId: function(d) {
      return d.category;
    },
    formatData: function(data) {
      return data[0].values;
    },
    getClass: function(...args) {
      return this.z.getId.apply(this, args);
    },
    getDataPoints: function(d) {
      return d.values;
    }
  },
  _selfFormatter: i18n.getNumberFormatter(0),
  formatNum: function(...args) {
    return this._selfFormatter.format(args);
  }
};
