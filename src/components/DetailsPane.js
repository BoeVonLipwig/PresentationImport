import React, { Fragment } from "react";
import RadioButton from "./RadioButton";
import cytoscapeStore from "../util/CytoscapeStore";
import { observer } from "mobx-react";
import NodeInfo from "./NodeInfo";
import "./DetailsPane.css";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };
  }

  clickHandler() {
    this.setState({
      ...this.state,
      isChecked: !this.state.isChecked
    });
  }

  infoPane(node) {
    return (
      //Checks if a node is selected and displays the info if it is
      this.state.isChecked ? (
        <div id="infoContainer" className="info">
          <div className="container">
            {node ? <NodeInfo /> : <em>Select Any Node</em>}
          </div>
        </div>
      ) : null
    );
  }

  render() {
    let node = cytoscapeStore.visNodesMap[cytoscapeStore.selectedNode];
    return (
      <div id="detailsBar">
        <div id="toggle">
          <Fragment>
            <RadioButton
              name={""}
              id={""}
              isChecked={this.state.isChecked}
              clickHandler={event => this.clickHandler(event)}
            />
            <h2>Show details</h2>
            {node ? <h1 className="nameHeader">{node.name}</h1> : null}
          </Fragment>
        </div>
        <div id="nodeDetails" className="expanded">
          {this.infoPane(node)}
        </div>
      </div>
    );
  }
}

export default observer(DetailsPane);
