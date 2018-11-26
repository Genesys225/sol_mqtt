import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">SOL Manager</h1>
                <p className="lead">
                  {" "}
                  Create a user or login in order to manage/view you'r
                  site/node/s data
                </p>
                <hr />
                <Link to="/create" className="btn btn-lg btn-light mr-2">
                  Create User
                </Link>
                <Link to="/login" className="btn btn-lg text-dark btn-primary ">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  nodes: state.telemetry.nodes,
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
