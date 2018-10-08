import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  selectedNode = null;
  details = true;
  hoveredNode = null;
  visNodesMap = {};
  visNodesData = [];
  minYear = null;
  maxYear = null;
  specialTypes = [];
  showTutorial = false;
}
decorate(CytoscapeStore, {
  layouts: observable,
  selectedNode: observable,
  details: observable,
  hoveredNode: observable,
  visNodesMap: observable,
  visNodesData: observable,
  minYear: observable,
  maxYear: observable,
  showTutorial: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
