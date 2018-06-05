import React from "react";
import aidStore from "../util/AidStore";
import SelectButton from "./SelectButton";
import { observer } from "mobx-react";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [{ isChecked: true }]
    };
  }

  clickHandler(e) {
    aidStore.aids.details = { display: "none" };
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

  toggleCheck() {
    // get boolean based on button's state
    let hidden = this.state.status[0].isChecked;

    if (!hidden) {
      return "";
    }
    return (
      <div id="infoContainer" className="info">
        <div className="container">
          <div className="info-row">
            <em>Select Any Node</em>
          </div>
        </div>
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
