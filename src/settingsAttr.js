export default {
  region: {
    colourRange: []
  },
  protocol: {
    whichLim: "d3extent",
    colourRange: ["#9DD3DF", "#C3BBE2", "#E35B5D", "#EB9F9F", "#F18052", "#F4DD51"],
    cbValues: [1, 2, 3, 4, 5, 6],
    xpos: [51, 108, 208, 285, 362, 423]
  },
  year: {
    whichLim: "d3extent",
    modx: 5,
    colourRange: ["#D8E6DB", "#DBC28F", "red", "#997E68", "#6B5344"],
    xpos: [42, 121, 201, 284, 362]
  },
  population: {
    whichLim: "d3extent",
    // modx: 100000,
    colourRange: ["#DED8B6", "#F9C869", "#5D5061", "#875979", "red"],
    xpos: [49, 122, 203, 286, 365],
    formatLevel: function(...args) {
      return d3.format(".2s")(args);
    }
  },
  GDP_PPP_percap: {
    whichLim: "d3mean",
    modx: 1000,
    colourRange: ["#b8aca2", "#E394A7", "#9e9ac8", "#756bb1", "#54278f"],
    xpos: [46, 127, 208, 288, 368],
    formatLevel: function(...args) {
      return d3.format(".2s")(args);
    }
  },
  area: {
    whichLim: "d3mean",
    modx: 100,
    colourRange: ["#EDDAD0", "#D5DED9", "#99B2B7", "#5b6a6d", "#948C75"],
    xpos: [61, 127, 208, 288, 368]
  },
  pop_density: {
    whichLim: "d3mean",
    modx: 100,
    colourRange: ["#DED8B6", "#F9C869", "#E1F5C4", "#ADD6BC", "#486d6c"],
    xpos: [48, 122, 202, 282, 355]
  },
  diesel: {
    whichLim: "d3extent",
    colourRange: ["#F1F2C4", "#F2EA72", "#fec44f", "#c2cd7b", "#bf6456"],
    xpos: [45, 125, 205, 285, 364],
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  gas: {
    whichLim: "d3extent",
    colourRange: ["#F1F2C4", "#F2EA72", "#fec44f", "#c2cd7b", "#bf6456"],
    xpos: [45, 125, 205, 285, 364],
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  HDD: {
    whichLim: "d3extent",
    modx: 1000,
    colourRange: ["#F5F5C6", "#F5DDB5", "#d6c2d0", "#a27696", "#b8d7ff"],
    xpos: [61, 122, 201, 282, 362]
  },
  CDD: {
    whichLim: "d3extent",
    modx: 1000,
    colourRange: ["#E1F5C4", "#ffeda0", "#F9D423", "#FC913A", "#FF4E50"],
    xpos: [61, 122, 201, 282, 362]
  },
  low_bua_pc_2014: {
    whichLim: "d3extent",
    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
    xpos: [46, 124, 205, 285, 366],
    formatLevel: function(...args) {
      return d3.format(".2f")(args);
    }
  },
  high_bua_pc_2014: {
    whichLim: "d3extent",
    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
    xpos: [46, 124, 205, 285, 366],
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
