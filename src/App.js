import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';
import ServiceEdit from './components/ServiceEdit';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>

          <Route exact path='/services/:id'>
            <ServiceEdit />
          </Route>

          <Route exact path='/services'>
            <ServiceAdd />
            <ServiceList />
          </Route>
          <Redirect from='/' to='/services' />
        </Switch>
      </Router>
      
      
    </Fragment>
  );
}

export default App;
