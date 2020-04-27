import React, { useState } from 'react';

// state should have a string that can be used for industry searches in the API
const StocksFilter = (props) => {
  // industry query string
  const [selection, setSelection] = useState('');
  // true if no selections have occurred
  const [cleared, setCleared] = useState('true');

  function handleSelection(event) {
    setSelection(event.target.value);
    console.log(selection);
  }

  // list of industries designed to keep up to date with API if new industries entered
  // in future
  function getIndustries() {
    let industryArray = [];
    props.rowData.forEach((row) => {
      if (!industryArray.includes(row.industry)) {
        industryArray.push(row.industry);
      }
    });
    return industryArray;
  }
  // store industries in an array
  let industryArray = getIndustries();

  // DEBUG
  console.log(industryArray);

  let radioButtons = industryArray.map((industry) => {
    let labelStr = industry.charAt(0).toUpperCase() + industry.slice(1);
    return (
      <div>
        <input type="radio" name="industry" value={industry} />
        <label htmlFor={industry}>{labelStr}</label>
      </div>
    );
  });

  return (
    <form onSubmit={handleSelection}>
      <label>
        Filter by Industry
        {radioButtons}
        <button type="submit">Apply Filters</button>
      </label>
    </form>
  );
};

export default StocksFilter;
