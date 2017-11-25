import React, { Component } from 'react';
import SearchBar from './components/search_bar';
import PortfolioDrawer from './components/portfolio_drawer';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { portfolio: ['AAPL','TSLA'] };

  }
  render() {
    return (
      <div className="App">
        <SearchBar />
        <PortfolioDrawer stock={this.state.stocks} />
      </div>
    );
  }
}

export default App;
