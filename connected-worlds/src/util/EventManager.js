// import Concentric from "../layouts/Concentric";

// function getLayout() {
//   //TODO
//   let layoutObj = new Concentric(); //eval("new " + layout + "()");
//   return Concentric.getLayout();
// }

// function set(graph, layout) {
//   graph.on("ready", () => {
//     graph.layout(this.getLayout(layout)).run();
//   });
// }

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
