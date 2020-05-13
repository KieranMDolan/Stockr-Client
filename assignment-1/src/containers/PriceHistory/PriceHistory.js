import React from 'react';
import HistoryTable from '../../components/HistoryTable/HistoryTable';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

/**
 * The container component for the Price History page
 * @param {*} param0 passed to this component via react router
 */
const PriceHistory = ({ match }) => {
  return (
    <Container fluid>
      <Jumbotron>
        <h1>Price History: {match.params.symbol}</h1>
        <p>Tabulated historical stock data and charting</p>
      </Jumbotron>
      <HistoryTable symbol={match.params.symbol} />
    </Container>
  );
};

export default PriceHistory;
