import React from 'react';
import { Link } from 'react-router-dom';

const NameRenderer = props => {
  // current row node's symbol for routing
  let linkValue = "/stocks/" + props.node.data.symbol;
  return (<Link to={linkValue}>{props.value}</Link>)
}

export default NameRenderer;