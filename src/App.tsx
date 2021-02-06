import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import HomePage from './pages/HomePage';
import SingleCatPage from './pages/SingleCatPage';
import Page404 from './pages/Page404';

const App: FC = () => {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/cat/:id" exact>
          <SingleCatPage />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
