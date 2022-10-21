import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import HomeStaff from './homeStaff/HomeStaff';
import HomeStudentTeacher from './homeStudentTeacher/HomeStudentTeacher';
import './Home.css';

function Home() {
  const history = useHistory();
  const role = useSelector((store) => store.user.role);

  useEffect(() => {
    if (!role) {
      history.replace('/login');
    }
  }, [role]);

  return (
    <div className="home">
      <Navbar></Navbar>
      {role === 'staff' ? <HomeStaff></HomeStaff> : <HomeStudentTeacher></HomeStudentTeacher>}
    </div>
  );
}

export default Home;
