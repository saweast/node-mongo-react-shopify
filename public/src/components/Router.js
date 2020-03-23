import React, { Fragment } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { FooterHelp, Link } from '@shopify/polaris';

import Login from '../pages/Login';
import Products from '../pages/Products';

import { homePath, loginPath } from '../utils/paths';

export default () => (
  <Fragment>
    <Router>
      <Switch>
        <Route exact path={homePath} component={Products} />
        <Route path={loginPath} component={Login} />
      </Switch>
    </Router>
    <FooterHelp>
      Learn more about{' '}
      <Link
        url="/faq"
        external={false}
      >
        Learn more about Custom Swatches
      </Link>
      .
    </FooterHelp>
  </Fragment>
);
