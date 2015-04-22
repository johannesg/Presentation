import React from 'react'
import Router from 'react-router'
import { Container } from './AppContainer'
import Routes from './Routes'

require('../css/main.css');

Router.run(Routes, function (Handler, state) {
   let params = state.params;
   React.render(<Handler params={params} />, Container);
});
// React.render(React.createElement(Main, { locale: 'sv-SE'}), Container);

