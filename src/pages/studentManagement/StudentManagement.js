import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import readXlsxFile from 'read-excel-file';

import Navbar from '../../components/navbar/Navbar';
import ManagementNav from '../../components/managementNav/ManagementNav';
import './StudentManagement.css';

function StudentManagement() {
  const history = useHistory();
  const role = useSelector((store) => store.user.role);

  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState();

  const courseIdRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    if (role !== 'staff') {
      history.replace('/login');
    }
  }, [role]);

  function submitHandler(e) {
    e.preventDefault();
    setErrorMsg();

    if (loading) {
      return;
    }

    const courseId = e.target[0].value.toUpperCase();
    const file = e.target[1].files[0];

    readXlsxFile(file).then((rows) => {
      const studentEmailArr = [];

      rows.forEach((row) => {
        const email = row[0];

        if (!email || !email.includes('@')) {
          setErrorMsg('Data in the excel file must be student emails only');
          return;
        }

        studentEmailArr.push(email);
      });

      if (!errorMsg) {
        setLoading(true);

        axios
          .patch(`${process.env.REACT_APP_BACKEND_URL}/course/student`, { courseId, studentEmailArr })
          .then((response) => {
            const { status, message } = response.data;

            if (status !== 'success') {
              setErrorMsg(message);
              return;
            }

            courseIdRef.current.value = '';
            fileRef.current.value = '';
          })
          .catch((err) => {
            setErrorMsg(err.message);
          })
          .finally(() => setLoading(false));
      }
    });
  }

  return (
    <div className="student-management">
      <Navbar></Navbar>
      <ManagementNav></ManagementNav>
      <form className="student-management__form" onSubmit={submitHandler}>
        <div className="student-management__form--input-container">
          <div>
            <label htmlFor="course-id">Course ID</label>
            <input type="text" id="course-id" ref={courseIdRef} required></input>
          </div>
          <div>
            <label htmlFor="student-email-arr">List of Students</label>
            <input
              type="file"
              id="student-email-arr"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
              ref={fileRef}
              required
            ></input>
          </div>
        </div>
        <button className="student-management__form--submit-btn">Confirm</button>
        {errorMsg && <p className="student-management____form--error-msg">** {errorMsg} **</p>}
      </form>
    </div>
  );
}

export default StudentManagement;
