import { Route, Redirect, Switch } from 'react-router-dom';

import Information from './pages/information/Information';
import Login from './pages/login/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/infomation">
        <Information></Information>
      </Route>
      <Route exact path="/login">
        <Login></Login>
      </Route>
      <Route path="/">
        <Redirect to="/infomation"></Redirect>
      </Route>
    </Switch>
  );
}

export default App;
