import React from "react";
import cytoscape from "cytoscape";
import loadData from "../util/data";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.cyDiv = React.createRef();
  }

  componentDidMount() {
    // get exported json from cytoscape desktop via ajax
    let graphP = loadData();

    // also get style via ajax
    let styleP = fetch("data.cycss");

    let cy = cytoscape({
      container: this.cyDiv.current,
      style: styleP,
      elements: graphP,
      wheelSensitivity: 0.5
    });
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default Cytoscape;
