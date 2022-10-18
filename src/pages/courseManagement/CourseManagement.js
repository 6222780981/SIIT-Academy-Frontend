import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import './CourseManagement.css';

const allYearArr = [1, 2, 3, 4];
const allprogramArr = ['CPE', 'DE', 'ChE', 'CE', 'EE', 'ME', 'IE', 'MT', 'EM'];

var yearArr = [];
var programArr = [];

const CourseManagement = () => {
  const [courseId, setCourseID] = useState('');
  const [courseName, setCourseName] = useState('');
  const [teacherUsername, setInstructor] = useState('');
  const [myyear, setYear] = useState('');
  const [myprogram, setProgram] = useState('');
  const [checkedyear, setIsCheckedYear] = useState([]);
  const [checkedprogram, setIsCheckedProgram] = useState([]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeProgram = (event) => {
    setProgram(event.target.value);
  };

  const handleClickYearCheckbox = (event) => {
    var yearList = [...checkedyear];
    // updatedList.push(intcheckedyear);
    if (event.target.checked) {
      yearList = [...yearList, +event.target.value];
    } else {
      yearList.splice(yearList.indexOf(+event.target.value), 1);
    }
    setIsCheckedYear(yearList);
    // console.log(yearList);
    // update list to the global variable
    yearArr = yearList;
  };

  const handleClickProgramCheckbox = (event) => {
    var programList = [...checkedprogram];
    if (event.target.checked) {
      programList = [...programList, event.target.value];
    } else {
      programList.splice(programList.indexOf(event.target.value), 1);
    }
    setIsCheckedProgram(programList);
    // console.log(programList);
    // update list to the global variable
    programArr = programList;
  };
  function handleAddCourse(e) {
    e.preventDefault();
    console.log(courseId, courseName, teacherUsername, yearArr,programArr);
    axios.post('https://api-dot-siit-academy.as.r.appspot.com/course', 
    {courseId, courseName, teacherUsername, yearArr,programArr})
    .then(response => {console.log(response)})
  }

  function handleSearchCourse(e) {
    e.preventDefault();
    if ((myyear != '' || 'null') && (myprogram != '' || 'null')) {
      console.log(myyear, myprogram);
    }

  }

  return (
    <div className="course-management">
      <Navbar></Navbar>
      <h1 className="management-text">Management</h1>
      <div className="course-and-student">
        <NavLink to="/management/course" className="course-student-btn">
          Course
        </NavLink>
        <NavLink to="/management/student" className="course-student-btn">
          Student
        </NavLink>
      </div>
      <form className="create-course" onSubmit={handleAddCourse}>
        <div className="create-course__section">
          <p className="create-course__section--title">Add Course Information</p>
          <div className="create-course__section--input-container">
            <input placeholder="Course ID" type="text" required value={courseId} onChange={(e) => setCourseID(e.target.value)} />
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
                <input 
                  id={`year-${year}`} 
                  type="checkbox" 
                  value={year} 
                  onChange={handleClickYearCheckbox} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="create-course__section">
          <p className="create-course__section--title">Add to Program</p>
          <div className="create-course__section--input-container">
            {allprogramArr.map((program) => (
              <label htmlFor={`program-${program}`} className="checkbox-container" key={program}>
                <p>{program}</p>
                <input 
                  id={`program-${program}`} 
                  type="checkbox"
                  value={program}
                  onChange={handleClickProgramCheckbox}
                />
              </label>
            ))}
          </div>
        </div>

        <button className="create-course__submit-btn" type="submit">
          Confirm
        </button>
      </form>

      <form className="filter-course" onSubmit={handleSearchCourse}>
        <div>
          <label>Select Year</label>
          <select value={myyear} onChange={handleChangeYear}>
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
          <select value={myprogram} onChange={handleChangeProgram}>
            <option disabled={true} value="">
              Select program
            </option>
            {programArr.map((program) => (
              <option value={program} key={program}>
                {program}
              </option>
            ))}
          </select>
        </div>
        <button className="filter-course__submit-button" type="submit">
          Search Course
        </button>
      </form>
    </div>
  );
};

export default CourseManagement;
