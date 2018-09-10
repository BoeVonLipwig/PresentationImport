import loadData from "../util/data";
import filter from "../util/DataFilter";

// This class gets the data and stores it to be called by cytoscape
class NetworkRequest {
  constructor() {
    //this.graphP = loadData();
    loadData().then(data => console.log(data));
    this.graphP = fetch("output.json").then(response => response.json());
    fetch("output.json").then(response =>
      response.json().then(data => console.log(data))
    );

    this.styleP = fetch("data.cycss").then(x => {
      return x.text();
    });

    this.filterNames = filter.parseElementsToGetFilterNames(getGraphP());
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
