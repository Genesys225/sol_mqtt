import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { GoGraph } from "react-icons/go";
import ChartModal from "../charts/ChartModal";
import { fetchGraphData } from "../../actions/telemetryActions";

const SensorItemHOC = WrappedComponent => {
  return class SensorItemHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        sampleData: 0,
        badgeClassname: ""
      };
      this.handlGraphClick = this.handlGraphClick.bind(this);
    }

    handlGraphClick(title, sensor) {
      const { nodes } = this.props.user.preferences;
      if (nodes.length > 0)
        title = nodes.find(node => node.handle === title).node.name;
      let from = 1542465373000 - 91000000;
      let to = 1542465373000;
      let sonsorCreds = {
        nodeName: title,
        sensorType: sensor,
        from,
        to
      };

      this.props.fetchGraphData(sonsorCreds, this.cachingProgress);
    }

    cachingProgress = (title, sensor) => {
      let { sampleData } = this.props.sensors[title][sensor];
      this.setState({ sampleData });
    };

    componentWillReceiveProps = nextProps => {
      let { sensor, value } = nextProps;
      switch (sensor) {
        case "temperture":
          if (parseFloat(value.split("(")[0]) > 28)
            this.setState({ badgeClassname: "badge-danger" });
          else if (parseFloat(value.split("(")[0]) > 26)
            this.setState({ badgeClassname: "badge-warning" });
          else if (parseFloat(value.split("(")[0]) < 22)
            this.setState({ badgeClassname: "badge-primary" });
          else this.setState({ badgeClassname: "badge-success" });
          break;

        case "humidity":
          if (parseFloat(value.split("(")[0]) > 55)
            this.setState({ badgeClassname: "badge-danger" });
          else if (parseFloat(value.split("(")[0]) > 45)
            this.setState({ badgeClassname: "badge-warning" });
          else if (parseFloat(value.split("(")[0]) < 20)
            this.setState({ badgeClassname: "badge-secondary" });
          else this.setState({ badgeClassname: "badge-success" });
          break;

        case "co2":
          if (parseFloat(value.split("(")[0]) > 1600)
            this.setState({ badgeClassname: "badge-danger" });
          else if (parseFloat(value.split("(")[0]) > 1300)
            this.setState({ badgeClassname: "badge-warning" });
          else if (parseFloat(value.split("(")[0]) < 800)
            this.setState({ badgeClassname: "badge-secondary" });
          else this.setState({ badgeClassname: "badge-success" });
          break;

        case "light":
          if (parseFloat(value.split("(")[0]) < 10)
            this.setState({ badgeClassname: "badge-dark" });
          else if (parseFloat(value.split("(")[0]) < 40)
            this.setState({ badgeClassname: "badge-secondary" });
          else if (parseFloat(value.split("(")[0]) < 80)
            this.setState({ badgeClassname: "badge-danger" });
          else if (parseFloat(value.split("(")[0]) < 150)
            this.setState({ badgeClassname: "badge-warning" });
          else this.setState({ badgeClassname: "badge-success" });
          break;

        default:
          break;
      }
    };
    render() {
      const { isAuthenticated } = this.props.auth;
      let { title, sensor } = this.props;

      let { sampleData, cacheInProgress } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          badgeClassname={this.state.badgeClassname}
          displayGraphButton={
            isAuthenticated ? (
              <React.Fragment>
                <ChartModal
                  title={title}
                  sensor={sensor}
                  dataSet={sampleData}
                  cacheInProgress={cacheInProgress}
                />
                <button
                  className="btn btn-outline-secondary col-md-2"
                  type="button"
                  data-toggle="modal"
                  data-target={"#" + title + "_" + sensor}
                  onClick={() => this.handlGraphClick(title, sensor)}
                >
                  <GoGraph />
                </button>{" "}
              </React.Fragment>
            ) : (
              false
            )
          }
        />
      );
    }
  };
};

const mapStateToProps = state => ({
  sensors: state.sensors,
  user: state.user,
  auth: state.auth
});

const composedHoc = compose(
  connect(
    mapStateToProps,
    { fetchGraphData }
  ),
  SensorItemHOC
);

export default composedHoc;
