// import Concentric from "../layouts/Concentric";

// function getLayout(layout) {
//   //TODO
//   let layoutObj = new Concentric(); //eval("new " + layout + "()");
//   return layoutObj.getLayout();
// }

// function set(graph, layout) {
//   graph.on("ready", () => {
//     graph.layout(this.getLayout(layout)).run();
//   });
// }

let cy;

export function notify(layout) {
  cy.setLayout(layout);
}

export function set(cyto) {
  cy = cyto;
}
