import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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

  // if loading empty variable, else card with stock details
  let stockInfo = loading
    ? null
    : 
       <Card>
         <Card.Header>
           <Card.Title>{stock.name} - {stock.symbol}</Card.Title>
         </Card.Header>
         <ListGroup className="list-group-flush">
           <ListGroup.Item>Date: {stock.timestamp.slice(0, 10)}</ListGroup.Item>
           <ListGroup.Item>Open: {stock.open}</ListGroup.Item>
           <ListGroup.Item>Close: {stock.close}</ListGroup.Item>
           <ListGroup.Item>High: {stock.high}</ListGroup.Item>
           <ListGroup.Item>Low: {stock.low}</ListGroup.Item>
           <ListGroup.Item>Volume: {stock.volumes}</ListGroup.Item>
           <ListGroup.Item>Industry: {stock.industry}</ListGroup.Item>
         </ListGroup>
       </Card> 
      ;

  return (
    <div>
      {stockInfo}
    </div>
  );
};

export default StockCard;
