const express = require("express");
const telemetryActions = require("../../sensor_nodes/telemetryActions");

const passport = require("passport");

const router = express.Router();

/*
 * @route   Get api/telemetry/get-between/:nodeName/:sonsorType/:from/:to
 * @desc    Returns array of objects including "day of month", "hour", "minute"
 *          (logged at) and everage value (sample size dependent on range)
 * @access  Privet
 */
router.get("/get-between/:nodeName/:sonsorType/:from/:to", (req, res) => {
  const { nodeName, sonsorType, from, to } = req.params;
  telemetryActions
    .getTelemetryBetweenDates(nodeName, sonsorType, from, to)
    .then(telemetry => {
      res.json(telemetry);
    })
    .catch(err => res.json(err));
});

module.exports = router;
