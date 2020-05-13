import React from 'react';
import Landing from '../../components/Landing/Landing';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import styles from './Home.module.css';

/**
 * The component rendered on the base/index route of the page
 */
const Home = () => {
  return (
    <Container>
      <Jumbotron className={styles.jumbotron}>
        <h1>Welcome to Stockr</h1>
        <h3>The one stock shop for all your stock needs</h3>
      </Jumbotron>
      <Landing  />
    </Container>
  )
}

export default Home;