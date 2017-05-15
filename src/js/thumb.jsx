import React from 'react';
import moment from 'moment';

class Thumb extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onSelection(this.props.spotting);
  }

  render() {
    const timeSince = moment(this.props.spotting.timestamp).fromNow();
    const altText = `Andy spotted ${timeSince}.`;

    // thumb.dataset.lat = spotting.location.latitude;
    // thumb.dataset.lng = spotting.location.longitude;
    // thumb.dataset.timestamp = spotting.timestamp;
    // thumb.onclick = () => { dropPin(thumb.dataset); };

    return (
      <a href={`/view/${this.props.spotting.id}`} onClick={this.handleClick}>
        <img alt={altText} src={this.props.spotting.image} width="100" height="100" />
      </a>);
  }
}

export default Thumb;
