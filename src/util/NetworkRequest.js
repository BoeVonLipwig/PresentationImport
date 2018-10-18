import input from "../assets/output.json";
import filter from "../util/DataFilter";

// This class gets the data and stores it to be called by cytoscape
class NetworkRequest {
  constructor() {
    this.graphP = Promise.resolve(input);

    this.filterNames = filter.parseElementsToGetFilterNames(this.getGraphP());
  }

  getGraphP() {
    return this.graphP;
  }

  getFilterNames() {
    return this.filterNames;
  }
}

const networkRequest = new NetworkRequest();

export default networkRequest;
