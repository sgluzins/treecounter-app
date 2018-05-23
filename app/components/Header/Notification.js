import React, { Component } from 'react';
import { NotificationAction } from '../../actions/notificationAction';
import renderHTML from 'react-render-html';

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      schema: {}
    };
  }

  NotificationDisplay(myObject) {
    let msg = [];
    for (let [key, value] of Object.entries(myObject)) {
      msg.push(
        <li className="notification-group" key={key}>
          <div className="notification-tab">
            <i className="fas fa-user" />
            {renderHTML(value.message)}
          </div>
        </li>
      );
    }
    return msg;
  }

  componentWillMount() {
    NotificationAction().then(
      success => this.setState({ loading: false, schema: success.data }),
      error => console.log(error)
    );
  }

  render() {
    return this.state.loading ? (
      <ul style={widthStyle} />
    ) : (
      <ul className="notification-popover">
        {this.NotificationDisplay(this.state.schema)}
      </ul>
    );
  }
}

const widthStyle = { width: '244px' };
