import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

/**
 * Component containing the charted price history data
 * @param {*} props rawData is the data set returned from a stocks/authed/{symbol} endpoint call
 */
const HistoryChart = (props) => {
  // state variables for data sets
  const [labelData, setLabelData] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [closeData, setCloseData] = useState([]);
  const [highData, setHighData] = useState([]);
  const [lowData, setLowData] = useState([]);

  // on change of returned endpoint data
  useEffect(() => {
    // map through raw data and create arrays containing only single data types
    let timestampArr = props.rawData.map((row) => row.timestamp.slice(0, 10));
    let openArr = props.rawData.map((row) => row.open);
    let closeArr = props.rawData.map((row) => row.close);
    let highArr = props.rawData.map((row) => row.high);
    let lowArr = props.rawData.map((row) => row.low);
    // store this data in appropraite state variable
    setLabelData([...timestampArr]);
    setOpenData([...openArr]);
    setCloseData([...closeArr]);
    setHighData([...highArr]);
    setLowData([...lowArr]);
  }, [props.rawData]);

  // Set datasets for each data set to be charted
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Opening Stock Prices',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: openData,
      },
      {
        label: 'Closing Stock Prices',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(192,75,192,0.4)',
        borderColor: 'rgba(192,75,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(192,75,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(192,75,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: closeData,
      },
      {
        label: 'Daily Stock High',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(192,192,75,0.4)',
        borderColor: 'rgba(192,192,75,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(192,192,75,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(192,192,75,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: highData,
      },
      {
        label: 'Daily Stock Low',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(192,192,192,0.4)',
        borderColor: 'rgba(192,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(192,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(192,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: lowData,
      },
    ],
  };

  // Set options for charting
  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            // for left to right date ordering
            reverse: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoryChart;
