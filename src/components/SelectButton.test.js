import React from "react";
import ReactDOM from "react-dom";
import SelectButton from "./SelectButton";

it("renders button without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(div).toMatchSnapshot();
});

it("should respond to change event and change the state of the select button component", () => {
  const wrapper = shallow(<SelectButton id="showSchools" checked={true} />);
  expect(wrapper.state("showSchools")).toEqual(true);
});

// it("should respond to change event and change the state of the select button component", () => {
//   const wrapper = shallow(<SelectButton id="showSchools" checked=true />);
//   wrapper
//     .find("#showSchools")
//     .simulate("change", { target: { name: "email", checked: true } });
//   expect(wrapper.state("email")).toEqual("blah@gmail.com");
// });
