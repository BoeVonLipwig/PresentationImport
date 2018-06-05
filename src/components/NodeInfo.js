import React, { Fragment } from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./NodeInfo.css";

class NodeInfo extends React.Component {
  render() {
    let node = cytoscapeStore.node;

    let infoTitle = node.data("name");
    let brief = node.data("brief");
    let infoSchool = node.data("school");
    let mediaLink = node.data("mediaLink");
    let siteLink = node.data("siteLink");
    let staffSiteLink = node.data("staffSiteLink");
    let siteName = node.data("siteName");
    let nodeType = node.data("type");
    let role = node.data("role");
    let datesActive = node.data("datesActive");

    // if (nodeType === "person") return parsePerson();
    let link;
    let fullInfo = "";
    if (nodeType === "person" && !mediaLink) {
      mediaLink = "assets/id-img.png";
    }

    if (!siteName) {
      siteName = node.data("name");
    }

    /**
     <div className="info-row">
     <p className="info-left"> |</p>
     <p className="info-right">{}</p>
     </div>
     */

    /**
     <a href = "link" >text</a>
     */

    return (
      <Fragment>
        {this.parseRole(role)}
        <div className="info-row">
          <p className="info-left">Programme |</p>
          <p className="info-right">{infoSchool}</p>
        </div>
        <div className="info-row">
          <p className="info-left">Website |</p>
          <p className="info-right">{siteName}</p>
        </div>
        <div className="info-row">
          <hr />
          <p className="info-brief">{brief}</p>
        </div>
      </Fragment>
    );
  }

  parseRole(role) {
    return role ? (
      <div className="info-row">
        <p className="info-left">Role |</p>
        <p className="info-right">{role}</p>
      </div>
    ) : null;
  }
}
export default NodeInfo;
