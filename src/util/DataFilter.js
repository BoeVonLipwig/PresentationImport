import loadData from "../util/data";
import filter from "../util/DataFilter";

// This class gets the data and finds name filters for cytoscape
class DataFilter {
  parseElementsToGetFilterNames(graphP) {
    filterNames = new Set();
    for (let dataInstances in graphP) {
      filterNames.add(dataInstances.data.type);
    }
    return filterNames;
  }
}

const datafilter = new DataFilter();

export default datafilter;
