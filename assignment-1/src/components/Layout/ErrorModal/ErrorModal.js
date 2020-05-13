import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * A component that superimposes an error modal over the currently shown component rendered within
 * Router
 * @param {*} props
 */
const ErrorModal = (props) => {

  /**
   * Handles closing of the error modal
   */
  const handleClose = () => {
    let updatedError ={...props.loginError};
    updatedError.isError = false;
    props.setLoginError({...updatedError});
  };

  return (
    <Modal show={props.loginError.isError} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.loginError.errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
