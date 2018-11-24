import { createSelector } from "reselect";
// Select function to collect state parts
const changeDetectorSelector = state => state.telemetry;

const getTypes = nodes => {
  return nodes.nodes;
};

export default createSelector(changeDetectorSelector, getTypes);
