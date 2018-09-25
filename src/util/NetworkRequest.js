import input from "../assets/output.json";
import filter from "../util/DataFilter";

// This class gets the data and stores it to be called by cytoscape
class NetworkRequest {
  constructor() {
    this.graphP = Promise.resolve(input);

    this.styleP = fetch("data.cycss").then(x => {
      return x.text();
    });

    this.filterNames = filter.parseElementsToGetFilterNames(this.getGraphP());
  }

  getGraphP() {
    return this.graphP;
  }

  getStyleP() {
    return this.styleP;
  }

  getFilterNames() {
    return this.filterNames;
  }
}

const networkRequest = new NetworkRequest();

export default networkRequest;
