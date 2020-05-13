import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import styles from './StocksFilter.module.css';

/**
 * A component used to filter data on the stocks table.
 * @param {*} props
 */
const StocksFilter = (props) => {
  // state variables to store/set if industry filters should show
  const [filterExpanded, setFilterExpanded] = useState(false);
  // state variables to store/set the keyword search term
  const [keywordValue, setKeywordValue] = useState('');

  /**
   * Handles the binding of the radio button event value to the selection state passed down in props
   * @param {*} event
   */
  function handleSelection(event) {
    // handle 'none' radio button
    if (event.target.value === 'None') {
      props.setSelection('');
    } else {
      props.setSelection(event.target.value);
    }
    // reset search term filter to blank
    props.setFiltered(false);
    setKeywordValue('');
  }

  /**
   * Handles the keyword search that occurs on data entry in the keyword form input
   * @param {*} event
   */
  function handleKeywordSearch(event) {
    setKeywordValue(event.target.value);
    filterByKeyword(event.target.value);
    if (event.target.value !== '') {
      props.setFiltered(true);
    } else {
      props.setFiltered(false);
    }
  }

  /**
   * Modify rowData and store in filteredRowData's state according to if it includes a search term
   * anywhere within the name symbol or industry. Search term is case sensitive.
   * @param {*} keyword
   */
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

  // Radio inputs programatically created from industryArray
  let radioButtons = industryArray.map((industry) => {
    return (
      <Form.Check
        type="radio"
        name="industry-radios"
        id={industry}
        value={industry}
        key={industry}
        label={industry}
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
