import React from 'react' 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components/Profile';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Explore from './components/Explore';
import SignOut from './components/SignOut';

class App extends React.Component {
  render(){
    return (
      <Router>

        <Switch>
          <Route path="/sign-out">
            <SignOut />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/restaurants">
            <Search />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>
    )
  }
}

export default App;
