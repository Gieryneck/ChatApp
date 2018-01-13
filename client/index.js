// this file is the entry for webpack

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

// this is taken from RHL documentation. const render is not a React render, its a higher order function that's needed for Hot Module Replacement. 
// from documentation: all children of AppContainer will be reloaded when change occurs
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp)
  });
}