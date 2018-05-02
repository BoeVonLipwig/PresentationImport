import React from "react";
import cytoscape from "cytoscape";
import loadData from "../util/data";
import { set } from "../util/EventManager";
import { notify } from "../util/EventManager";
import Promise from "bluebird";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.cyDiv = React.createRef();
    this.cy;
    this.initCy = this.initCy.bind(this);
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

    Promise.all([graphP, styleP]).spread(this.initCy);
  }

  initCy(graphP, styleP) {
    console.log(graphP);
    this.cy = cytoscape({
      container: this.cyDiv.current,
      style: styleP,
      elements: graphP,
      wheelSensitivity: 0.5
    });

    set(this);
    notify("showProjects");
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default Cytoscape;
