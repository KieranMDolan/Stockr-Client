import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import StocksListImg from '../../assets/stock-exchange-board.jpg';
import GraphImg from '../../assets/blue-and-yellow-graph.jpg';
import AppImg from '../../assets/trading-app.jpg';

import styles from './Landing.module.css';

/**
 * The landing component rendered within the home component. Displays a three item carousel on the
 * page, each with an image, header level text and a subtext
 * @param {*} props 
 */
const Landing = (props) => {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item>
        <img className="d-block w-100" src={StocksListImg} alt="First slide" />
        <Carousel.Caption>
          <h3>Browse Stocks</h3>
          <p>Filter our premium selection of stocks by industry or keyword</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={GraphImg} alt="Third slide" />

        <Carousel.Caption>
          <h3>Recent Stock Reports</h3>
          <p>
            Get all the information you need from our most recent stock data by
            clicking on a stock!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={AppImg} alt="Third slide" />

        <Carousel.Caption>
          <h3>Detailed Stock Histories</h3>
          <p>Get a detailed look at historical records of a selected stock.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Landing;
