import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const HistoryChart = (props) => {
  const [labelData, setLabelData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let timestampArr = props.rawData.map((row) => row.timestamp.slice(0, 10));
    let openArr = props.rawData.map((row) => row.open);
    setLabelData([...timestampArr]);
    setChartData([...openArr]);
  }, [props.rawData]);

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
        data: chartData,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            reverse: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options}/>
    </div>
  );
};

export default HistoryChart;
