import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'shoyo/dist/main.css';
import { Global } from './styles/globalStyle';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Global />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
