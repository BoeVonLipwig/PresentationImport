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
  specialTypes = [];
}
decorate(CytoscapeStore, {
  layouts: observable,
  selectedNode: observable,
  nhood: observable,
  details: observable,
  hoveredNode: observable,
  visNodeNames: observable,
  visNodesMap: observable,
  visNodesData: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
