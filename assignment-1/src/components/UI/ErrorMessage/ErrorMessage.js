import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = props => {
  let className;

  switch (props.type) {
    case 'large':
      className = styles.largeError;
      break;
    default:
      break;
  }
  return (<h3 className={styles.largeError}>Error: {props.errorMessage}</h3>)
}

export default ErrorMessage;