import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import HistoryChart from './HistoryChart/HistoryChart';
import TimestampRenderer from './Renderers/TimestampRenderer';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import styles from './HistoryTable.module.css';
import HistoryFilter from './HistoryFilter/HistoryFilter';

const API_URL = 'http://131.181.190.87:3000';
const DATE_START = '2019-11-06';
const DATE_END = '2020-03-24';

const HistoryTable = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dates, setDates] = useState({ from: DATE_START, to: DATE_END });
  const [tab, setTab] = useState('Table');

  // Define the column properties
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

  // initialise the state hooks for the table's row data
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getPriceHistory(props.symbol);
  }, []);

  useEffect(() => {
    getPriceHistory(props.symbol);
  }, [dates]);

  const handleErrors = (response) => {
    if (response.error) {
      setError(true);
      setErrorMessage(response.message);
      throw Error(response.message);
    } else {
      return response;
    }
  };

  const getPriceHistory = (symbol) => {
    const url = `${API_URL}/stocks/authed/${symbol}?from=${dates.from}&to=${dates.to}`;
    console.log(url);
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

  const tabJSX = (
    <div>
      {tab === 'Table' ? (
        <div
          className={"ag-theme-balham " + styles.table}
        >
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

  return (
    <div>
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
          <HistoryFilter symbol={props.symbol} dates={dates} handleChange={handleChange} />
          {tabJSX}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HistoryTable;
