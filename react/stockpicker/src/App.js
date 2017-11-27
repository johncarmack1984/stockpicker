import React, { Component } from 'react';
import SplashNav from './components/splash_nav';
import SearchBar from './containers/search_bar';
import PortfolioDrawer from './containers/portfolio_drawer';
import GraphScreen from './containers/graph_screen';
import Footer from './components/footer';


class App extends Component {

  render() {
    return (
      <div className="App">
        <SplashNav />
        <section className="app-screen row col span-3-of-3">
          <div className="sidebar col span-1-of-3">
            <SearchBar />
            <PortfolioDrawer />
          </div>
          <div>
            <GraphScreen />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;


//['DAX', 'DIA', 'EWG', 'DFE', 'ALGN', 'GDOT', 'GENY', 'SPY', 'DXC']
