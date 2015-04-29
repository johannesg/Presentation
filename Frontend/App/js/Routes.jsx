import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import Main from './Main'
import Articles from './components/Articles'
import Checkout from './components/Checkout'
import Confirm from './components/Confirm'

export default (
  <Route name="app" path="/" handler={Main}>
    <Route name="articles" path="/articles" handler={Articles}>
      
    </Route>
    <Route name="checkout" path="/checkout" handler={Checkout}>
      
    </Route>
    <Route name="confirm" path="/confirm" handler={Confirm}>
      
    </Route>

    <DefaultRoute handler={Articles} />
    </Route>
);

