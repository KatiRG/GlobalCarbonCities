export default {
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  projOptions: {
    options: [
      {name: "Natural Earth", projection: d3.geoNaturalEarth()}
    ],
    transScale: [1.655, 1.67],
    rotateOrig: [0, 0],
    centreOrig: [40, 0]
  },
  defaultRadius: 3,
  scaleFactor: 135,
  delta: [-11, 0],
  width: 750,
  height: 290
};
