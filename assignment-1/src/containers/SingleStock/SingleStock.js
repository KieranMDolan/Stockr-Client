import React from 'react';
import StockCard from '../../components/StockCard/StockCard';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styles from './SingleStock.module.css';

/**
 * The container component rendered at the stocks/{symbol} route
 * @param {*} param0 the match values received from react-router
 */
const SingleStock = ( {match} ) => {
  return (
    <div>
      <Jumbotron className={styles.jumbotron}>
      <h1>Single Stock Page</h1>
      <p>A detailed look at our last recorded day of trading for this stock</p>
      </Jumbotron>
      <StockCard symbol={match.params.symbol} />
    </div>
  );
};

export default SingleStock;
