/**
 * Cell renderer to display timestamp in a more user friendly format of 'YYYY-MM-DD'
 * @param {*} props 
 */
const TimestampRenderer = props => {
  let dateValue = props.node.data.timestamp.slice(0, 10);
  return (dateValue)
}

export default TimestampRenderer;