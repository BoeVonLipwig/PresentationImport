import React from "react";
import cytoscape from "cytoscape";
import loadData from "../util/data";
import { set } from "../util/EventManager";
import { notify } from "../util/EventManager";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.cyDiv = React.createRef();
    this.cy;
  }

  setLayout(options) {
    this.cy.layout(options).run();
  }

  componentDidMount() {
    // get exported json from cytoscape desktop via ajax
    let graphP = loadData();

    // also get style via ajax
    let styleP = fetch("data.cycss").then(x => {
      return x.text();
    });

    this.cy = cytoscape({
      container: this.cyDiv.current,
      style: styleP,
      elements: graphP,
      wheelSensitivity: 0.5
    });

    // wait for data to be loaded before attempt to run layout
    this.cy.on("ready", () => {
      notify("showProjects");
    });

    set(this);
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default Cytoscape;
