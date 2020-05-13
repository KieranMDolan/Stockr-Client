import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

/**
 * A container component displayed when a route cannot be matched to another container
 */
const NoMatch = () => {
  return (
    <Container>
      <Jumbotron>
        <h1>Page Not Found</h1>
        <h3>The page you have tried to reach can not be found</h3>
      </Jumbotron>
    </Container>
  );
};

export default NoMatch;
