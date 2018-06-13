import React, { Fragment } from "react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./NodeInfo.css";

class NodeInfo extends React.Component {
  render() {
    let node = cytoscapeStore.node;
    return <Fragment>{this.nodeData(node)}</Fragment>;
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
        {this.parseMedia(mediaLink, staffSiteLink)}
        {this.parseRole(role)}
        {this.parseProgram(infoSchool)}
        {this.parseSite(siteName, siteLink, staffSiteLink)}
        {this.parseDates(datesActive)}
        {this.parseBrief(brief)}
      </Fragment>
    );
  }

  parseMedia(mediaLink, staffSiteLink) {
    let pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    let pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

    if (pattern1.test(mediaLink)) {
      let replacement = "https://player.vimeo.com/video/$1";
      let link = mediaLink.replace(pattern1, replacement);
      return (
        <div className="videoWrapper">
          <iframe
            title="Youtube Vidoe"
            width="1920"
            height="1080"
            className="info-media"
            src={link}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    }

    if (pattern2.test(mediaLink)) {
      let replacement =
        "https://www.youtube.com/embed/$1?&rel=0&showinfo=0&modestbranding=1&hd=1&autohide=1&color=white";
      let link = mediaLink.replace(pattern2, replacement);
      return (
        <div className="videoWrapper">
          <iframe
            title="Vimeo Video"
            width="1920"
            height="1080"
            className="info-media"
            src={link}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div className="id-wrapper id-linked">
        <a href={staffSiteLink} target="_blank" rel="noopener noreferrer">
          <img
            className="img-crop"
            src={mediaLink}
            alt={"Digital Portrait or descriptive media link"}
          />
        </a>
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
