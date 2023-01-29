import classes from './StockDataTable.module.css'
import { useEffect, useState } from 'react'
import StockDataRow from './StockDataRow'

const API_KEY = 'OC9391V0N1Z6NO9H'

const StockDataTable = () => {
  //APLHA VANTAGE API KEY = OC9391V0N1Z6NO9H

  const [stockList, setStockList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [apiResonseStatus, setApiResponseStatus] = useState('');
  const [isError, setIsError] = useState(null);

  const [symbols, setSymbol] = useState([
    'TSLA',
    'RIVN',
    'LCID'
  ]) // default symbol

   function priceAlertHandler(event) {
     let val = event.target.innerText
     alert(`price is ${val}`);
   }

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

  async function fetchStockData(symbol) {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      )
      if (!response.ok) {
        alert('something wrong with request')
      }
      const data = await response.json();
      const apiLimitStatus = isLimitedReached(data);
      if(apiLimitStatus){
       return;
      }
      // transforming data we are getting into something easier to work with
      const transFormedData = {
        symbol: data['Global Quote']['01. symbol'],
        openPrice: data['Global Quote']['02. open'],
        price: data['Global Quote']['05. price']
      }
      setStockList((prevState) => {
        return [...prevState, transFormedData]
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setIsError(error);
      console.log(isError)
    }
  }
   
   useEffect(() => {
     symbols.forEach((symbol) => {
       fetchStockData(symbol)
     })
   }, [symbols])
   
  return (
    <>
      {apiResonseStatus && <p className={classes.apiStatusText}>{apiResonseStatus}</p>}
      {isloading && <p className={classes.isLoadingTxt}>Loading...</p>}
      {!isloading &&
        !apiResonseStatus && (
          <div
            className={`d-flex justify-content-center ${classes.tableWrapper}`}
          >
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Symbol</th>
                  <th scope='col'>Open Price</th>
                  <th scope='col'>Current Price</th>
                </tr>
              </thead>
              <tbody>
                {stockList.map((stock) => {
                  return (
                    <StockDataRow
                      key={stock['symbol']}
                      symbol={stock['symbol']}
                      openPrice={stock['openPrice']}
                      currentPrice={stock['price']}
                      priceAlert={priceAlertHandler}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
    </>
  )
}

export default StockDataTable
