export default {
  none: {
    colourRange: []
  },
  region: {
    colourRange: [],
    units: []
  },
  protocol: {
    whichLim: "d3extent",
    colourRange: ["#9DD3DF", "#8856a7", "#E35B5D", "#EB9F9F", "#F18052", "#F4DD51"],
    cbValues: [1, 2, 3, 4, 5, 6],
    xpos: [22, 86, 190, 273, 355, 417],
    units: []
  },
  year: {
    whichLim: "d3extent",
    modx: 5,
    colourRange: ["#a63603", "#e6550d", "#997E68", "#fd8d3c", "#fecc5c"],
    // colourRange: ["#fecc5c", "#fd8d3c", "#997E68", "#e6550d", "#a63603"],
    xpos: [13, 98, 182, 267, 353],
    units: []
  },
  population: {
    whichLim: "d3extent",
    // modx: 100000,
    colourRange: ["#DED8B6", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
    // colourRange: ["#7a0177", "#c51b8a", "#f768a1", "#fbb4b9", "#DED8B6"],
    xpos: [18, 97, 182, 271, 356],
    units: [],
    formatLevel: function(...args) {
      return d3.format(".2s")(args);
    }
  },
  GDP_PPP_percap: {
    whichLim: "d3mean",
    modx: 1000,
    colourRange: ["#b8aca2", "#E394A7", "#9e9ac8", "#756bb1", "#54278f"],
    xpos: [17, 105, 190, 275, 360],
    units: ["[$BN/capita]"],
    formatLevel: function(...args) {
      return d3.format(".2s")(args);
    }
  },
  area: {
    whichLim: "d3mean",
    modx: 100,
    colourRange: ["#ffffcc", "#c7e9b4", "#41b6c4", "#2c7fb8", "#253494"],
    xpos: [32, 104, 189, 275, 361],
    units: ["[km2]"]
  },
  pop_density: {
    whichLim: "d3mean",
    modx: 100,
    colourRange: ["#ffffcc", "#F9C869", "#E1F5C4", "#ADD6BC", "#486d6c"],
    xpos: [20, 100, 183, 268, 346],
    units: ["[per km2]"]
  },
  diesel: {
    whichLim: "d3extent",
    colourRange: ["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"],
    xpos: [17, 101, 187, 271, 356],
    units: ["[USD/litre]"],
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  gas: {
    whichLim: "d3extent",
    colourRange: ["#F1F2C4", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"],
    xpos: [16, 102, 185, 271, 357],
    units: ["[USD/litre]"],
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  HDD: {
    whichLim: "d3extent",
    modx: 1000,
    colourRange: ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
    xpos: [32, 97, 182, 268, 352],
    units: ["[deg C x days]"],
    unitdef: "Heating degree days, used to estimate the energy needed to heat a building above the base temperature (15.5C here)."
  },
  CDD: {
    whichLim: "d3extent",
    modx: 1000,
    colourRange: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
    xpos: [32, 104, 189, 268, 352],
    units: ["[deg C x days]"],
    unitdef: "Cooling degree days, used to estimate the energy needed to cool a building below the base temperature (23C here)."
  },
  low_bua_pc_2014: {
    whichLim: "d3extent",
    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
    xpos: [16, 101, 185, 270, 355],
    units: ["[% of tot BUA]"],
    unitdef: "An urbran expansion attribute that quantifies the fraction of low built-up area (BUA) out of the total city area in 2014.",
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  high_bua_pc_2014: {
    whichLim: "d3extent",
    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
    xpos: [16, 101, 185, 270, 355],
    units: ["[% of tot BUA]"],
    unitdef: "An urbran expansion attribute that quantifies the fraction of high built-up area (BUA) out of the total city area in 2014.",
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  _selfFormatter: i18n.getNumberFormatter(0),
  formatNum: function(...args) {
    return this._selfFormatter.format(args);
  }
  // mytest: function(...args) {
  //   console.log("args: ", args)
  //   console.log("this: ", this)
  // }
};
