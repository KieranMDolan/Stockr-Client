import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import styles from './StocksFilter.module.css';


const StocksFilter = (props) => {
  // state variables to store/set if industry filters should show
  const [filterExpanded, setFilterExpanded] = useState(false);
  // state variables to store/set the keyword search term
  const [keywordValue, setKeywordValue] = useState('');

  function handleSelection(event) {
    if (event.target.value === 'None') {
      props.setSelection('');
    } else {
      props.setSelection(event.target.value);
    }
    props.setFiltered(false);
    setKeywordValue('');
  }

  function handleKeywordSearch(event) {
    setKeywordValue(event.target.value);
    filterByKeyword(event.target.value);
    if (event.target.value !== '') {
      props.setFiltered(true);
    } else {
      props.setFiltered(false);
    }
  }

  // filter rowData according to a keyword
  function filterByKeyword(keyword) {
    let filteredData = props.rowData.filter((row) => {
      return (
        row.name.includes(keyword) ||
        row.symbol.includes(keyword) ||
        row.industry.includes(keyword)
      );
    });
    props.setFilteredRowData([...filteredData]);
  }

  // store industries in an array
  const industryArray = [
    'None',
    'Health Care',
    'Industrials',
    'Consumer Discretionary',
    'Information Technology',
    'Consumer Staples',
    'Utilities',
    'Financials',
    'Real Estate',
    'Materials',
    'Energy',
    'Telecommunication Services',
  ];

  let radioButtons = industryArray.map((industry) => {
    let labelStr = industry.charAt(0).toUpperCase() + industry.slice(1);

    return (
      <Form.Check
        type="radio"
        name="industry-radios"
        id={industry}
        value={industry}
        key={industry}
        label={labelStr}
        onChange={handleSelection}
      />
    );
  });

  return (
    <div>
      <Container>
        <Form className={styles.radioFilter}>
          <Form.Label onClick={() => setFilterExpanded(!filterExpanded)}>
            Filter by Industry{filterExpanded ? '-' : '+'}
          </Form.Label>
          {filterExpanded ? radioButtons : null}
        </Form>
      </Container>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="keyword">Search by Keyword</Form.Label>
            <Form.Control
              value={keywordValue}
              name="keyword"
              type="text"
              onChange={handleKeywordSearch}
            />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default StocksFilter;
