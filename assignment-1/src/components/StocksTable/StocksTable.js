import React, { useState, useEffect, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import NameRenderer from './Renderers/NameRenderer';
import StocksFilter from './StocksFilter/StocksFilter';

const StocksTable = (props) => {
  // Define the column properties
  const [columnDefs] = useState([
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      filter: true,
      cellRenderer: 'nameRenderer',
    },
    {
      headerName: 'Symbol',
      field: 'symbol',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Industry',
      field: 'industry',
      sortable: true,
      filter: true,
    },
  ]);

  // initialise the state hooks for the table's row data
  const [rowData, setRowData] = useState([]);

  // set the framework components for cell rendering
  const frameworkComponents = {
    nameRenderer: NameRenderer,
  };

  // get stocks from API when component mounts
  useEffect(() => {
    setDefaultRowData();
  }, []);

  // fetch all stocks and set state
  function setDefaultRowData() {
    fetch('http://131.181.190.87:3000/stocks/symbols')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  // fetch stocks with a certain industry
  function setIndustryRowData(industryString) {
    fetch(
      'http://131.181.190.87:3000/stocks/symbols?industry=' + industryString
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  return (
    <Fragment>
      <div>
        <StocksFilter rowData={rowData}/>
      </div>
      <div
        className="ag-theme-balham"
        style={{ height: '500px', width: '600px' }}
      >
        <button onClick={() => setIndustryRowData('Information Technology')}>
          Information Technology Industry Only
        </button>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
        ></AgGridReact>
      </div>
    </Fragment>
  );
};

export default StocksTable;
