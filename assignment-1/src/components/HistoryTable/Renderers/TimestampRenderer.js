import React from 'react';

const TimestampRenderer = props => {
  let dateValue = props.node.data.timestamp.slice(0, 10);
  return (dateValue)
}

export default TimestampRenderer;