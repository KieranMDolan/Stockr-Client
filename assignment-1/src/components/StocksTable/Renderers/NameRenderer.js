import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A cell renderer that will alter a name field in the stocks table into a link to the single stock
 * view of that particular stock.
 * @param {*} props 
 */
const NameRenderer = props => {
  // get current row node's symbol for creating the link route
  let linkValue = "/stocks/" + props.node.data.symbol;
  return (<Link to={linkValue}>{props.value}</Link>)
}

export default NameRenderer;