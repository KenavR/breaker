import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import Config from '../config';

import SidebarRoomRoom from './SidebarRoom';
import { SidebarActiveRoom } from './SidebarActiveRoom';

import { scrollToRoomNameReset } from '../redux/actions/scroll-actions';
import { getSidebarOpen, getScrollToRoomName } from '../redux/selectors/ui-selectors';
import { getAllRooms, getCurrentRoom, getCurrentRoomStyles } from '../redux/selectors/rooms-selectors';
import { getAllActiveRooms } from '../redux/selectors/active-rooms-selector';


class Sidebar extends Component {
  componentDidUpdate() {
    if (this.props.scrollToRoomName) {
      const roomList = ReactDOM.findDOMNode(this.refs.roomList);
      const scrollTo = ReactDOM.findDOMNode(this.refs[this.props.scrollToRoomName]);
      roomList.scrollTop = scrollTo.offsetTop;
      this.props.resetScrollToRoomName();
    }
  }

  renderYourRooms() {
    const sidebarColor = this.props.room.getIn(['styles', 'sidebarTextColor']);
    const yourRoomsStyles = { color: sidebarColor };
    return (
      <ul id="roomlist" className="nav">
        <li key="your-rooms" className="hidden-folded padder m-t m-b-sm text-muted text-xs">
          <span style={yourRoomsStyles}>Your Rooms</span>
        </li>
        {
          this.props.roomList.toArray().map((room) => {
            return (
                <SidebarRoomRoom key={room.get('name')}
                                 ref={room.get('name')}
                                 room={room}
                                 active={room.get('name') === this.props.roomName}
                                 styles={this.props.styles}
                />
            );
          })
        }
      </ul>
    );
  }

  renderActiveRooms() {
    const sidebarColor = this.props.room.getIn(['styles', 'sidebarTextColor']);
    const activeRoomsStyles = { color: sidebarColor };
    const moreBtnStyles = { paddingLeft: "40px", margin: 0 }

    return (
        <ul id="roomlist" className="nav">
          <li key="active-rooms" className="hidden-folded padder m-t m-b-sm text-muted text-xs">
            <span style={activeRoomsStyles}>Active Rooms</span>
          </li>
          {
            this.props.activeRoomList.toArray().map((room) => {
              return (
                  <SidebarActiveRoom key={room.get('name')}
                                   room={room}
                                   styles={this.props.styles}
                  />
              );
            })
          }
          <li className="hidden-folded m-t m-b-sm text-muted" style={moreBtnStyles}>
            <a><b>+ more</b></a>
          </li>
        </ul>
    );
  }

  render() {
    const styles = Config.styles.getSidebarColorForRoom(this.props.room);

    let classes = 'app-aside hidden-xs bg-dark';
    if (this.props.open) {
      classes += ' off-screen';
    }

    return (
      <aside id="aside" className={classes} style={styles}>
        <div className="aside-wrap">
          <div className="navi-wrap" ref="roomList">
            <nav ui-nav className="navi clearfix">
              {this.renderYourRooms()}
              {this.renderActiveRooms()}
            </nav>
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.defaultProps = {
  open: false,
  styles: Immutable.Map(),
  room: Immutable.Map(),
  roomName: null,
  roomList: Immutable.Map(),
  scrollToRoomName: null,
  resetScrollToRoomName: () => {}
};

function mapStateToProps(state) {
  return {
    open: getSidebarOpen(state),
    styles: getCurrentRoomStyles(state),
    room: getCurrentRoom(state),
    roomName: state.get('currentRoom'),
    roomList: getAllRooms(state),
    activeRoomList: getAllActiveRooms(state),
    scrollToRoomName: getScrollToRoomName(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetScrollToRoomName() {
      dispatch(scrollToRoomNameReset());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
