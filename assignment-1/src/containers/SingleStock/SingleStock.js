import React from 'react';
import StockCard from '../../components/StockCard/StockCard';

const SingleStock = ( {match} ) => {
  return (
    <div>
      <h1>Single Stock Page</h1>
      <StockCard symbol={match.params.symbol} />
    </div>
  );
};

export default SingleStock;
