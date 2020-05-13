import React, { useEffect, useState, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

const DATE_MIN = '2019-11-06';
const DATE_MAX = '2020-03-24';

const HistoryFilter = (props) => {
  const [stocks, setStocks] = useState([]);
  let [selectedStock, setSelectedStock] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch('http://131.181.190.87:3000/stocks/symbols')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let stocksArr = getNamesSymbols(data);
        setStocks(stocksArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getNamesSymbols = (data) => {
    let results = [];
    data.forEach((stock) => {
      results.push({ name: stock.name, symbol: stock.symbol });
    });
    return results;
  };

  const onSelect = (event) => {
    setSelectedStock(event.target.value);
    let valueSplitArr = event.target.value.split(' ');
    let path = '/history/' + valueSplitArr[valueSplitArr.length - 1];
    history.push(path);
    window.location.reload();
  };

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="stock">Stock</Form.Label>
          <Form.Control
            name="stock"
            as="select"
            value={selectedStock}
            onChange={onSelect}
          >
            <option default>Change the selected Stock</option>
            {stocks.map((stock) => (
              <option key={stock.symbol}>
                {stock.name} - {stock.symbol}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <Form>
        <Form.Row>
          <Form.Group>
            <Form.Label htmlFor="from">From</Form.Label>
            <Form.Control
              type="date"
              name="from"
              min={DATE_MIN}
              max={props.dates.to}
              onChange={props.handleChange}
              value={props.dates.from}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="to">To (Non-Inclusive)</Form.Label>
            <Form.Control
              type="date"
              name="to"
              min={props.dates.from}
              max={DATE_MAX}
              onChange={props.handleChange}
              value={props.dates.to}
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </Fragment>
  );
};

export default HistoryFilter;
