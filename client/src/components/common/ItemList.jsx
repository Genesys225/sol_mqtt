import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import SensorItemHOC from "../HOC/SensorItemHOC";

const listItemGroup = props => {
  let { badgeClassname, displayGraphButton, sensor, value } = props;
  let listItemClassname = displayGraphButton ? "col-md-10" : "col-md-12";

  return (
    <ul className="list-group">
      <div className="row justify-content-start">
        <li
          key={sensor}
          className={classnames(
            "list-group-item d-flex justify-content-between align-items-center",
            listItemClassname
          )}
        >
          {sensor}
          <span className={classnames("badge  badge-pill", badgeClassname)}>
            {value}
          </span>
        </li>
        {displayGraphButton}
      </div>
    </ul>
  );
};

listItemGroup.propTypes = {
  sensor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default SensorItemHOC(listItemGroup);
