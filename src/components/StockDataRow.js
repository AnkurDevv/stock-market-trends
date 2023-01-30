const StockDataRow = (props) => {
  return (
    <tr>
      <td>{props.symbol}</td>
      <td>{props.openPrice}</td>
      <td onClick={props.priceAlert}>{props.currentPrice}</td>
    </tr>
  )
}

export default StockDataRow
