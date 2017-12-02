import React, { Component } from 'react';
import Header from './components/splash_nav';
import PortfolioDrawer from './containers/portfolio_drawer';
import GraphScreen from './containers/graph_screen';
import Footer from './components/footer';
//const { Fullpage, Slide, HorizontalSlider } = require('fullpage-react');


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <section className="app-screen row col span-3-of-3">
          <PortfolioDrawer />
          <GraphScreen />
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;


//['DAX', 'DIA', 'EWG', 'DFE', 'ALGN', 'GDOT', 'GENY', 'SPY', 'DXC']
