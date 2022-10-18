import { useState } from 'react';

import Navbar from '../../components/navbar/Navbar';
import './CourseManagement.css';

const yearArr = [1, 2, 3, 4];
const programArr = ['CPE', 'DE', 'ChE', 'CE', 'EE', 'ME', 'IE', 'MT', 'EM'];

const CourseManagement = () => {
  const [title, setCourseID] = useState('');
  const [coursename, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [myyear, setYear] = useState('');
  const [myprogram, setProgram] = useState('');

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeProgram = (event) => {
    setProgram(event.target.value);
  };

  function handleAddCourse(e) {
    e.preventDefault();
    console.log(title, coursename, instructor);
  }

  function handleSearchCourse(e) {
    e.preventDefault();
    if ((myyear != '' || 'null') && (myprogram != '' || 'null')) {
      console.log(myyear, myprogram);
    }
    // console.log(typeof(myyear), typeof(myprogram));
    // console.log(myyear, myprogram);
  }

  return (
    <div className="course-management">
      <Navbar></Navbar>
      <h1 className="management-text">Management</h1>
      <div className="course-and-student">
        <button className="course-student-btn">Course</button>
        <button className="course-student-btn">Student</button>
      </div>
      <form className="create-course" onSubmit={handleAddCourse}>
        <div className="create-course__section">
          <p className="create-course__section--title">Add Course Information</p>
          <div className="create-course__section--input-container">
            <input placeholder="Course ID" type="text" required value={title} onChange={(e) => setCourseID(e.target.value)} />
            <input
              className="long"
              placeholder="Course Name"
              type="text"
              required
              value={coursename}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <input placeholder="Instructor" type="text" required value={instructor} onChange={(e) => setInstructor(e.target.value)} />
          </div>
        </div>

        <div className="create-course__section">
          <p className="create-course__section--title">Add to Year</p>
          <div className="create-course__section--input-container">
            {yearArr.map((year) => (
              <div className="checkbox-container" key={year}>
                <label htmlFor={`year-${year}`}>Year {year}</label>
                <input id={`year-${year}`} type="checkbox"></input>
              </div>
            ))}
          </div>
        </div>

        <div className="create-course__section">
          <p className="create-course__section--title">Add to Program</p>
          <div className="create-course__section--input-container">
            {programArr.map((program) => (
              <label htmlFor={`program-${program}`} className="checkbox-container" key={program}>
                <p>{program}</p>
                <input id={`program-${program}`} type="checkbox"></input>
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
            {yearArr.map((year) => (
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
