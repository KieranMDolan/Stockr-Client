import React from 'react';
import HistoryTable from '../../components/HistoryTable/HistoryTable';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const PriceHistory = ({ match }) => {
  return (
    <Container fluid>
      <Jumbotron>
        <h1>Price History</h1>
        <p>Select a stock for tabulated stock data and charting</p>
      </Jumbotron>
      <HistoryTable symbol={match.params.symbol} />
    </Container>
  );
};

export default PriceHistory;
