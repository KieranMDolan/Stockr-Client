import React, { Fragment } from 'react';
import StocksTable from '../../components/StocksTable/StocksTable';

const Stocks = (props) => {
  return (
    <Fragment>
      <h1>Stocks page</h1>
      <StocksTable />
    </Fragment>
  )
};

export default Stocks;
