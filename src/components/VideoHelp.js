import React, { Fragment } from "react";
import { observer } from "mobx-react";
import "./VideoHelp.css";

class VideoHelp extends React.Component {
  constructor(props) {
    super(props);
    this.cytostore = props.cytostore;
  }

  clickHandler = (e, type) => {
    this.cytostore.showTutorial = false;
  };

  visibility() {
    if (this.cytostore.showTutorial) {
      return { display: "" };
    }
    return { display: "none" };
  }

  renderVideo() {
    return (
      <div className="helpVideoWrapper">
        <iframe
          title="Youtube Video"
          src="https://www.youtube.com/embed/ScMzIvxBSi4"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
      </div>
    );
  }

  render() {
    console.log(this.cytostore.showTutorial);
    return (
      <div
        id="videoBackground"
        style={this.visibility()}
        onClick={this.clickHandler}
      >
        <Fragment> {this.renderVideo()}</Fragment>
      </div>
    );
  }
}

export default observer(VideoHelp);
