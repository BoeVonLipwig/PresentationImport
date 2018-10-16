import React from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./MenuButton.css";

class MenuButton extends React.Component {
  onClick = () => {
    cytoscapeStore.focusType = this.props.name.toLowerCase();
  };

  render() {
    return (
      <div id={"buttonCss"} onClick={this.onClick}>
        {this.props.name}
      </div>
    );
  }
}

export default MenuButton;
