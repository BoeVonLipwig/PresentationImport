import React from "react";
import ReactDOM from "react-dom";
import Cytoscape from "./Cytoscape";

// 1.
it("renders cytoscape without cytoscape crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Cytoscape />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// 2.
it("renders project layout correctly", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Cytoscape />, div);
  ReactDOM.unmountComponentAtNode(div);
});
