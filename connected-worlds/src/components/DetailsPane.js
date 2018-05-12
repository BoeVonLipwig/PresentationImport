import React from "react";
import SelectButton from "./SelectButton";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: "<em> Select Any Node </em>", isHidden: false };
  }

  clickHandler() {
    this.setState(
      Object.assign({}, this.state, {
        isHidden: !this.state.isHidden
      })
    );
  }

  render() {
    const elem = <SelectButton key={""} name={"Show Details"} id={""} />;
    return (
      <div id="detailsBar">
        <div id="toggle">{elem}</div>
        <div id="nodeDetails" className="expanded">
          <div id="infoContainer" className="info">
            <div className="container">
              <div className="info-row">{this.state.show}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsPane;
