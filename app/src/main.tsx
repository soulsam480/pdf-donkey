import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'shoyo/dist/main.css';
import { Global } from './styles/globalStyle';

ReactDOM.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
