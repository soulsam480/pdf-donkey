import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from 'src/App';
import AppNavbar from 'src/components/AppNavbar';
import AppLoader from 'src/components/AppLoader';
import AppAlertList from 'src/components/AppAlertList';
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
