import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'css/main.css';
import configureStore from './store/configureStore';
import { getRandomNumberOfStars } from './actions';
import App from './containers/App';
import { REDRAW_COUNT } from './helpers/constants';


const store = configureStore({ game: { redraws: REDRAW_COUNT, usedNumbers: [], selectedNumber: [] } });

store.dispatch(getRandomNumberOfStars());

render(
  <Provider store={ store }>
    <BrowserRouter >
      <App />
    </BrowserRouter >
  </Provider>,
  document.getElementById('app')
);
