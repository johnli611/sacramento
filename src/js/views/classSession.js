import React, { Component }     from 'react';
import Moment                   from 'moment';
import {
  Player,
  ControlBar,
  FullscreenToggle,
  PlayToggle,
  VolumeMenuButton,
  BigPlayButton
}                               from 'video-react';
import FixedAspectRatio         from '../services/fixedAspectRatio';
import Session                  from '../services/session';
import "../../../node_modules/video-react/dist/video-react.css";


const url = 'https://www.youtube.com/embed/es2Ha1oKkgY';

//
// TODO: Move this
// YouTube User ID: 3-eGPuInuVmMTbyyFVUDlg
//
// YouTube Channel ID: UC3-eGPuInuVmMTbyyFVUDlg
//


export default class ClassSession extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 1080,
      // height: '315px',
      isFullScreen: false
    };

    this.toggleVideoSize = this.toggleVideoSize.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  render() {
    let courseSession = this.props.class_session.course_session;
    let videoUrl = courseSession.video_url;
    let thumbnailUrl = courseSession.thumbnail_image_url;
    let startTime = Moment(courseSession.start_time);
    let liveStreamTime = Moment(startTime).toDate();
    console.log(liveStreamTime);
    let peerPurple = '#4E516A';

    let secondsAfterStartTime = Moment.duration(Moment().diff(Moment(liveStreamTime))).as('seconds');
    console.log(secondsAfterStartTime);

    return (
      <div>
        {Moment().isAfter(Moment(liveStreamTime)) ? (
          <div>
            {this.renderVideo(videoUrl, secondsAfterStartTime)}
          </div>
        ) : (
          <div>
            <div
              style={{maxWidth: `${this.state.width}px`}}
              className="video-player-small"
            >
              <FixedAspectRatio ratio={'560:315'}>
                <div style={{width: '100%', height: '100%'}}>
                  <img src={thumbnailUrl} width="100%" height="100%" />
                </div>
              </FixedAspectRatio>
            </div>
          </div>
        )}

        <div>
          <div
            className="col-sm-7"
            style={{paddingBottom: '80px'}}
          >
            {/*<div onClick={this.toggleVideoSize}>*/}
            {/*Change size*/}
            {/*</div>*/}

            <div style={{marginTop: '40px', paddingBottom: '20px', borderBottom: '2px solid #E8E8E8'}}>
              <h2>
                {this.props.class_session.course_name}
              </h2>

              <p className="m-b-0">
                <b>{Moment(courseSession.start_time).format('dddd, MMMM Do, h:mm a')}</b>
              </p>

              <p className="m-b-0">
                <b>Activity: </b> High Intensity Interval Training {/*this.props.class_session.course_category*/}
              </p>

              <p>
                <b>Level: </b> {this.capitalizeFirstLetter(this.props.class_session.course_difficulty)}
              </p>
            </div>

            <div style={{marginTop: '40px', paddingBottom: '20px', borderBottom: '2px solid #E8E8E8'}}>
              <h4>Description</h4>

              <p>
                {this.props.class_session.course_description}
              </p>
            </div>

            <div style={{marginTop: '40px', paddingBottom: '20px'}}>
              <h4>Equipment</h4>

              <p>
                {this.props.class_session.course_equipment}
              </p>
            </div>


            {/*<FeedbackModule*/}
            {/*classSession={this.props.class_session}*/}
            {/*setUserCourseSession={this.props.setUserCourseSession}*/}
            {/*/>*/}
          </div>

          <div className="col-sm-4 col-sm-offset-1">
            {/*{this.renderLeaderboard()}*/}
          </div>

          <div>
            <button onClick={this.handleFullScreen}>
              Full screen
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderLeaderboard() {
    return (
      <div style={{marginTop: '40px'}}>
        {/*<h4>PARTICIPANTS</h4>*/}

        {/*<p>*/}
          {/*<b>{this.props.participants.length} watching</b>*/}
        {/*</p>*/}

        <div style={{
          backgroundColor: 'rgba(46,44,46, 0.8)',
          height: '250px',
          overflowY: 'auto',
          width: '100%',
          color: 'white'
        }}>
          <div style={{padding: '15px', width: '100%', color: 'white', backgroundColor: 'rgba(19,30,61, 0.8)', height: '40px'}}>
            <h5 className="pull-left" style={{color: 'white', margin: '0'}}>
              Leaderboard
            </h5>

            <div className="pull-right">
              Points
            </div>
          </div>

          {this.renderParticipants()}
        </div>
      </div>
    );
  }

  renderPremiumParticipants() {
    return this.props.premiumParticipants.map((participant, index) => {
      return (
        <div style={{padding: '15px', paddingTop: index === 0 ? '20px' : '15px', backgroundColor: participant === Session.getCurrentUser().full_name ? 'rgba(19,30,61, 0.8)' : 'none'}}>
          <div
            className="pull-right"
          >
            {participant.points}
          </div>

          <span
            key={`participant${index}`}
            style={{
              marginLeft: '10px',
            }}
          >
            {participant.full_name}
          </span>
        </div>
      );
    });
  }


  renderParticipants() {
    return this.props.participants.map((participant, index) => {
      return (
        <div style={{padding: '15px', paddingTop: index === 0 ? '20px' : '15px', backgroundColor: participant === Session.getCurrentUser().full_name ? 'rgba(19,30,61, 0.8)' : 'none'}}>
          <div
            className="pull-right"
            style={{marginTop: '4px', marginRight: '10px', width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#68E090'}}
          >
          </div>

          <span
            key={`participant${index}`}
            style={{
              marginLeft: '10px',
            }}
          >
            {participant}
          </span>
        </div>
      );
    });
  }

  renderVideo(videoUrl, secondsAfterStartTime){
    return (
      <div
        style={{maxWidth: `${this.state.width}px`}}
        className="video-player-small"
      >
        { this.isYoutubeLink(videoUrl) ? (
          this.renderYoutubeVideo(videoUrl)
        ) : (
          <Player ref="player" autoPlay={true}>
            <source src={videoUrl +"#t=" + secondsAfterStartTime } />
            <BigPlayButton position="center" />

            <div style={{position: 'absolute', right: '30px', bottom: '80px', width: '300px'}}>
              {this.renderLeaderboard()}
            </div>

            <ControlBar autoHide={false} disableDefaultControls>
              <PlayToggle />
              <VolumeMenuButton />
              <FullscreenToggle />
            </ControlBar>
          </Player>
        )}
      </div>
    )

  }

  isYoutubeLink(videoUrl) {
    return videoUrl.includes("youtube")
  }

  renderYoutubeVideo(videoUrl) {
    return (
      <FixedAspectRatio ratio={'560:315'}>
        <iframe
          width={'100%'}
          height={'100%'}
          // style={{pointerEvents: 'none'}}
          src={videoUrl + '?autoplay=1&mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent'}
          frameBorder="0"
          // allow="autoplay; encrypted-media"
          sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
          allowFullScreen
        />
      </FixedAspectRatio>
    )
  }

  handleFullScreen() {
    let elem = document.getElementById("youtubeVideo");
    this.launchIntoFullscreen(elem);
  }

  launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  // TODO: MOVE TO UTILITY OR SERVICE FILE
  capitalizeAllLetters(string) {
    return string.toUpperCase();
  }

  // TODO: MOVE TO UTILITY OR SERVICE FILE
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  calculateVideoHeight(width) {
    return width * 315 / 560;
  }

  toggleVideoSize() {
    if (this.state.isFullScreen) {
      this.setState({
        width: '560px',
        height: '315px',
        isFullScreen: false
      });
    } else {
      this.setState({
        width: '1120px',
        height: '630px',
        isFullScreen: true
      });
    }
  }

}

