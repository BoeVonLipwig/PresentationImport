import React, { Fragment } from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./NodeInfo.css";

class NodeInfo extends React.Component {
  render() {
    let node = cytoscapeStore.node;
    return <div>{this.nodeData(node)}</div>;
  }

  nodeData(node) {
    let brief = node.data("brief");
    let infoSchool = node.data("school");
    let mediaLink = node.data("mediaLink");
    let siteLink = node.data("siteLink");
    let staffSiteLink = node.data("staffSiteLink");
    let siteName = !node.data("siteName")
      ? node.data("name")
      : node.data("siteName");
    let nodeType = node.data("type");
    let role = node.data("role");
    let datesActive = node.data("datesActive");
    if (nodeType === "person" && !mediaLink) {
      mediaLink = "assets/id-img.png";
    }

    return (
      <Fragment>
        {this.parseMedia(mediaLink)}
        {this.parseRole(role)}
        {this.parseProgram(infoSchool)}
        {this.parseSite(siteName, siteLink, staffSiteLink)}
        {this.parseDates(datesActive)}
        {this.parseBrief(brief)}
      </Fragment>
    );
  }

  parseMedia(mediaLink) {
    return (
      <div>
        <img src={mediaLink} />
      </div>
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

  parseProgram(infoSchool) {
    return infoSchool ? (
      <div className="info-row">
        <p className="info-left">Programme |</p>
        <p className="info-right">{infoSchool}</p>
      </div>
    ) : null;
  }

  parseSite(siteName, siteLink, staffSiteLink) {
    return (
      <Fragment>
        {siteLink ? this.parseLink(siteName, siteLink) : null}
        {staffSiteLink ? this.parseStaffLink(siteName, staffSiteLink) : null}
      </Fragment>
    );
  }

  parseLink(siteName, siteLink) {
    return (
      <div className="info-row">
        <p className="info-left">Website |</p>
        <p className="info-right">
          <a href={siteLink}>{siteName}</a>
        </p>
      </div>
    );
  }

  parseStaffLink(siteName, staffSiteLink) {
    return (
      <div className="info-row">
        <p className="info-left">Staff Webpage |</p>
        <p className="info-right">
          <a href={staffSiteLink}>{siteName}</a>
        </p>
      </div>
    );
  }

  parseDates(datesActive) {
    return datesActive ? (
      <div className="info-row">
        <p className="info-left">Dates Active |</p>
        <p> p className="info-right">{datesActive}</p>
      </div>
    ) : null;
  }

  parseBrief(brief) {
    return brief ? (
      <div className="info-row">
        <hr />
        <p className="info-brief">{brief}</p>
      </div>
    ) : null;
  }
}

export default NodeInfo;
