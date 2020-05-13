import React, { useState, useEffect, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import NameRenderer from './Renderers/NameRenderer';
import StocksFilter from './StocksFilter/StocksFilter';
import Card from 'react-bootstrap/Card';
import styles from './StocksTable.module.css';

/**
 * A component that displays a table with data populated by the API endpoint stocks/symbols
 * @param {*} props
 */
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

  // state hooks to store filtered data
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [filtered, setFiltered] = useState(false);

  // set the framework components for cell rendering
  const frameworkComponents = {
    nameRenderer: NameRenderer,
  };

  // get stocks from API when component mounts
  useEffect(() => {
    setDefaultRowData();
  }, []);

  /**
   * Retrieve data from the stocks/symbols endpoint with no paramters
   */
  function setDefaultRowData() {
    fetch('http://131.181.190.87:3000/stocks/symbols')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((innerError) => {
        console.log(innerError);
      });
  }

  /**
   * Fetch stocks data from stocks/symbols endpoint using an industry parameter
   * @param {string} industryString the parameter to be used in the API call
   */
  function setIndustryRowData(industryString) {
    if (industryString === '') {
      setDefaultRowData();
      return;
    }

    fetch(
      'http://131.181.190.87:3000/stocks/symbols?industry=' + industryString
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <StocksFilter
            rowData={rowData}
            setRowData={setRowData}
            filteredRowData={filteredRowData}
            setFilteredRowData={setFilteredRowData}
            filtered={filtered}
            setFiltered={setFiltered}
            setSelection={setIndustryRowData}
          />
          <div className={'ag-theme-balham ' + styles.gridTable} key="tableDiv">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={filtered ? filteredRowData : rowData}
              frameworkComponents={frameworkComponents}
            ></AgGridReact>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default StocksTable;
