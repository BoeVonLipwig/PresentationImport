import React from "react";
import ReactDOM from "react-dom";
import Cytoscape from "./Cytoscape";

// 1.
it("renders cytoscape without cytoscape crashing", () => {
  console.log("HI 1");
  const div = document.createElement("div");
  ReactDOM.render(<Cytoscape />, div);
  ReactDOM.unmountComponentAtNode(div);
  console.log("BYE 1");
});

// 2.
it("renders cytoscape correctly", () => {
  console.log("HI 2");
  const div = document.createElement("div");
  ReactDOM.render(<Cytoscape />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
  console.log("BYE 2");
});
