import React from "react";
import "./SelectButton.css";

class SelectButton extends React.Component {
  render() {
    return (
      <div className="control">
        <div className="checkbox-round">
          <input
            id={this.props.id}
            type="checkbox"
            checked={this.props.isChecked}
            readOnly
          />
          <label htmlFor={this.props.id} onClick={this.props.clickHandler} />
        </div>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SelectButton;
