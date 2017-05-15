import React from 'react';
import Thumb from './thumb';

function SpottingList(props) {
  const thumbs = props.spottings.map(spotting => (
    <Thumb key={spotting.id} spotting={spotting} onSelection={props.onSelection} />
  ));

  return (
    <div id="rail">
      <div id="thumbs">{thumbs}</div>
    </div>);
}

export default SpottingList;
