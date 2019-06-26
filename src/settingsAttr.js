export default {
  region: {
    colourRange: []
  },
  protocol: {
    whichLim: "d3extent",
    colourRange: ["#9DD3DF", "#C3BBE2", "#E35B5D", "#EB9F9F", "#F18052", "#F4DD51"],
    xpos: [4, 68, 168, 247, 324, 387]
  },
  year: {
    whichLim: "d3extent",
    modx: 5,
    colourRange: ["#D8E6DB", "#DBC28F", "#CCA26A", "#997E68", "#6B5344"],
    xpos: [0, 80, 160, 240, 320, 280+120]
  },
  population: {
    whichLim: "d3mean",
    modx: 100000,
    colourRange: ["#DED8B6", "#F9C869", "#5D5061", "#875979", "red"],
    xpos: [2, 81, 161, 241, 321, 402]
  },
  GDP_PPP_percap: {
    whichLim: "d3mean",
    modx: 1000,
    colourRange: ["#b8aca2", "#E394A7", "#9e9ac8", "#756bb1", "#54278f"],
    xpos: [7, 77, 146, 216, 281, 333]
  },
  area: {
    whichLim: "d3mean",
    modx: 10,
    colourRange: ["#EDDAD0", "#D5DED9", "#99B2B7", "#5b6a6d", "#948C75"],
    xpos: [3, 82, 162, 241, 321, 403]
  },
  pop_density: {
    whichLim: "d3mean",
    modx: 100,
    colourRange: ["#DED8B6", "#F9C869", "#E1F5C4", "#ADD6BC", "#486d6c"],
    xpos: [4, 75, 147, 217, 288, 333]
  },
  diesel: {
    whichLim: "d3extent",
    modx: 1,
    colourRange: ["#F1F2C4", "#F2EA72", "#fec44f", "#c2cd7b", "#bf6456"],
    xpos: [4, 83, 163, 244, 323, 405, 481]
  },
  gas: {
    whichLim: "d3extent",
    modx: 1,
    colourRange: ["#F1F2C4", "#F2EA72", "#fec44f", "#c2cd7b", "#bf6456"],
    xpos: [4, 83, 163, 244, 323, 405, 481]
  },
  HDD: {
    whichLim: "d3extent",
    modx: 1000,
    colourRange: ["#F5F5C6", "#F5DDB5", "#d6c2d0", "#a27696", "#b8d7ff"],
    xpos: [3, 82, 162, 241, 321, 403]
  },
  CDD: {
    whichLim: "d3extent",
    modx: 1000,
    colourRange: ["#E1F5C4", "#ffeda0", "#F9D423", "#FC913A", "#FF4E50"],
    xpos: [3, 82, 162, 241, 321, 403]
  },
  low_bua_pc_2014: {
    whichLim: "d3extent",
    modx: 1,
    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
    xpos: [13, 94, 173, 254, 333, 407]
  },
  high_bua_pc_2014: {
    whichLim: "d3extent",
    modx: 1,
    colourRange: ["#ECDAA8", "#B6AC7B", "#8C9C82", "#9AA0AC", "#70725A"],
    xpos: [13, 94, 173, 254, 333, 407]
  },
  _selfFormatter: i18n.getNumberFormatter(0),
  formatNum: function(...args) {
    return this._selfFormatter.format(args);
  }
};


// if ((selectedAttribute === "protocol") | (selectedAttribute === "year") |
//     (selectedAttribute === "diesel") | (selectedAttribute === "gas") |
//     (selectedAttribute === "CDD") | (selectedAttribute === "low_bua_pc_2014") |
//     (selectedAttribute === "high_bua_pc_2014")) {
//     data[selectedAttribute]["lims"] = d3.extent(data[selectedAttribute], function(d) {
//       if (d.value > dummyNum) return d.value;
//     });
//}