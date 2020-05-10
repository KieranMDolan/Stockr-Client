import React from 'react';
import Container from 'react-bootstrap/container';
import ErrorModal from './ErrorModal/ErrorModal';
import styles from './Layout.module.css';


const Layout = props => {
  return (
    <Container className={styles.container}>
      <ErrorModal {...props}/>
      {props.children}
    </Container>
  )

}

export default Layout;