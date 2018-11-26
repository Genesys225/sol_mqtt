import React, { Component } from "react";
import { connect } from "react-redux";
import { subscribe2RegisteredNodes } from "../../actions/nodeActions";
import Card from "../common/Card";
import nodeNameSelector from "../../selectors/nodeNameSelector";
import nodeTypesSelector from "../../selectors/nodeTypesSelector";
import Spinner from "../common/spinner";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: null,
      nodes: { "": "" }
    };
  }

  componentDidMount = () => {
    this.props.subscribe2RegisteredNodes();
  };

  render() {
    let { nodes, names } = this.props;
    let dislplayComponent = <Spinner />;

    if (names !== null && names.length > 0)
      dislplayComponent = (
        <div className="container-fluid">
          <div className="row align-items-start justify-content-center">
            {names.map(name => (
              <Card
                key={name}
                title={name}
                items={Object.getOwnPropertyNames(nodes[name])}
                values={nodes[name]}
              />
            ))}
          </div>
        </div>
      );
    return <React.Fragment>{dislplayComponent}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  names: nodeNameSelector(state),
  nodes: nodeTypesSelector(state),
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = { subscribe2RegisteredNodes };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
