import React from 'react';
import styles from './ErrorMessage.module.css';

/**
 * A basic error message UI component that displays an errorMessage passed as a prop
 * @param {*} props contains props.errorMessage a String with an error message
 */
const ErrorMessage = props => {
  let className;

  switch (props.type) {
    case 'large':
      className = styles.largeError;
      break;
    default:
      break;
  }
  return (<h3 className={className}>Error: {props.errorMessage}</h3>)
}

export default ErrorMessage;