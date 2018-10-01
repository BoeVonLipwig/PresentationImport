import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  focusType = null;
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
  showTutorial: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
