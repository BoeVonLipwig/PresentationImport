import React from "react";
import "./Aid.css";
import { observer } from "mobx-react";
import { Fragment } from "react";
import aidStore from "../util/AidStore";

class Aid extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.state = { display: true };
  }

  clickHandler(e, type) {
    switch (this.props.id) {
      case "detailAid":
        aidStore.aids.details = { display: "none" };
        break;
      case "viewAid":
        aidStore.aids.views = { display: "none" };
        break;
      case "searchAid":
        aidStore.aids.search = { display: "none" };
        break;
      case "contactAid":
        aidStore.aids.contact = { display: "none" };
        break;
      default:
        break;
    }
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
