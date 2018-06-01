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

// it("renders button correctly as false", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<SelectButton isChecked="false" />, div);
//
//   expect(div).toMatchSnapshot();
//   ReactDOM.unmountComponentAtNode(div);
// });
//
// it("renders button correctly as true", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<SelectButton isChecked={true} />, div);
//   expect(div).toMatchSnapshot();
//   ReactDOM.unmountComponentAtNode(div);
// });

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

it("renders button correctly as correct name 'Show Projects' with id 'showProjects'", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectButton id="showProjects" name="Projects" />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("should have correct checked value of true", () => {
  const wrapper = shallow(<SelectButton id="showSchools" isChecked={true} />);
  expect(wrapper.find("input").props().checked).toBe(true);
});

it("should have correct checked value of false", () => {
  const wrapper = shallow(<SelectButton id="showSchools" isChecked={false} />);
  expect(wrapper.find("input").props().checked).toBe(false);
  // expect(wrapper.toEqual(null));
  // console.log("value:");
  // console.log(wrapper.find("input").prop("checked").value);
  // console.log(wrapper.find("input").props());
  // console.log(wrapper.find("input").props().checked);
});

it("should have correct checked value of true to not equal false", () => {
  const wrapper = shallow(<SelectButton id="showSchools" isChecked={true} />);
  expect(wrapper.find("input").props().checked).not.toBe(false);
});

it("should have correct click handler", () => {
  const mockCallback = jest.fn();
  const wrapper = shallow(
    <SelectButton
      id="showSchools"
      isChecked={true}
      clickHandler={mockCallback}
    />
  );
  expect(mockCallback.mock.calls.length).toBe(0);
  //Click the thing I don't know how to do this either
  wrapper.find("button").simulate("click");
  expect(mockCallback.mock.calls.length).toBe(1);
});

// it("should respond to change event and change the state of the select button component", () => {
//   const wrapper = shallow(<SelectButton id="showSchools" checked=true />);
//   wrapper
//     .find("#showSchools")
//     .simulate("change", { target: { name: "email", checked: true } });
//   expect(wrapper.state("email")).toEqual("blah@gmail.com");
// });
