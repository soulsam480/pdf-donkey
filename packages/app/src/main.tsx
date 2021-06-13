import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import AppNavbar from './components/AppNavbar';
import AppLoader from './components/AppLoader';
import AppAlertList from './components/AppAlertList';
import '@purge-icons/generated';
registerSW({
  immediate: true,
});
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppNavbar />
      <Suspense fallback={<AppLoader />}>
        <App />
      </Suspense>
      <AppAlertList />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
