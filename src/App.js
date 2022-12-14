import { Route, Redirect, Switch } from 'react-router-dom';

import './firebase';

import Information from './pages/information/Information';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import CourseManagement from './pages/courseManagement/CourseManagement';
import StudentManagement from './pages/studentManagement/StudentManagement';
import Course from './pages/course/Course';
import AddResource from './pages/AddResource/AddResource';
import StudentWork from './pages/studentWork/StudentWork';

function App() {
  return (
    <Switch>
      <Route exact path="/infomation">
        <Information></Information>
      </Route>
      <Route exact path="/login">
        <Login></Login>
      </Route>
      <Route path="/home">
        <Home></Home>
      </Route>
      <Route exact path="/management/course">
        <CourseManagement></CourseManagement>
      </Route>
      <Route exact path="/management/student">
        <StudentManagement></StudentManagement>
      </Route>
      <Route exact path="/course/:courseId/management">
        <AddResource></AddResource>
      </Route>
      <Route path="/course/:courseId">
        <Course></Course>
      </Route>
      <Route path="/assignment/:assignmentId">
        <StudentWork></StudentWork>
      </Route>
      <Route path="/">
        <Redirect to="/infomation"></Redirect>
      </Route>
    </Switch>
  );
}

export default App;
