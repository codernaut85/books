import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './app.scss';
import Home from './modules/Home';
import ListBooks from './modules/ListBooks';

function App() {
  return <Router basename={'/'}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/books/page/:page" >
        <ListBooks />
      </Route>
    </Switch>
  </Router>
}

export default App;
