import React, { Fragment } from 'react';
import StocksTable from '../../components/StocksTable/StocksTable';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Stocks = (props) => {
  return (
    <Fragment>
      <Jumbotron>
      <h1>Stocks page</h1>
      <p>Click on a stock to access detailed data and historical records</p>
      </Jumbotron>
      <StocksTable />
    </Fragment>
  )
};

export default Stocks;
