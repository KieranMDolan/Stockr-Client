import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.js';

import Home from './containers/Home/Home';
import Stocks from './containers/Stocks/Stocks';
import Quote from './containers/Quote/Quote';
import PriceHistory from './containers/PriceHistory/PriceHistory';
import NoMatch from './containers/NoMatch/NoMatch';
import Layout from './components/Layout/Layout';

import './App.css';

function App() {
  return (
    <Fragment>
      <Navigation />
      <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stocks" component={Stocks} />
          <Route path="/quote" component={Quote} />
          <Route path="/history" component={PriceHistory} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      </Layout>
    </Fragment>
  );
}

export default App;
