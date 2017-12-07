import React, { Component } from 'react';
import Header from './components/splash_nav';
import SearchBar from './containers/search_bar';
import Toolbar from './containers/toolbar';
import PortfolioDrawer from './containers/portfolio_drawer';
import GraphScreen from './containers/graph_screen';
import Footer from './components/footer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
        <Toolbar />
        <PortfolioDrawer />
        <GraphScreen />
        <Footer />
      </div>

    );
  }
}

export default App;
