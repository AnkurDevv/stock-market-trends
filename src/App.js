import './App.css';
import Header from './components/Layout/Header';
import StockDataTable from './components/StockDataTable';

function App() {
  return (
  <>
  <div className='mainWrapper'>
  <Header/>
  <main>
   <StockDataTable/>
  </main>
  </div>
  </>
  );
}

export default App;

