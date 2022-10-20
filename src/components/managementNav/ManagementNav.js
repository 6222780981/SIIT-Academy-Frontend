import { NavLink } from 'react-router-dom';

import './ManagementNav.css';

function ManagementNav() {
  return (
    <div className="management-nav">
      <h1 className="management-nav__title">Management</h1>
      <div className="management-nav__button-container">
        <NavLink to="/management/course">Course</NavLink>
        <NavLink to="/management/student">Student</NavLink>
      </div>
    </div>
  );
}

export default ManagementNav;
