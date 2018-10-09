import React from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./Button.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    cytoscapeStore.focusType = this.props.name.toLowerCase();
  }

  render() {
    return (
      <div className="" id={"buttonCss"} onClick={this.onClick}>
        {this.props.name}
      </div>
    );
  }
}

export default Button;
