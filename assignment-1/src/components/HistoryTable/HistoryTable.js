import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import HistoryChart from '../HistoryChart/HistoryChart';
import TimestampRenderer from './Renderers/TimestampRenderer';

const API_URL = 'http://131.181.190.87:3000';
const DATE_START = '2019-11-06';
const DATE_END = '2020-03-24';
let SYMBOL = 'AAL';

const HistoryTable = (props) => {
  const [error, setError] = useState(false);
  const [dates, setDates] = useState({ from: DATE_START, to: DATE_END });

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
      width: 100,
    },
  ]);

  // set the framework components for cell rendering
  const frameworkComponents = {
    timestampRenderer: TimestampRenderer,
  };

  // initialise the state hooks for the table's row data
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getPriceHistory(SYMBOL);
  }, []);

  useEffect(() => {
    getPriceHistory(SYMBOL);
  }, [dates]);

  const handleErrors = (response) => {
    if (response.error) {
      throw Error(response.message);
    } else {
      return response;
    }
  };

  const getPriceHistory = (symbol) => {
    // const url = `${API_URL}/stocks/authed/${symbol}?from=2020-03-15T00%3A00%3A00.000Z&to=2020-03-20T00%3A00%3A00.000Z`;
    // const url = `${API_URL}/stocks/authed/${symbol}?from=${dates.from}${PARSE_TIME_STRING}&to=${dates.to}${PARSE_TIME_STRING}`;
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
        setRowData(res);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
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

  return (
    <div>
      <form>
        <label htmlFor="from">From:</label>
        <input
          type="date"
          name="from"
          min="2019-11-06"
          max={dates.to}
          onChange={handleChange}
          value={dates.from}
        />
        <label htmlFor="to">To:</label>
        <input
          type="date"
          name="to"
          min={dates.from}
          max="2020-03-24"
          onChange={handleChange}
          value={dates.to}
        />
      </form>
      <div
        className="ag-theme-balham"
        style={{ height: '500px', width: '500px' }}
      >
        {error ? null : (
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            frameworkComponents={frameworkComponents}
          ></AgGridReact>
        )}
      </div>
      <HistoryChart rawData={rowData} />
    </div>
  );
};

export default HistoryTable;
