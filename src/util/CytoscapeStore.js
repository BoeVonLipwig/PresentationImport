import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  selectedNode = null;
  details = true;
  hoveredNode = null;
  visNodesMap = {};
  visNodesData = [];
  specialTypes = [];
  showTutorial = false;
  minYear = 2016;
  maxYear = 2017;
}
decorate(CytoscapeStore, {
  layouts: observable,
  selectedNode: observable,
  details: observable,
  hoveredNode: observable,
  visNodesMap: observable,
  visNodesData: observable,
  showTutorial: observable,
  minYear: observable,
  maxYear: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
