import React from "react";
import ReactDOM from "react-dom";
import TopBar from "./TopBar";
import { shallow } from "enzyme";

it("renders topbar without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TopBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders topbar correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TopBar />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});
