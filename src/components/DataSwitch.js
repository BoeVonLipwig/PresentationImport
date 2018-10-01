import React from "react";
import { observer } from "mobx-react";
// import cytoscapeStore from "../util/CytoscapeStore";
// import { autorun } from "mobx";
import "./DataSwitch.css";

class DataSwitch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      value: event.target.value
    });
    console.log(this.state.value);
  };

  handleSelect = item => {
    this.setState({ ...this.state, displayResults: false, value: item.name });
  };

  render() {
    return (
      <input
        type="range"
        class="slider"
        min="0"
        max="100"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default observer(DataSwitch);
