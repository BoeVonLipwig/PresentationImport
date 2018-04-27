import React from "react";
import notify from "../util/EventManager";

class SelectButton extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log(this);
    notify(this.props.id);
  }

  render() {
    return (
      <div className="control">
        <div className="checkbox-round" onClick={this.clickHandler}>
          <input id={this.props.id} type="checkbox" />
          <label htmlFor={this.props.id} />
        </div>

        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SelectButton;
