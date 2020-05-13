import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.js';

import Home from './containers/Home/Home';
import Stocks from './containers/Stocks/Stocks';
import PriceHistory from './containers/PriceHistory/PriceHistory';
import NoMatch from './containers/NoMatch/NoMatch';
import Layout from './components/Layout/Layout';
import SingleStock from './containers/SingleStock/SingleStock.js';
import Registration from './containers/Registration/Registration.js';

function App() {
  // state for login error modal
  const [loginError, setLoginError] = useState({isError: false, errorMessage: ''});
  
  const rootDivStyle = {
    height: '100%',
    width: '100%'
  }

  return (
    <div style={rootDivStyle}>
      <Router>
            <Navigation loginError={loginError} setLoginError={setLoginError}/>
            <Layout loginError={loginError} setLoginError={setLoginError}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/stocks/symbols" component={Stocks} />
                <Route path="/stocks/:symbol" component={SingleStock} />
                <Route path="/history/:symbol" component={PriceHistory} />
                <Route exact path="/register" component={Registration} />
                <Route component={NoMatch} />
              </Switch>
            </Layout>
      </Router>
    </div>
  );
}

export default App;
