import classes from './StockDataTable.module.css'
import { useEffect, useState } from 'react'
import StockDataRow from './StockDataRow'
import InfoGraphic from './InfoGraphic'

const API_KEY = 'OC9391V0N1Z6NO9H'

const StockDataTable = () => {
  //APLHA VANTAGE API KEY = OC9391V0N1Z6NO9H

  const [stockList, setStockList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [apiResonseStatus, setApiResponseStatus] = useState('');
  const [isError, setIsError] = useState(null);
  const [stockLineChartData, setStockLineChartData] = useState(null);

  const [symbols, setSymbol] = useState([
    'TSLA',
    'LCID'
  ]) // default symbol

  const isLimitedReached = (data) =>{
   if (data['Note']) {
     setApiResponseStatus(
       'Sorry It seems like you have reached the number of request allowed for this minute. Please try reloading application again in a few seconds'
     )
     setIsLoading(false);
     return true;
   }
   setApiResponseStatus('');
   return false;
  }

  async function setLineChartData(symbol){
   console.log(symbol);
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
    )
    const data = await response.json()
    const apiLimitStatus = isLimitedReached(data)
    if (apiLimitStatus) {
      return
    }
    const weeklyData = data['Weekly Adjusted Time Series']
    //Getting Value for stock Line Chart
    const dates = Object.keys(weeklyData);
    const oneWeekAgo = dates[1];
    const twoWeekAgo = dates[2];
    const threeWeekAgo = dates[3];
    const fourWeekAgo = dates[4];
    const fiveWeekAgo = dates[5];

    setStockLineChartData([
      { date: oneWeekAgo, price: weeklyData[oneWeekAgo]['2. high'] },
      { date: twoWeekAgo, price: weeklyData[twoWeekAgo]['2. high'] },
      { date: threeWeekAgo, price: weeklyData[threeWeekAgo]['2. high'] },
      { date: fourWeekAgo, price: weeklyData[fourWeekAgo]['2. high'] },
      { date: fiveWeekAgo, price: weeklyData[fiveWeekAgo]['2. high'] },
    ]) 

  }

  async function getStockPricesWeekly(symbol) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
    )
    const data = await response.json()
    const apiLimitStatus = isLimitedReached(data)
    if (apiLimitStatus) {
      return
    }
    console.log(data)
    const weeklyData = data['Weekly Adjusted Time Series']

    // const symbol = data['Meta Data']['2. Symbol']

    const dates = Object.keys(weeklyData)
    const lstWeekTradeDate = dates[1]

    console.log(lstWeekTradeDate)

    const lstWeekfirstTradePrice = parseFloat(
      weeklyData[lstWeekTradeDate]['1. open']
    ).toFixed(2)
    const lstWeekLastTradePrice = parseFloat(
      weeklyData[lstWeekTradeDate]['4. close']
    ).toFixed(2)
    const lstWeekNetChange = parseFloat(
      lstWeekLastTradePrice - lstWeekfirstTradePrice
    ).toFixed(2)

    // transforming data we are getting into something easier to work with
    const transFormedData = {
      symbol: symbol,
      openPrice: lstWeekfirstTradePrice,
      closePrice: lstWeekLastTradePrice,
      netChange: lstWeekNetChange,
    }
    setStockList((prevState) => {
      return [...prevState, transFormedData]
    })

    //Getting Value for stock Line Chart
    
  }

   useEffect(() => {
     symbols.forEach((symbol) => {
       getStockPricesWeekly(symbol)
     })
    }, [symbols])

    // useEffect(()=>{
    //  setLineChartData('TSLA')
    // },[])
    
    
  return (
    <>
      {apiResonseStatus && (
        <p className={classes.apiStatusText}>{apiResonseStatus}</p>
      )}
      {isloading && <p className={classes.isLoadingTxt}>Loading...</p>}
      {!isloading && !apiResonseStatus && (
        <div
          className={`d-flex justify-content-center ${classes.tableWrapper}`}
        >
          <table className='table table-hover table-bordered'>
            <thead>
              <tr>
                <th scope='col'>Symbol</th>
                <th scope='col'>Open Price</th>
                <th scope='col'>Closed Price</th>
                <th scope='col'>Net Change</th>
              </tr>
            </thead>
            <tbody>
              {stockList.map((stock) => {
                return (
                  <StockDataRow
                    key={stock['symbol']}
                    symbol={stock['symbol']}
                    openPrice={stock['openPrice']}
                    closePrice={stock['closePrice']}
                    netChange={stock['netChange']}
                    showChart={setLineChartData}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      {!isloading && !apiResonseStatus && stockLineChartData && <InfoGraphic stockData={stockLineChartData} />} 
    </>
  )
}

export default StockDataTable
