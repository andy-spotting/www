import React from 'react';
import moment from 'moment';

function Time(props) {
  const timeSince = moment(props.timestamp).fromNow();
  return <div id="time">{timeSince}</div>;
}

export default Time;
