import React from 'react';
import Logo from './logo';
import SpottingList from './spotting-list';
import AddButton from './add-button';
import Spotting from './spotting';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spottings: props.spottings,
      selectedSpotting: props.spottings[0],
      userLocation: null,
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleUploadComplete = this.handleUploadComplete.bind(this);
    this.updateUserLocation = this.updateUserLocation.bind(this);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.updateUserLocation);
    }
  }

  updateUserLocation(position) {
    this.setState({ userLocation: position.coords });
  }

  handleSelection(selectedSpotting) {
    this.setState({ selectedSpotting });
  }

  handleUploadComplete(newSpotting) {
    this.setState(prevState => ({
      spottings: [newSpotting].concat(prevState.spottings),
      selectedSpotting: newSpotting,
    }));
  }

  render() {
    return (
      <div id="app" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
        <Logo />
        <Spotting
          spotting={this.state.selectedSpotting}
          userLocation={this.state.userLocation}
        />
        <SpottingList
          spottings={this.state.spottings}
          onSelection={this.handleSelection}
        />
        <AddButton
          onUploadComplete={this.handleUploadComplete}
          userLocation={this.state.userLocation}
        />
      </div>);
  }
}

export default App;
