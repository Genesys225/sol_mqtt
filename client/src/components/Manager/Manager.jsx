import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Manager extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const noZonesCreatedTitle = (
      <h3>No zones created yet, please create a zone to mange it</h3>
    );
    const noNodesAssignedTitle = (
      <h3>
        No nodes were assigned by the user please assign new nodes or contact
        administrator to share assined nodes
      </h3>
    );

    const zonesEditTitle = (
      <div className="container">
        <h3>Select a zone to edit it</h3>
      </div>
    );

    const zonesEditCard = (
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {zoneName}
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">{/* nodes list with delete option */}</div>
          </div>
        </div>
      </div>
    );
    const assignNodeToZone = (
      <div className="container">
        <h3>Assign a node to a zone</h3>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select zone
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {zonesList}
          </div>
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Select node
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {nodesList}
            </div>
          </div>
          <button type="button" class="btn btn-outline-secondary">
            Save
          </button>
        </div>
      </div>
    );
    return <div />;
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  userPreferences: state.user.preferences
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager);
