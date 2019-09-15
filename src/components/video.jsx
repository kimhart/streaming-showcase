import React, { Component } from "react";

export default class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.playerRef = React.createRef();
  }

  componentDidMount() {
    window.jwplayer('player-div').setup({ playlist: `//cdn.jwplayer.com/v2/media/${this.props.mediaId}`});
  }

  componentDidUpdate(prevProps) {
    const { mediaId } = this.props;
    if (prevProps.mediaId !== mediaId) {
      this.destroyAndRerender(mediaId)
    }
  }

  destroyAndRerender = (mediaId) => {
    window.jwplayer('player-div').remove();
    window.jwplayer('player-div').setup({ playlist: `//cdn.jwplayer.com/v2/media/${mediaId}` });
  }

  componentWillUnmount() {
    window.jwplayer('player-div').remove();
  }

  render() {
    return (
      <div ref={this.playerRef} id="player-div" />
    );
  }
}