import React, { Component } from "react";
import PropTypes from "prop-types";
import LineChart from "./LineChart";
import Spinner from "../common/spinner";

export class ChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      errors: null
    };
    this.toHandler = this.toHandler.bind(this);
    this.fromHandler = this.fromHandler.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    sensor: PropTypes.string
  };

  fromHandler(e) {
    this.setState({
      isValid: /^[A-Za-z][A-Za-z0-9-_]*$/.test(e.target.value),
      errors: null,
      newTitle: e.target.value
    });
  }

  toHandler(e) {
    this.setState({
      isValid: /^[A-Za-z][A-Za-z0-9-_]*$/.test(e.target.value),
      errors: null,
      newTitle: e.target.value
    });
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      title: nextProps.title,
      sensor: nextProps.sensor,
      dataSet: nextProps.dataSet,
      cacheInProgress: nextProps.cacheInProgress
    });
  };

  render() {
    const { title, sensor, errors, dataSet, cacheInProgress } = this.state;
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id={title + "_" + sensor}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Node: {title}
              </h5>
            </div>
            <div className="modal-body" />
            {cacheInProgress || !dataSet ? (
              <Spinner />
            ) : (
              <LineChart dataSet={dataSet} />
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id={"#" + title + sensor}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartModal;
