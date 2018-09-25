import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  selectedNode = null;
  details = true;
  hoveredNode = null;
  visNodesMap = {};
  visNodesData = [];
}
decorate(CytoscapeStore, {
  layouts: observable,
  selectedNode: observable,
  details: observable,
  hoveredNode: observable,
  visNodesMap: observable,
  visNodesData: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;
