import React, { Component } from "react";
import Cytoscape from "./components/Cytoscape";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import cytoscapeStore from "./util/CytoscapeStore";
import Tutorial from "./components/VideoHelp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Cytoscape cytoscapeStore={cytoscapeStore} />
        <BottomBar />
        <Tutorial />
      </div>
    );
  }
}

export default App;
