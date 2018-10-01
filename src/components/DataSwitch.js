import React from "react";
import { observer } from "mobx-react";
import cytoscapeStore from "../util/CytoscapeStore";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
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

    // update the global store to notify which data should be filtered
    cytoscapeStore.filterDataToDisplay = this.state.value;
  };

  handleSelect = item => {
    this.setState({ ...this.state, displayResults: false, value: item.name });
  };

  render() {
    return (
      <div class="wrapper">
        <p>Range with custom handle</p>
        <Range
          min={0}
          max={20}
          defaultValue={[3, 10]}
          tipFormatter={value => `${value}%`}
        />
      </div>
    );
  }
}

export default observer(DataSwitch);
