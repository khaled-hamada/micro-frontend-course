import React, { lazy, Suspense } from 'react';
// import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGenerateClassName, StylesProvider } from '@material-ui/core';
// import AuthApp from './components/AuthApp';
import Progress from './components/Progress';
import { useState } from 'react';
const generateClassName = createGenerateClassName({
  productionPrefix: 'container-',
});

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/Dashboard'));

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  return (
    <BrowserRouter>
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
              <Route path="/dashboard" component={DashboardLazy} />
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
