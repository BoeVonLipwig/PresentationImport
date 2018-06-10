import React from "react";
import "./Aid.css";
import { observer } from "mobx-react";
import { Fragment } from "react";

class Aid extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.state = { display: true };
  }

  clickHandler(e, type) {
    this.setState({ ...this.state, display: false });
  }

  render() {
    if (this.state.display) {
      return (
        <Fragment>
          <div
            id={this.props.id + "-label"}
            className="aid-label"
            style={this.props.style}
            onClick={this.clickHandler}
          >
            {this.props.msg}
            <label htmlFor={this.props.id} />
          </div>
          <div
            id={this.props.id}
            className="aid"
            style={this.props.style}
            onClick={this.clickHandler}
          />
        </Fragment>
      );
    } else {
      return "";
    }
  }
}

export default observer(Aid);
