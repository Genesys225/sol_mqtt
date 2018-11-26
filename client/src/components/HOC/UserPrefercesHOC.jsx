import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createOrUpdateHandel } from "../../actions/userActions";

const UserPrefercesHOC = WrappedComponent => {
  return class UserPrefercesHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {};
      this.saveModalDetails = this.saveModalDetails.bind(this);
    }

    saveModalDetails(handle, saveCallback) {
      const { id } = this.props.auth.user;
      let handleData = {
        user_id: id,
        title: this.props.title,
        handle
      };
      console.log(handleData);
      this.props.createOrUpdateHandel(handleData, saveCallback);
    }

    componentWillReceiveProps = nextProps => {
      const { title } = this.props;
      if (nextProps.user.preferences.nodes) {
        const { nodes } = nextProps.user.preferences;
        if (nodes.length > 0)
          this.handle = nodes.find(node => node.node.name === title).handle;
      } else this.handle = title;
    };
    render() {
      const { isAuthenticated } = this.props.auth;

      return (
        <WrappedComponent
          {...this.props}
          title={this.handle}
          saveModalDetails={isAuthenticated ? this.saveModalDetails : null}
        />
      );
    }
  };
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

const composedHoc = compose(
  connect(
    mapStateToProps,
    { createOrUpdateHandel }
  ),
  UserPrefercesHOC
);

export default composedHoc;
