import React from "react";
import "./MenuButton.css";

class MenuButton extends React.Component {
  render() {
    return (
      <div
        className="button-css"
        onClick={() => {
          this.props.onSelect(this.props.name);
        }}
      >
        {this.props.name}
      </div>
    );
  }
}

export default MenuButton;
