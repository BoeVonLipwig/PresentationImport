import React from "react";
import ReactDOM from "react-dom";
import SelectButton from "./SelectButton";
import { shallow } from "enzyme";

it("renders button without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly as false", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton isChecked={false} />, div);

  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly as true", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton isChecked={true} />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly as correct name 'Projects'", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton name="Projects" />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly as correct name 'Programme'", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton name="Programme" />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly as correct name 'Collaborators'", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton name="Collaborators" />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders button correctly as correct name 'Show Details'", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton name="Show Details" />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});
//
// it("should respond to change event and change the state of the select button component", () => {
//   const wrapper = shallow(
//     <SelectButton id="showSchools" checked={true} />
//   ).find("showSchools");
//   // expect(wrapper.toEqual(null));
//   expect(wrapper.dive().state("showSchools")).toEqual(true);
// });

// it("should respond to change event and change the state of the select button component", () => {
//   const wrapper = shallow(<SelectButton id="showSchools" checked=true />);
//   wrapper
//     .find("#showSchools")
//     .simulate("change", { target: { name: "email", checked: true } });
//   expect(wrapper.state("email")).toEqual("blah@gmail.com");
// });
