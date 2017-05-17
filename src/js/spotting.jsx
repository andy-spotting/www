import React from 'react';
import GoogleMapReact from 'google-map-react';
import Time from './time';
import { Marker, Dot } from './markers';

function Spotting(props) {
  const center = {
    lat: props.spotting.location.latitude,
    lng: props.spotting.location.longitude,
  };
  const zoom = 16;
  const key = { key: 'AIzaSyAqDtq-RrYVdlm8wSkjNAoSFLvd15_gVV4' };

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: '100px', left: 0 }}>
      <Time timestamp={props.spotting.timestamp} />
      <GoogleMapReact center={center} defaultZoom={zoom} bootstrapURLKeys={key}>
        <Marker
          lat={props.spotting.location.latitude}
          lng={props.spotting.location.longitude}
        />
        {props.userLocation &&
        <Dot
          lat={props.userLocation.latitude}
          lng={props.userLocation.longitude}
        />}
      </GoogleMapReact>
    </div>);
}

export default Spotting;
