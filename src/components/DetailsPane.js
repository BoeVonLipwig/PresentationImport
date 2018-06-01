import React from "react";
import { Fragment } from "react";
import SelectButton from "./SelectButton";
import cytoscapeStore from "../util/CytoscapeStore";
import { observer } from "mobx-react";
import NodeInfo from "./NodeInfo";
import "./DetailsPane.css";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [{ isChecked: true }]
    };
  }

  clickHandler() {
    // compute new dictionary
    const newStatus = this.state.status.map(function(entry) {
      return Object.assign({}, entry, {
        isChecked: !entry.isChecked
      });
    });

    // assign new dictionary to the details pane select button.
    this.setState(
      Object.assign({}, this.state, {
        status: newStatus
      })
    );
  }

  infoPane() {
    return (
      //Checks if a node is selected and displays the info if it is
      this.state.status[0].isChecked ? (
        <div id="infoContainer" className="info">
          <div className="container">
            <div className="info-row">
              <div>
                {cytoscapeStore.node === null ? (
                  <em>Select Any Node</em>
                ) : (
                  <NodeInfo />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null
    );
  }

  render() {
    const elem = this.state.status.map(elem => {
      return (
        <Fragment>
          <SelectButton
            key={""}
            name={""}
            id={""}
            isChecked={elem.isChecked}
            clickHandler={event => this.clickHandler(event)}
          />
          <h2>Show details</h2>
          {cytoscapeStore.node == null ? (
            ""
          ) : (
            <h className="nameHeader">{this.getName()}</h>
          )}
        </Fragment>
      );
    });
    return (
      <div id="detailsBar">
        <div id="toggle">{elem}</div>
        <div id="nodeDetails" className="expanded">
          {this.infoPane()}
        </div>
      </div>
    );
  }

  getName() {
    return cytoscapeStore.node === null ? "" : cytoscapeStore.node.data("name");
  }
}

export default observer(DetailsPane);
