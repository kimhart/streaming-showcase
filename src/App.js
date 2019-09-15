import React, { Component } from 'react';
import Header from "./components/header";
import MediaIds from "./components/media-ids";
import DataBlock from "./components/data-block";
import SourceTable from "./components/source-table";
import Manifest from "./components/manifest";
import iabSegments from "./data/iab-category";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { mediaId: "RY7CKXBT" };
  }

  componentDidMount() {
    this.getData(this.state.mediaId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mediaId !== this.state.mediaId) {
      this.getData(this.state.mediaId);
    }
    return;
  }

  handleView = (manifestView) => this.setState({ manifestView });

  handleMediaId = (mediaId) => {
    if (!mediaId) { return }
    this.getData(mediaId)
  }

  getData = (mediaId) => {
    fetch(`https://cdn.jwplayer.com/v2/media/${mediaId}`)
      .then(res => res.status === 200 && res.json())
      .then(json => {
        if (json) {
          this.setState({ mediaId: mediaId, data: json, error: false });
          this.getIAB(mediaId)
        } else {
          this.setState({ error: true })
        }
      })
      .catch(err => err)
  }

  getIAB = () => {
    const { mediaId } = this.state;
    fetch(`http://video-segments-api.longtailvideo.com/media/${mediaId}`)
      .then(res => res.json())
      .then(json => this.createIabLibrary(json))
      .catch(err => err);
  }

  createIabLibrary = (json) => {
    const iab = [];
    for (let [key, value] of Object.entries(json)) {
      if (key.substring(0, 2) === "10") {
        iab.push({ segment: key, score: value });
      }
    }
    iab.map(item => item.name = iabSegments.find(seg => seg.full_segment_id === parseInt(item.segment, 10)).data_group);
    this.setState({ iab });
  } 

  render() {
    const { manifestView, data, mediaId, iab, error } = this.state;
    let playlist, language, thumbstrip, tags;

    if (data) {
      playlist = data.playlist[0];
      let captions = playlist.tracks.find(el => el.kind === "captions");
      let thumbnails = playlist.tracks.find(el => el.kind === "thumbnails");
      language = captions ? captions.label : "Not specified";
      thumbstrip = thumbnails ? thumbnails.file : "No sprite generated";
      tags = playlist.tags.split(",");
    }

    return (
      <div className="App">
        <div className="main">
          <Header toggleView={this.handleView} />
          <MediaIds toggleMediaId={this.handleMediaId} fetchCustomId={this.handleMediaId} />
          <div className={`main__error ${error ? '-show' : ''}`}>Please enter a valid media_id</div>
          {manifestView && 
            <div className="main__manifest-view">
              <Manifest mediaId={mediaId} json={data} />
            </div>
          }
          {!manifestView && data &&
            <div className="main__UI-view">
              <div className="main__row">
                <DataBlock label="Title & Description" label2="language" title={data.title} description={data.description} language={language} />
                <DataBlock classname="data-block--video" label="Video Preview" video={true} mediaId={mediaId} />
              </div>
              <div className="main__row -offset">
                <div className="main__column">
                <DataBlock label="IAB Category" iab={iab} />
                  <DataBlock label="Tags" tags={tags} />
                  <SourceTable sources={playlist.sources} />
                </div>
                <div className="main__column -last">
                  <DataBlock label="Poster Image" thumbnail={playlist.image} />
                  <DataBlock label="Thumbnail Strip" thumbstrip={thumbstrip} />
                </div>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}
