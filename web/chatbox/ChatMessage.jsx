import React, {Component} from 'react'
import Immutable from 'immutable'
import TimeAgo from 'react-timeago'


export default class ChatMessage extends Component {
  renderUserImage() {
    let userLink = `https://reddit.com/u/${this.props.user.get('username')}`;
    let profileImage = this.props.user.get('profileImageUrl');

    // TODO: seems like a hack here
    if (profileImage && profileImage.indexOf('user-anon') > -1){
      profileImage = '/public/img/user-anon.png';
    }

    return <a className="avatar thumb-sm pull-left m-r" href={userLink} target="_blank">
      <img src={profileImage} />
    </a>
  }
  renderTime() {
    return <div className="pull-right text-sm text-muted">
      <TimeAgo date={new Date(this.props.message.get('createDateLongUTC')).toISOString()} />
    </div>
  }
  getMockFlairForUser(props) {
    if(props.user.get('username') == 'mathent') {
      return Immutable.fromJS({
        nba: {
          flair_text: "[CLE] LeBron James",
          flair_css_class: "Cavaliers1"
        },
        breakerapp: {
          flair_text: "Dev",
          flair_css_class: ""
        }
      })
    } else if (props.user.get('username') == 'rickiibeta') {
      return Immutable.fromJS({
        nba: {
          flair_text: "[LAL] Nick Van Exel",
          flair_css_class: "Lakers2"
        },
        breakerapp: {
          flair_text: "Some user flair",
          flair_css_class: ""
        }
      })
    }

    return this.props.user.get('flair', Immutable.Map());
  }
  renderFlair() {
    let flairDoc = this.getMockFlairForUser(this.props);
    let flairSettings = flairDoc.get(this.props.roomName);
    if(!flairSettings){
      return null;
    }

    return <span className={`user-flair flair flair-${flairSettings.get('flair_css_class')}`} title={flairSettings.get('flair_text')}>{flairSettings.get('flair_text')}</span>
  }
  renderUsername() {
    let modClass = this.props.user.get('modForRoom') ? 'text-md text-primary-dker' : 'text-md text-dark-dker';
    return <div>
        <a className={modClass} href={`https://reddit.com/u/${this.props.user.get('username')}`} target="_blank">
          {this.props.user.get('username')}</a>
      {this.renderFlair()}
      </div>

  }
  renderMessage() {
    return <div className="message-body m-t-midxs" dangerouslySetInnerHTML={{__html: this.props.message.get('messageHtml')}}>
    </div>
  }
  renderLinks(){
    if(this.props.message.get('imageLinks', Immutable.List()).size > 0) {
      return <div className="m-t-sm">
        <a href={this.props.message.getIn(['imageLinks', 0])} target="_blank">
        <img src={this.props.message.getIn(['imageLinks', 0])} className="image-preview"/>
        </a>
      </div>;
    }

    return null;
  }
  render(){
    let liClasses = "chat-message-root list-group-item no-border p-t-s p-b-xs clearfix b-l-3x b-l-white";

    return (
      <li className={liClasses}>
        {this.renderUserImage()}
        {this.renderTime()}
        <div className="clear">
          {this.renderUsername()}
          {this.renderMessage()}
          {this.renderLinks()}
        </div>
      </li>
    )
  }
}

ChatMessage.defaultProps = {
  message: Immutable.Map(),
  user: Immutable.Map(),
  root: true
};
