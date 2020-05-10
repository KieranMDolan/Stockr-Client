import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import styles from './StockCard.module.css';
import { useHistory } from 'react-router-dom';

const StockCard = (props) => {
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    setStockToSymbol();
  }, []);

  const handleErrors = (response) => {
    if (response.error) {
      setError(true);
      setErrorMessage(response.message);
      throw Error(response.message);
    } else {
      return response;
    }
  };

  function setStockToSymbol() {
    fetch('http://131.181.190.87:3000/stocks/' + props.symbol)
      .then((response) => {
        return response.json();
      })
      .then((res) => handleErrors(res))
      .then((data) => {
        setStock(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  const routeChangeHistory = () => {
    let path = '/history/' + props.symbol;
    history.push(path);
  };

  // if loading empty variable, else card with stock details
  let stockInfo = loading ? null : (
    <Card className={styles.card}>
      <Card.Header>
        <Card.Title>
          {stock.name} - {stock.symbol}
        </Card.Title>
      </Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Date: {stock.timestamp.slice(0, 10)}</ListGroup.Item>
        <ListGroup.Item>Open: {stock.open}</ListGroup.Item>
        <ListGroup.Item>Close: {stock.close}</ListGroup.Item>
        <ListGroup.Item>High: {stock.high}</ListGroup.Item>
        <ListGroup.Item>Low: {stock.low}</ListGroup.Item>
        <ListGroup.Item>Volume: {stock.volumes}</ListGroup.Item>
        <ListGroup.Item>Industry: {stock.industry}</ListGroup.Item>
        <ListGroup.Item>
          <Button variant="primary" onClick={routeChangeHistory}>
            Price History
          </Button>{' '}
          For custom date ranges and charting
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
  return (
    <div>
      {error ? <ErrorMessage errorMessage={errorMessage} /> : stockInfo}
    </div>
  );
};

export default StockCard;
