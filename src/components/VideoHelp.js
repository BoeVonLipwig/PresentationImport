import React, { Fragment } from "react";
// import { observer } from "mobx-react";
import "./VideoHelp.css";

class VideoHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTutorial: false
    };
  }

  clickHandler(e, type) {
    console.log("stub");

    // TODO close video when clicking on X area or grey area
  }

  visibility() {
    if (this.state.showTutorial) {
      return { display: "" };
    }
    return { display: "none" };
  }

  renderVideo() {
    return (
      <div className="helpVideoWrapper">
        <iframe
          title="Youtube Video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ScMzIvxBSi4"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
      </div>
    );
  }

  render() {
    return (
      <div id="videoBackground" style={this.visibility()}>
        <Fragment> {this.renderVideo()}</Fragment>
      </div>
    );
  }
}

export default VideoHelp;
