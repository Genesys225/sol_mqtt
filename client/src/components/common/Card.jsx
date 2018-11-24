import React, { Component } from "react";
// import classnames from "classnames";
import PropTypes from "prop-types";
import ItemList from "../common/ItemList";
import UserPrefercesHOC from "../HOC/UserPrefercesHOC";
import InputModal from "./InputModal";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { items } = this.props;
    const { saveModalDetails, values, title } = this.props;
    items = items.filter(item => item !== "undefined");
    const button = saveModalDetails ? (
      <button
        className="btn btn-sm btn-outline-secondary float-right"
        data-toggle="modal"
        data-target={"#" + title}
      >
        Edit
      </button>
    ) : null;
    return (
      <React.Fragment>
        <InputModal
          title={title}
          handle={title}
          saveModalDetails={saveModalDetails && saveModalDetails}
        />
        <div className="col col-md-4 col-sm-auto align-self-center">
          <div className="card bg-light mb-3 ">
            <div className="card-header">
              {title}
              {button}
            </div>
            <div className="card-body">
              {/* <h5 className="card-title">{handle ? handle : name}</h5> 
              <p className="card-text" />*/}
              {items.sort().map((item, i) => (
                <ItemList
                  key={item}
                  title={title}
                  sensor={item}
                  value={values[item].value}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  sensors: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  handle: PropTypes.string
};

export default UserPrefercesHOC(Card);
