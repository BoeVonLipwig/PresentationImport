import React from "react";
import { observer } from "mobx-react";
import cytoscapeStore from "../util/CytoscapeStore";
import Slider from "rc-slider";
import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";
// import { autorun } from "mobx";
import "./DataSwitch.css";
import years from "../assets/years.json";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class DataSwitch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };

    Promise.resolve((this.years = years));
    this.min = 0;
    this.max = this.years.length - 1;
    cytoscapeStore.minYear = this.years[this.min];
    cytoscapeStore.maxYear = this.years[this.max];
  }

  handleChange = event => {
    this.min = event[0];
    this.max = event[1];

    // update the global store to notify which data should be filtered
    cytoscapeStore.minYear = this.years[this.min];
    cytoscapeStore.maxYear = this.years[this.max];
  };

  handleSelect = item => {
    this.setState({ ...this.state, displayResults: false, value: item.name });
  };

  render() {
    return (
      <div className="wrapper">
        <p>
          Range: {cytoscapeStore.minYear} - {cytoscapeStore.maxYear}
        </p>
        <Range
          min={0}
          max={this.years.length - 1}
          defaultValue={[this.min, this.max]}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default observer(DataSwitch);
