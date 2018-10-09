import { observable, decorate } from "mobx";

class CytoscapeStore {
  //stores the current layout
  layouts = null;
  //stores the current special node type that's being focused on
  focusType = "school";
  selectedNode = null;
  details = true;
  hoveredNode = null;
  visNodesMap = {};
  visNodesData = [];
  specialTypes = [];
  showTutorial = false;
}

decorate(CytoscapeStore, {
  layouts: observable,
  focusType: observable,
  selectedNode: observable,
  details: observable,
  hoveredNode: observable,
  visNodesMap: observable,
  visNodesData: observable,
  specialTypes: observable,
  showTutorial: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
