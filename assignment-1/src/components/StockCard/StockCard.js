import React, { useEffect, useState } from 'react';

const StockCard = (props) => {
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStockToSymbol();
  }, []);

  function setStockToSymbol() {
    fetch('http://131.181.190.87:3000/stocks/' + props.symbol)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStock(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  let stockInfo = loading
    ? null
    : [
        <h3>{stock.timestamp}</h3>,
        <h3>{stock.symbol}</h3>,
        <h3>{stock.name}</h3>,
        <h3>{stock.industry}</h3>,
        <h3>{stock.open}</h3>,
        <h3>{stock.high}</h3>,
        <h3>{stock.low}</h3>,
        <h3>{stock.close}</h3>,
        <h3>{stock.volume}</h3>,
      ];
  return (
    <div>
      {stockInfo}
    </div>
  );
};

export default StockCard;
