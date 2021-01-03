import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stores from 'store';
import 'antd/dist/antd.css';

import App from './App';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
