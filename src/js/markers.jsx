import React from 'react';

export function Marker() {
  return (
    <div style={{ height: '55px', width: '31px', marginTop: '-55px', marginLeft: '-15px' }}>
      <i className="fa fa-map-pin fa-5x" style={{ color: '#b71c1c' }} />
    </div>);
}

export function Dot() {
  return (
    <div style={{ height: '11px', width: '9px', marginTop: '-5px', marginLeft: '-4px' }}>
      <i className="fa fa-dot-circle-o" style={{ color: '#2196f3' }} />
    </div>);
}
