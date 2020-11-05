import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import Place from './components/Place.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/mynearbyplaces/' render={props => <Home {...props} />}>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/place'>
          <Place />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;