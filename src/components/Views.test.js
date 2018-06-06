import React from "react";
import ReactDOM from "react-dom";
import Views from "./Views";
import SelectButton from "./SelectButton";
import { mount, find, at, simulate, text, instance } from "enzyme";

it("renders views without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Views />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders views correctly without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Views />, div);
  expect(div).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it("should unselect the projects and collaborators buttons when the programmes button is clicked", () => {
  const wrapper = mount(
    <div>
      <Views test="true" />
    </div>
  );

  wrapper
    .find(Views)
    .instance()
    .setState({
      views: [
        {
          name: "1",
          id: "1",
          isChecked: true
        },
        {
          name: "2",
          id: "2",
          isChecked: false
        },
        {
          name: "3",
          id: "3",
          isChecked: false
        }
      ]
    });

  wrapper.update();
  const projectsButtonOld = wrapper.find(SelectButton).at(0);
  const programmesButtonOld = wrapper.find(SelectButton).at(1);
  const collaboratorsButtonOld = wrapper.find(SelectButton).at(2);

  expect(projectsButtonOld.find("input").props().checked).toEqual(true);
  expect(programmesButtonOld.find("input").props().checked).toEqual(false);
  expect(collaboratorsButtonOld.find("input").props().checked).toEqual(false);

  programmesButtonOld.prop("clickHandler")();

  wrapper.update();
  const projectsButtonNew = wrapper.find(SelectButton).at(0);
  const programmesButtonNew = wrapper.find(SelectButton).at(1);
  const collaboratorsButtonNew = wrapper.find(SelectButton).at(2);

  expect(projectsButtonNew.find("input").props().checked).toEqual(false);
  expect(programmesButtonNew.find("input").props().checked).toEqual(true);
  expect(collaboratorsButtonNew.find("input").props().checked).toEqual(false);
});
