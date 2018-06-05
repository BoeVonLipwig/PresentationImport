import React from "react";

class Aid extends React.Component {
  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.msg}
        <label htmlFor={this.props.id} onClick={this.props.clickHandler} />
      </div>
    );
  }
}

export default Aid;
