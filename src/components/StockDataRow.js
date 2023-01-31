const StockDataRow = (props) => {
 const rowClickHandler = (event) =>{
  console.log(event.currentTarget.firstChild);
  const ticker = event.currentTarget.firstChild.textContent
  props.showChart(ticker);
 }
  return (
    <tr
      className={
        Math.sign(props.netChange) === -1 ? 'table-danger' : 'table-success'
      }
      onClick={rowClickHandler}
    >
      <td>{props.symbol}</td>
      <td>{props.openPrice}</td>
      <td>{props.closePrice}</td>
      <td>{props.netChange}</td>
    </tr>
  )
}

export default StockDataRow
