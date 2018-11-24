import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: { datasets: [{ label: "", data: [0, 0] }] }
    };
  }

  componentDidMount() {
    let { dataSet } = this.props;
    if (dataSet !== 0) {
      const timeLabels = dataSet.map(
        res =>
          res._id.day +
          "/" +
          res._id.month +
          " " +
          res._id.hour +
          ":" +
          (res._id.minute < 10 ? "0" + res._id.minute : res._id.minute)
      );
      const data = dataSet.map(res => res.avgValue);
      this.setState({
        chartData: {
          labels: timeLabels,
          datasets: [
            {
              label: "Average sampled",
              data: data
            }
          ]
        }
      });
    }
  }

  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        <Line
          data={this.state.chartData}
          width={100}
          height={80}
          options={
            {
              //maintainAspectRatio: false
            }
          }
        />
      </div>
    );
  }
}
