const StockDataRow = (props) => {
  return (
    <tr className={Math.sign(props.netChange) === -1 ? 'table-danger':'table-success'}>
      <td>{props.symbol}</td>
      <td>{props.openPrice}</td>
      <td>{props.closePrice}</td>
      <td>{props.netChange}</td>
    </tr>
  )
}

export default StockDataRow
