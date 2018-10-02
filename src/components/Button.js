import React from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./Button.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    cytoscapeStore.focusType = this.props.name;
  }

  render() {
    return (
      <div className="" id={"contact-button"} onClick={this.onClick}>
        {this.props.name}
      </div>
    );
  }
}

export default Button;
