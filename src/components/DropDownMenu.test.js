import React from "react";
import ReactDOM from "react-dom";
import DropDownMenu from "./DropDownMenu";
import { shallow } from "enzyme";

it("renders button without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DropDownMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DropDownMenu />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});
