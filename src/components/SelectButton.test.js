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
  wrapper.find("label").simulate("click");
  expect(mockCallback.mock.calls.length).toBe(1);
});
