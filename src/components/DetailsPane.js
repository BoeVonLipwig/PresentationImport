import React from "react";
import SelectButton from "./SelectButton";
import cytoscapeStore from "../util/CytoscapeStore";
import { autorun } from "mobx";
import { observer } from "mobx-react";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [{ isChecked: false }]
      // this.state = { show: "<em> Select Any Node </em>", isHidden: false };
    };
  }

  clickHandler(e) {
    // compute new dictionary
    const newStatus = this.state.status.map(function(entry) {
      return Object.assign({}, entry, {
        isChecked: !entry.isChecked,
        isHidden: !entry.isHidden
      });
    });

    // assign new dictionary to the details pane select button.
    this.setState(
      Object.assign({}, this.state, {
        status: newStatus
      })
    );
  }

  toggleCheck() {
    // get boolean based on button's state
    let hidden = this.state.status[0].isChecked;
    // console.log(cytoscapeStore.layout);
    console.log(cytoscapeStore.node);
    if (!hidden) {
      return "";
    }
    if (cytoscapeStore.node === null) {
      return (
        <div className="info-row">
          <em>Select Any Node</em>
        </div>
      );
    }
    return (
      <div className="info-row">
        <em>node not null</em>
      </div>
    );
  }

  render() {
    const elem = this.state.status.map(elem => {
      return (
        <SelectButton
          key={""}
          name={"Show Details"}
          id={""}
          isChecked={elem.isChecked}
          isHidden={elem.isHidden}
          clickHandler={event => this.clickHandler(event)}
        />
      );
    });
    return (
      <div id="detailsBar">
        <div id="toggle">{elem}</div>
        <div id="nodeDetails" className="expanded">
          {this.toggleCheck()}
        </div>
      </div>
    );
  }
}

export default observer(DetailsPane);
