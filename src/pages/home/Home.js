import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { weekActions } from '../../store/weekSlice';

import Navbar from '../../components/navbar/Navbar';
import HomeStaff from './homeStaff/HomeStaff';
import HomeStudentTeacher from './homeStudentTeacher/HomeStudentTeacher';
import './Home.css';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const role = useSelector((store) => store.user.role);

  useEffect(() => {
    if (!role) {
      history.replace('/login');
    }
  }, [role]);

  useEffect(() => {
    dispatch(weekActions.resetStates());
  }, [dispatch]);

  return (
    <div className="home">
      <Navbar></Navbar>
      {role === 'staff' ? <HomeStaff></HomeStaff> : <HomeStudentTeacher></HomeStudentTeacher>}
    </div>
  );
}

export default Home;
