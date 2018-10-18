import { observable, decorate } from "mobx";

class CytoscapeStore {
  //stores the current layout
  layouts = null;
  //stores the current special node type that's being focused on
  focusType = "";
  selectedNode = null;
  details = true;
  hoveredNode = null;
  visNodesMap = {};
  visNodesData = [];
  specialTypes = [];
  showTutorial = false;
  layoutID = "showSegment";
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
