import { createSelector } from "reselect";
// Select function to collect state parts
const telemetrySelector = state => state.telemetry;

const getNames = nodes => {
  let names = Object.getOwnPropertyNames(nodes.nodes);
  names = names.sort().filter(name => name !== "undefined");
  return names;
};

export default createSelector(telemetrySelector, getNames);
