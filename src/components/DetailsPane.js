import React from "react";
import SelectButton from "./SelectButton";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [{ show: "<em> Select Any Node </em>", isChecked: false }]
      // this.state = { show: "<em> Select Any Node </em>", isHidden: false };
    };
  }

  clickHandler(e) {
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
    return <div className="info-row">{"<em> Select Any Node </em>"}</div>;
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
          <div id="infoContainer" className="info">
            <div className="container"> {this.toggleCheck()} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsPane;
