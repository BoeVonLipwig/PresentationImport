import React from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./MenuButton.css";

class menuButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    cytoscapeStore.focusType = this.props.name.toLowerCase();
  }

  render() {
    console.log(this.props.name);
    return (
      <div className="" id={"buttonCss"} onClick={this.onClick}>
        {this.props.name}
      </div>
    );
  }
}

export default menuButton;
