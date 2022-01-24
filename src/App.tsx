import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/pages/Home';
import Album from './components/pages/Album';
import User from './components/pages/User';
import Favorite from './components/pages/Favorite';


function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Header />
          <Switch>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/album/:albumId">
              <Album />
            </Route>
            <Route path="/favorite">
              <Favorite />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
