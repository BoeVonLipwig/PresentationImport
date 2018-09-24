import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  selectedNode = null;
  nhood = null;
  details = true;
  hoveredNode = null;
  visNodeNames = [];
  visNodesMap = {};
  visNodesData = [];
  showTutorial = false;
}
decorate(CytoscapeStore, {
  layouts: observable,
  selectedNode: observable,
  nhood: observable,
  details: observable,
  hoveredNode: observable,
  visNodeNames: observable,
  visNodesMap: observable,
  visNodesData: observable,
  showTutorial: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
