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
import List from './components/List.js';
import Reviews from './components/Reviews.js';
import NewReview from './components/NewReview.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/mynearbyplaces/' render={props => <Home {...props} />}>
        </Route>
        <Route path='/login' render={props => <Login {...props} />}>
        </Route>
        <Route path='/place' render={props => <Place {...props} />}>
        </Route>
        <Route path='/list' render={props => <List {...props} />}>
        </Route>
        <Route path='/reviews' render={props => <Reviews {...props} />}>
        </Route>
        <Route path='/newreview' render={props => <NewReview {...props} />}>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;