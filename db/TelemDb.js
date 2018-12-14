const Telemetry = require("../models/Telemetry");

class TelemDb {
  constructor() {}

  createTelemDoc(topic, payload) {
    return new Promise((resolve, reject) => {
      let nameTypeIndex = 0;
      topic.substr(0, 11) === "relayClient" && (nameTypeIndex = 1);
      const newTelemetry = new Telemetry({
        value: payload.toString("utf8").split(" ")[0],
        units: payload.toString("utf8").split(" ")[1],
        name: topic.split("/")[nameTypeIndex],
        type: topic.split("/")[nameTypeIndex + 1]
      });
      if (nameTypeIndex === 0)
        newTelemetry
          .save()
          .then(tel => resolve(tel))
          .catch(err => reject(err));
      else resolve(newTelemetry);
    });
  }
  getBetweenDates(nodeName, sonsorType, from, to) {
    return new Promise((resolve, reject) => {
      const range = to - from;
      const day = 1000 * 60 * 60 * 24;
      let gt12AggregationStage = [];
      let interval = 1;
      if (range > day / 2 && range <= day) interval = 5;
      else if (range > day && range <= day * 7) interval = 10;
      else if (range > day * 7 && range <= day * 14) interval = 15;
      else if (range > day * 14 && range <= day * 30) interval = 20;
      else if (range > day * 30 && range <= day * 60) interval = 30;
      else if (range > day * 60) interval = 60;
      else
        gt12AggregationStage = [
          {
            $project: {
              value: 1,
              _id: {
                hour: { $hour: "$date" },
                minute: { $minute: "$date" },
                second: { $second: "$date" }
              }
            }
          },
          {
            $sort: { _id: 1 }
          }
        ];

      gt12AggregationStage = [
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              day: { $dayOfMonth: "$date" },
              hour: { $hour: "$date" },
              minute: {
                $subtract: [
                  { $minute: "$date" },
                  { $mod: [{ $minute: "$date" }, interval] }
                ]
              }
            },
            avgValue: { $avg: "$value" }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ];
      Telemetry.aggregate([
        { $project: { _id: 0, value: 1, date: 1, name: 1, type: 1 } },
        {
          $match: {
            name: nodeName,
            type: sonsorType
          }
        },
        { $project: { value: 1, date: 1 } },
        {
          $match: {
            date: {
              $gte: new Date(parseInt(from)),
              $lt: new Date(parseInt(to))
            }
          }
        },
        ...gt12AggregationStage
      ])
        //.explain("executionStats")
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}

module.exports = TelemDb;
