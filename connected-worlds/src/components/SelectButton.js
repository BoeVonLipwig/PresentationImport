import React from "react";
import notify from "../util/EventManager";

class SelectButton extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    notify(this.props.id);
  }

  setChecked(val) {
    this.prp;
  }

  render() {
    return (
      <div className="control">
        <div className="checkbox-round">
          <input id={this.props.id} type="checkbox" />
          <label htmlFor={this.props.id} onClick={this.clickHandler} />
        </div>

        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SelectButton;
