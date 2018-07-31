import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  view = "showProjects";
  selectedNode = null;
  nhood = null;
  details = true;
  hoveredNode = null;
  visNodeNames = [];
  visNodesMap = {};
}
decorate(CytoscapeStore, {
  layouts: observable,
  view: observable,
  selectedNode: observable,
  nhood: observable,
  details: observable,
  hoveredNode: observable,
  visNodeNames: observable,
  visNodesMap: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
