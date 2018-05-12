import React from "react";

class SelectButton extends React.Component {
  render() {
    return (
      <div className="control">
        <div className="checkbox-round">
          <a onClick={this.clickHandler}>
            <input id={this.props.id} type="checkbox" />
            <label htmlFor={this.props.id} />
          </a>
        </div>

        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SelectButton;
