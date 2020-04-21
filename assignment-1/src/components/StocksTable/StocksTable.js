import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const StocksTable = (props) => {
  // ag grid column names
  const [columnDefs] = useState([
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Symbol',
      field: 'symbol',
    },
    {
      headerName: 'Industry',
      field: 'industry',
    },
  ]);

  // to be filled with a stocks fetch request
  const [rowData, setRowData] = useState([]);

  // get stocks from API
  useEffect(() => {
    fetch('http://131.181.190.87:3000/stocks/symbols')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowData(data);
        // DEBUG
        console.log(data);
      })
      .catch((error) => {
        // DEBUG
        console.log('Error: ', error);
      });
  }, []);

  return (
    <div
      className="ag-theme-balham"
      style={{ height: '500px', width: '600px' }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
    </div>
  );
};

export default StocksTable;
