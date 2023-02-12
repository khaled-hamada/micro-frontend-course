import React, { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/Header';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createGenerateClassName, StylesProvider } from '@material-ui/core';
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({
  productionPrefix: 'container-',
});

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/Dashboard'));
const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={() => setSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {isSignedIn ? <DashboardLazy /> : <Redirect to="/" />}
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

export default App;
