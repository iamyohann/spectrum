/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { AtlaskitThemeProvider, themed, colors } from '@atlaskit/theme';
import App from './containers/App';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import SettingsPage from './pages/Setting';
// import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';
import StatusBar from './components/StatusBar';

export default class MainRouter extends Component {
  constructor() {
    super();
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304,
      }
    };
  }
  getChildContext() {
    return {
      navOpenState: this.state.navOpenState,
    };
  }

  appWithPersistentNav = () => (props) => (
    <App
      onNavResize={this.onNavResize}
      {...props}
    />
  )

  onNavResize = (navOpenState) => {
    this.setState({
      navOpenState,
    });
  }

  render() {
    const AppWithNavigation = this.appWithPersistentNav();

    return (
      <AtlaskitThemeProvider>
        <AppWithNavigation>
          <Route exact path="/" component={Dashboard} />
          <Route path="/network" component={Network} />
          <Route path="/settings" component={SettingsPage} />
        </AppWithNavigation>
        <StatusBar />
      </AtlaskitThemeProvider>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object,
};

