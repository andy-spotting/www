import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import App from './app';
import '../scss/style.scss';

fetch('https://api.andyspotting.com/spottings')
  .then(response => response.json())
  .then((spottings) => {
    ReactDOM.render(
      <App spottings={spottings} />,
      document.getElementById('root'),
    );
  })
  .catch(console.error);
