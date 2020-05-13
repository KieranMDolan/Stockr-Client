import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import HistoryChart from './HistoryChart/HistoryChart';
import TimestampRenderer from './Renderers/TimestampRenderer';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import styles from './HistoryTable.module.css';
import HistoryFilter from './HistoryFilter/HistoryFilter';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const API_URL = 'http://131.181.190.87:3000';
const DATE_START = '2019-11-06';
const DATE_END = '2020-03-24';

/**
 * A component that encompasses the table, filter and charting functions within a single tabbed
 * Boostrap card.
 * @param {*} props
 */
const HistoryTable = (props) => {
  // error state
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // determines date range
  const [dates, setDates] = useState({ from: DATE_START, to: DATE_END });
  // determines current 'tab' being displayed
  const [tab, setTab] = useState('Table');
  // initialise the state hooks for the table's row data
  const [rowData, setRowData] = useState([]);

  // Define the column properties for the ag-grid table
  const [columnDefs] = useState([
    {
      headerName: 'Timestamp',
      field: 'timestamp',
      sortable: true,
      filter: true,
      width: 100,
      cellRenderer: 'timestampRenderer',
    },
    {
      headerName: 'Open',
      field: 'open',
      sortable: true,
      filter: true,
      width: 75,
    },
    {
      headerName: 'Close',
      field: 'close',
      sortable: true,
      filter: true,
      width: 75,
    },
    {
      headerName: 'High',
      field: 'high',
      sortable: true,
      filter: true,
      width: 75,
    },
    {
      headerName: 'Low',
      field: 'low',
      sortable: true,
      filter: true,
      width: 75,
    },

    {
      headerName: 'Volume',
      field: 'volumes',
      sortable: true,
      filter: true,
      width: 99,
    },
  ]);

  // set the framework components for cell rendering
  const frameworkComponents = {
    timestampRenderer: TimestampRenderer,
  };

  // get price history data from the API on componet mounting
  useEffect(() => {
    getPriceHistory(props.symbol);
  }, [dates]);

  /**
   * Handles errors in a fetch.then() method chain. If error encountered, clears rowData and stores
   * error response in state variables.
   * @param {*} response 
   * @returns Error if error is encountered, response if not
   */
  const handleErrors = (response) => {
    if (response.error) {
      setError(true);
      setErrorMessage(response.message);
      setRowData([]);
      throw Error(response.message);
    } else {
      return response;
    }
  };

  /**
   * Makes an API call to the stocks/authed/{symbol} endpoint and stores the data in the rowData
   * variable
   * @param {*} symbol 
   */
  const getPriceHistory = (symbol) => {
    const url = `${API_URL}/stocks/authed/${symbol}?from=${dates.from}&to=${dates.to}`;
    const token = localStorage.getItem('token');
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return fetch(url, { headers })
      .then((res) => res.json())
      .then(handleErrors)
      .then((res) => {
        setError(false);
        setRowData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Handles changes to the to and from form inputs, binding their values to state.
   * @param {*} event 
   */
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'from':
        setDates({ ...dates, from: event.target.value });
        break;
      case 'to':
        setDates({ ...dates, to: event.target.value });
        break;
      default:
        break;
    }
  };

  // variable that allow for conditional rendering of content depending upon which 'tab' is chosen
  const tabJSX = (
    <div>
      {tab === 'Table' ? (
        <div className={'ag-theme-balham ' + styles.table}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            frameworkComponents={frameworkComponents}
          ></AgGridReact>
        </div>
      ) : null}
      {tab === 'Chart' ? <HistoryChart rawData={rowData} /> : null}
    </div>
  );

  /**
   * Handles clicking on a tab, setting the tab state variable to the clicked tab
   * @param {*} tabName 
   */
  const handleClick = (tabName) => {
    switch (tabName) {
      case 'Table':
        setTab(tabName);
        break;
      case 'Chart':
        setTab(tabName);
        break;
      default:
        break;
    }
  };

  /**
   * Handles close for error modal
   */
  const handleClose = () => {
    setError(false);
  };

  return (
    <div>
      {/* Error Modal to show error messages to the user */}
      <Modal show={error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage === 'jwt malformed'
            ? 'You must be logged in for that'
            : errorMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Card containing the filter component and conditionally rendered chart or table component */}
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link
                href="#first"
                onClick={() => {
                  handleClick('Table');
                }}
              >
                Table
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="#link"
                onClick={() => {
                  handleClick('Chart');
                }}
              >
                Chart
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <HistoryFilter
            symbol={props.symbol}
            dates={dates}
            handleChange={handleChange}
          />
          {tabJSX}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HistoryTable;
