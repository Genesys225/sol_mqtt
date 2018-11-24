import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export class InputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      errors: null
    };
    this.handleSave = this.handleSave.bind(this);
    this.inPutHandler = this.inputHandler.bind(this);
    this.saveCallback = this.saveCallback.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    handle: PropTypes.string
  };

  saveCallback(result) {
    if (result === "OK")
      document.getElementById("#" + this.state.title).click();
    else
      this.setState({
        errors: result.toString(),
        isValid: false
      });
  }

  handleSave() {
    const { newTitle } = this.state;
    this.props.saveModalDetails(newTitle, this.saveCallback);
  }

  inputHandler(e) {
    this.setState({
      isValid: /^[A-Za-z][A-Za-z0-9-_]*$/.test(e.target.value),
      errors: null,
      newTitle: e.target.value
    });
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      title: nextProps.title
    });
  };

  render() {
    const { title, isValid, errors } = this.state;

    return (
      <div
        className="modal modal-primary fade"
        id={title}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Node: {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Handle:</span>
                </div>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": !isValid
                  })}
                  placeholder={title}
                  aria-label={title}
                  onChange={e => this.inputHandler(e)}
                />

                {!isValid && (
                  <div className="invalid-feedback">
                    {!errors ? "Only letters and/or numbers alowed" : errors}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id={"#" + title}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isValid}
                onClick={() => {
                  this.handleSave();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputModal;
