import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { RedBox } from 'redbox-react';
import configureStore from './store/configureStore';
import config from './utils/config';
import App from './components/App';

const store = configureStore();
const rootElement = document.getElementById('root');

const renderComponent = (Component) => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    rootElement);
};

if (config.env === 'development') {
  try {
    renderComponent(App);
  } catch (e) {
    renderComponent(<RedBox error={e} />);
  }
} else {
  renderComponent(App);
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderComponent(App);
  });
}
