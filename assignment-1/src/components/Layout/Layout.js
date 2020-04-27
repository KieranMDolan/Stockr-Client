import React from 'react';
import Container from 'react-bootstrap/container';


const Layout = props => {
  return (
    <Container>
      {props.children}
    </Container>
  )

}

export default Layout;