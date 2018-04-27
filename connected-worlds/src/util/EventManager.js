import Concentric from "../layouts/Concentric";

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

function notify(buttonId) {
  alert(lastNode);
  lastNode = buttonId;
  alert(buttonId);
}

let lastNode;

export default notify;
