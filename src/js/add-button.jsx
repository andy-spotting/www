import React from 'react';
import 'whatwg-fetch';

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    if (!e.target.files[0]) return;

    this.setState({ uploading: true });

    const body = new FormData();
    body.append('photo', e.target.files[0]);
    if (this.props.userLocation) {
      body.append('latitude', this.props.userLocation.latitude);
      body.append('longitude', this.props.userLocation.longitude);
    }

    fetch('https://api.andyspotting.com/spottings', { method: 'POST', body })
      .then(response => response.json())
      .then((spotting) => {
        this.props.onUploadComplete(spotting);
        this.setState({ uploading: false });
      })
      .catch((err) => {
        this.setState({ uploading: false });
        alert('Something went wrong!');
        console.error(err);
      });
  }

  render() {
    const icon = this.state.uploading ? 'fa fa-spinner fa-spin' : 'fa fa-camera';

    return (
      <div id="addBtnWrapper">
        <div id="addBtn">
          <i className={icon} />
          <input type="file" id="fileinput" onChange={this.handleChange} />
        </div>
      </div>);
  }
}

export default AddButton;
