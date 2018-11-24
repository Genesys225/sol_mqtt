import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { identIcon } from "../../utils/identicon";
import { FiCpu } from "react-icons/fi";

class Navbar extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.persistor);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let identiconData = "";
    isAuthenticated && (identiconData = "base64," + identIcon(user.identicon));
    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/manager">
              {" "}
              Manager
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to="/"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link text-black-50"
            >
              <img
                className="rounded"
                style={{ width: "30px", marginRight: "5px" }}
                src={"data:image/png;" + identiconData}
                alt={user.userName}
                circle="true"
              />{" "}
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              {" "}
              dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item ">
            <Link className="nav-link " to="/create">
              Create User
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4 ">
        <div className="container">
          <Link className="navbar-brand text-white-50" to="/">
            <FiCpu className="mb-2" /> SOL Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
