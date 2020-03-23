import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import {
  BrowserRouter as Router,
} from "react-router-dom";

function WrappedApp() {
  return (
    <Router>
      <AppProvider i18n={enTranslations}>
        <App />
      </AppProvider>
    </Router>
  );
}

ReactDOM.render(<WrappedApp  />, document.getElementById('root'));
