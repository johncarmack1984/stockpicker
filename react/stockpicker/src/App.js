import React, { Component } from 'react';
//import FetchTickerNamePairs from './modules/fetch_ticker_name_pairs';
import FetchStock from './modules/fetch_stock';
import FetchAnalysis from './modules/fetch_analysis';
import SplashNav from './components/splash_nav';
import SearchBar from './components/search_bar';
import PortfolioDrawer from './components/portfolio_drawer';
import GraphScreen from './components/graph_screen';
import Footer from './components/footer';
const BACKEND_URL = 'http://127.0.0.1:5000';
//const BACKEND_URL = 'https://dg6hbo4hka.execute-api.us-east-1.amazonaws.com/dev';
//const BACKEND_URL = 'https://api.stockpicker.io/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tickerNamePairs: [],
      portfolio: ['DAX', 'DIA', 'EWG', 'DFE', 'ALGN', 'GDOT', 'GENY', 'SPY', 'DXC'],
      //portfolio: ['AAPL'],
      timeFrame: '1Y',
      data: [],
      analysis: []
    };
    //FetchTickerNamePairs ({}, (list) => {
      //this.setState({ tickerNamePairs: list })
    //});
    // fetch stock data from backend via FetchStock module
    this.state.portfolio.map((ticker, index) => {
      FetchStock({
        ticker: ticker,
        timeFrame: this.state.timeFrame,
        BACKEND_URL: BACKEND_URL
      }, (stock) => {
        this.setState({
          data: this.state.data.concat([stock])
        });
      });
      return true;
    });
    // fetch analysis of portfolio from backend via AnalyzePortfolio module
    FetchAnalysis({
      portfolio: this.state.data,
      BACKEND_URL: BACKEND_URL
    }, (analysis) => {
      this.setState({
        analysis: this.state.data.concat([analysis])
      });
    });
  }
  render() {
    //console.log(this.state.analysis)
    return (
      <div className="App">
        <SplashNav />
        <section className="app-screen row col span-3-of-3">
          <div className="sidebar col span-1-of-3">
            <SearchBar />
            <PortfolioDrawer
                portfolio={this.state.portfolio}
                timeFrame={this.state.timeFrame}
                data={this.state.data} />
          </div>
          <div>
            <GraphScreen
              data={this.state.data}
              analysis={this.state.analysis} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;

/*


                tickerNamePairs={this.state.tickerNamePairs}

 */
