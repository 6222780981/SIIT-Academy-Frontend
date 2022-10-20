import { useState } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import searchIcon from '../../../icons/search icon.svg';

import './HomeStaff.css';

const allYearArr = [1, 2, 3, 4];
const allProgramArr = ['CPE', 'DE', 'ChE', 'CE', 'EE', 'ME', 'IE', 'MT', 'EM'];

function HomeStaff() {
  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState();
  const [courseArr, setCourseArr] = useState([]);
  const [filteredCourseArr, setFilteredCourseArr] = useState([]);
  const [year, setYear] = useState();
  const [program, setProgram] = useState();

  function submitHandler(e) {
    e.preventDefault();
    setErrorMsg();
    setCourseArr([]);
    setFilteredCourseArr([]);
    setYear();
    setProgram();

    const year = e.target[0].value;
    const program = e.target[1].value;

    let query = '';

    if (year.length) {
      query += `?year=${year}`;
    }

    if (program.length) {
      query += `${query.length ? '&' : '?'}program=${program}`;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/course${query}`)
      .then((response) => {
        const { status, data, message } = response.data;
        if (status !== 'success') {
          setErrorMsg(message);
          return;
        }

        const courseArr = data.courseArr;
        setCourseArr(courseArr);
        setFilteredCourseArr(courseArr);
        setYear(year);
        setProgram(program);
        history.push('/home/result');
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  }

  function filterCourseHandler(e) {
    e.preventDefault();

    const courseId = e.target[0].value.toUpperCase();

    if (courseId === '') {
      setFilteredCourseArr(courseArr);
      return;
    }

    setFilteredCourseArr(courseArr.filter((course) => course.course_id.includes(courseId)));
  }

  return (
    <div className="home-staff">
      <Route exact path="/home">
        <p className="home-staff__title">
          Welcome to <span className="purple">SIIT</span> <span className="red">Academy</span>
        </p>
        <form onSubmit={submitHandler}>
          <div className="home-staff__input-container">
            <div>
              <label>Select Year</label>
              <select defaultValue="">
                <option disabled={true} value="">
                  Select year
                </option>
                {allYearArr.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select Program</label>
              <select defaultValue="">
                <option disabled={true} value="">
                  Select program
                </option>
                {allProgramArr.map((program) => (
                  <option value={program} key={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="home-staff__submit-btn">Search Courses</button>
          {errorMsg && <p className="home-staff__error-msg">** {errorMsg} **</p>}
        </form>
      </Route>
      <Route exact path="/home/result">
        <p className="home-staff__title">
          <span className="purple">
            {program ? `${program} ` : ''}
            {year ? `Year ${year} ` : ''}
            {!year && !program ? 'All ' : ''}
          </span>
          <span className="red">Courses</span>
        </p>
        <form className="home-staff__search-form" onSubmit={filterCourseHandler}>
          <input type="text" placeholder="Course ID"></input>
          <button>
            <img src={searchIcon}></img>
          </button>
        </form>
        {
          <table className="home-staff__table">
            <tbody>
              {filteredCourseArr.length > 0 ? (
                <>
                  <tr className="home-staff__table--row">
                    <th className="margin-right">ID</th>
                    <th className="margin-right">Name</th>
                    <th>Instructor</th>
                  </tr>
                  {filteredCourseArr.map((course) => (
                    <tr key={course.course_id} className="home-staff__table--row">
                      <td className="margin-right">
                        <Link to={`/course/${course.course_id}`}>{course.course_id}</Link>
                      </td>
                      <td className="margin-right">{course.course_name}</td>
                      <td>{course.username}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="home-staff__table--row">
                  <tr>No courses match the given course ID</tr>
                </tr>
              )}
            </tbody>
          </table>
        }
      </Route>
    </div>
  );
}

export default HomeStaff;
