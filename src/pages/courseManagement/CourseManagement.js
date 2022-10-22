import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import ManagementNav from '../../components/managementNav/ManagementNav';
import deletebtn from '../../icons/deletebtn.png';
import axios from 'axios';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courseId, setCourseId] = useState('');
  // const [delCourseId, setDelCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [teacherUsername, setInstructor] = useState('');
  const [year, setYear] = useState('');
  const [program, setProgram] = useState('');
  const [yearArr, setIsCheckedYear] = useState([]);
  const [programArr, setIsCheckedProgram] = useState([]);
  const [selectedCourse, getCourse] = useState([]);
  const [searchErrorMsg, setSearchErrorMsg] = useState();
  const [addErrorMsg, setAddErrorMsg] = useState();
  const [addSuccessMsg, setAddSuccessMsg] = useState();
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState();
  const [deleteErrorMsg, setDeleteErrorMsg] = useState();
  // const [show, setShow] = useState(false);

  const allYearArr = [1, 2, 3, 4];
  const allProgramArr = ['CPE', 'DE', 'ChE', 'CE', 'EE', 'ME', 'IE', 'MT', 'EM'];

  // var yearArr = [];
  // var programArr = [];
  // var courseArr = [];
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeProgram = (event) => {
    setProgram(event.target.value);
  };

  const handleClickYearCheckbox = (event) => {
    var yearList = [...yearArr];
    if (event.target.checked) {
      yearList = [...yearList, +event.target.value];
    } else {
      yearList.splice(yearList.indexOf(+event.target.value), 1);
    }
    setIsCheckedYear(yearList);
  };

  const handleClickProgramCheckbox = (event) => {
    var programList = [...programArr];
    if (event.target.checked) {
      programList = [...programList, event.target.value];
    } else {
      programList.splice(programList.indexOf(event.target.value), 1);
    }
    console.log(programList);
    setIsCheckedProgram(programList);
  };
  function handleAddCourse(e) {
    e.preventDefault();
    setAddErrorMsg();
    setAddSuccessMsg();
    console.log(`${process.env.REACT_APP_BACKEND_URL}/course`, { courseId, courseName, teacherUsername, yearArr, programArr });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/course`, { courseId, courseName, teacherUsername, yearArr, programArr })
      .then((response) => {
        console.log(response.data);
        const { status, data, message } = response.data;
        if (status !== 'success') {
          setAddErrorMsg(message);
          return;
        }
        setAddSuccessMsg(`${courseId} is added`);
      })
      .catch((err) => {
        setAddErrorMsg(err.message);
      });
  }

  function handleSearchCourse(e) {
    e.preventDefault();
    setSearchErrorMsg();
    
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/course?year=${year}&program=${program}`)
      .then((response) => {
        console.log(response.data);
        const { status, data, message } = response.data;
        if (status !== 'success') {
          setSearchErrorMsg(message);
          const courseArr = [];
          getCourse(courseArr);
          return;
        }
        const courseArr = response.data.data.courseArr;
        getCourse(courseArr);
      })
      .catch((err) => {
        setSearchErrorMsg(err.message);
      });
  }

  function handleDeleteCourse(e){
    // console.log(selectedCourse);
    e.preventDefault();
    var tempCourseList = [...selectedCourse];
    // getCourse();
    console.log(courseId);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/course`,{data:{courseId}});
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/course`,{data:{courseId}})
      .then((response) => {
        console.log(response.data);
        const { status, data, message } = response.data;
        if (status !== 'success') {
          setDeleteErrorMsg(message);
          return;
        }
        // remove the target course from selectedCourse array
        var index = tempCourseList.findIndex(e => e.course_id === courseId);
        tempCourseList.splice(index, 1);
        console.log(tempCourseList);
        getCourse(tempCourseList);
        // console.log(selectedCourse);
      })
  }

  return (
    <div className="course-management">
      <Navbar></Navbar>
      <ManagementNav></ManagementNav>
      <form className="create-course" onSubmit={handleAddCourse}>
        <div className="create-course__section">
          <p className="create-course__section--title">Add Course Information</p>
          <div className="create-course__section--input-container">
            <input
              className="long"
              placeholder="Course ID"
              type="text"
              required
              value={courseId.toUpperCase()}
              onChange={(e) => setCourseId(e.target.value)}
            />
            <input
              className="long"
              placeholder="Course Name"
              type="text"
              required
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <input placeholder="Instructor" type="text" required value={teacherUsername} onChange={(e) => setInstructor(e.target.value)} />
          </div>
        </div>

        <div className="create-course__section">
          <p className="create-course__section--title">Add to Year</p>
          <div className="create-course__section--input-container">
            {allYearArr.map((year) => (
              <div className="checkbox-container" key={year}>
                <label htmlFor={`year-${year}`}>Year {year}</label>
                <input id={`year-${year}`} type="checkbox" value={year} key={year} onChange={handleClickYearCheckbox} />
              </div>
            ))}
          </div>
        </div>

        <div className="create-course__section">
          <p className="create-course__section--title">Add to Program</p>
          <div className="create-course__section--input-container">
            {allProgramArr.map((program) => (
              <label htmlFor={`program-${program}`} className="checkbox-container" key={program}>
                <p>{program}</p>
                <input id={`program-${program}`} type="checkbox" value={program} key={program} onChange={handleClickProgramCheckbox} />
              </label>
            ))}
          </div>
        </div>

        <button className="create-course__submit-btn" type="submit">
          Confirm
        </button>
        {addErrorMsg && <p className="course-management__error-msg">** {addErrorMsg} **</p>}
        {addSuccessMsg && <p className="course-management__success-msg">** {addSuccessMsg} **</p>}
      </form>

      <form className="filter-course" onSubmit={handleSearchCourse}>
        <div>
          <label>Select Year</label>
          <select value={year} onChange={handleChangeYear}>
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
          <select value={program} onChange={handleChangeProgram}>
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

        <button className="filter-course__submit-button" type="submit">
          <span>Search Course</span>
        </button>
      </form>
      {searchErrorMsg && <p className="course-management__error-msg">** {searchErrorMsg} **</p>}
      <form onSubmit={handleDeleteCourse}>
        {selectedCourse.length > 0 && (
          <div className="filtered-course">
            
            <table>
              <tbody>
                
                <tr>
                  <th className="id">ID</th>
                  <th>Name</th>
                  <th>Instructor</th>
                  <th className="buttoncolumn"></th>
                </tr>
                
                {selectedCourse.map((course) => (
                  <tr value={course.course_id} key={course.course_id}>
                    <td>
                      <Link to={`/course/${course.course_id}`}>
                        <button className="course_id-btn">{course.course_id}</button>
                      </Link>
                    </td>
                    <td>{course.course_name}</td>
                    <td>{course.username}</td>
                    <td>
                      <button className="deletebtn" id="deletebtn" value={course.course_id} type='submit' onClick={(e) => setCourseId(course.course_id)}>
                        <img className="deletebtn" src={deletebtn} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
};

export default CourseManagement;
