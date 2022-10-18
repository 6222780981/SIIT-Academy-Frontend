import { Route, Redirect, Switch } from 'react-router-dom';

import Information from './pages/information/Information';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import CourseManagement from './pages/courseManagement/CourseManagement';

function App() {
  return (
    <Switch>
      <Route exact path="/infomation">
        <Information></Information>
      </Route>
      <Route exact path="/login">
        <Login></Login>
      </Route>
      <Route exact path="/home">
        <Home></Home>
      </Route>
      <Route exact path="/management/course">
        <CourseManagement></CourseManagement>
      </Route>
      <Route path="/">
        <Redirect to="/infomation"></Redirect>
      </Route>
    </Switch>
  );
}

export default App;
