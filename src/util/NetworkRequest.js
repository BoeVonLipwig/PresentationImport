import loadData from "../util/data";

// This class gets the data and stores it to be called by cytoscape
class NetworkRequest {
  constructor() {
    this.colorP = fetch("ColorSettings.json").then(resp => resp.json());
    this.graphP = loadData();
    this.styleP = fetch("data.cycss").then(x => {
      return x.text();
    });
  }

  getColorP() {
    return this.colorP;
  }

  getGraphP() {
    return this.graphP;
  }

  getStyleP() {
    return this.styleP;
  }
}

const networkRequest = new NetworkRequest();

export default networkRequest;
