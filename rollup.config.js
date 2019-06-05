import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

const plugins = [
  resolve(),
  commonjs(),
  babel()
];
const entrypoints = [];

entrypoints.push({
  input: "src/index.js",
  output: {
    file: "dist/src/index.js",
    format: "iife"
  },
  plugins
});

export default entrypoints;
