import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  selectedNode = null;
  details = true;
  hoveredNode = null;
  visNodesMap = {};
  visNodesData = [];
  minYear = 2016;
  maxYear = 2017;
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
