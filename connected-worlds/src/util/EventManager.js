import Concentric from "../layouts/Concentric";
import SelectButton from "../components/SelectButton";

/*
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
*/
let cy;

const layouts = {
  showSchools: { name: "concentric" },
  showProjects: { name: "circle" },
  showCollab: { name: "grid" }
};

export function notify(layoutID) {
  cy.setLayout(layouts[layoutID]);
}

export function set(cyto) {
  console.log(cyto);
  cy = cyto;
}
