import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './HomeStudentTeacher.css';

function HomeStudentTeacher() {
  const userId = useSelector((store) => store.user.userId);
  const role = useSelector((store) => store.user.role);

  const [errorMsg, setErrorMsg] = useState();
  const [courseArr, setCourseArr] = useState([]);

  useEffect(() => {
    setErrorMsg();
    setCourseArr([]);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/course?${role}_id=${userId}`)
      .then((response) => {
        const { status, message, data } = response.data;

        if (status !== 'success') {
          setErrorMsg(message);
          return;
        }

        setCourseArr(data.courseArr);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  }, []);

  return (
    <div className="home-student-teacher">
      <p className="home-student-teacher__title">
        Welcome to <span className="purple">SIIT</span> <span className="red">Academy</span>
      </p>
      {courseArr.length > 0 && (
        <>
          <p className="home-student-teacher__sub-title">1/2022 Courses</p>
          <div className="home-student-teacher__course-container">
            {courseArr.map((course) => (
              <Link to={`/course/${course.course_id}`} key={course.course_id}>
                <p className="course-id">{course.course_id}</p>
                <p className="course-name">{course.course_name}</p>
              </Link>
            ))}
          </div>
        </>
      )}
      {errorMsg && <p className="home-student-teacher__error-msg">{errorMsg}</p>}
    </div>
  );
}

export default HomeStudentTeacher;
