import Concentric from "../layouts/Concentric";
import SelectButton from "../components/SelectButton";

function getLayout(layout) {
  //TODO
  let layoutObj = new Concentric(); //eval("new " + layout + "()");
  return layoutObj.getLayout();
}

function set(graph, layout) {
  graph.on("ready", () => {
    graph.layout(this.getLayout(layout)).run();
  });
}

let currentlySelectedButton;

export function notify(button) {
  console.log(button);

  //alert(lastNodeID);
  if (currentlySelectedButton != null) {
    currentlySelectedButton.toggleCheck();
    currentlySelectedButton = button;
    button.toggleCheck();
  }

  //alert(buttonID);
}

export function setFirstButton(button) {
  currentlySelectedButton = button;
  currentlySelectedButton.toggleCheck();
}
