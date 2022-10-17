import './Coursemanagement.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';



const coursemanagement = () => {
  
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
    if((myyear != "" || "null") && (myprogram != "" || "null")){
      console.log(myyear, myprogram);
    }
    // console.log(typeof(myyear), typeof(myprogram));
    // console.log(myyear, myprogram);
  }
  return (
    <div className="courseManagement">
      <h1><a className='managementtext'>Management</a></h1>
      <div className='courseandstudent'>
        <button className='coursestudentbtns'>Course</button>
        <button className='coursestudentbtns'>Student</button>
      </div>
      <div className="createCourse">
        <form onSubmit={handleAddCourse}>
          <input 
            placeholder="Course ID" 
            type="text" 
            required 
            value={title} 
            onChange={(e) => setCourseID(e.target.value)} 
          />
          <a className='coursename'>
            <input 
              placeholder="Course Name" 
              type="text" 
              required 
              value={coursename} 
              onChange={(e) => setCourseName(e.target.value)} 
            />
          </a>
          <input 
            placeholder="Instructor" 
            type="text" 
            required 
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
          />
          <table className='selectyear'>
            <tr>
              <td><label>Select Year</label></td>
              <td><label>Year 1</label><input type="checkbox" /></td>
              <td><label>Year 2</label><input type="checkbox" /></td>
              <td><label>Year 3</label><input type="checkbox" /></td>
              <td><label>Year 4</label><input type="checkbox" /></td>
            </tr>
          </table>
          <table className='bEngProgram'>
            <tr>
              <td><label>B.Eng.Program</label></td>
              <td><label>CPE</label><input type="checkbox" /></td>
              <td><label>DE</label><input type="checkbox" /></td>
              <td><label>ChE</label><input type="checkbox" /></td>
              <td><label>CE</label><input type="checkbox" /></td>
            </tr>
              <td><label></label></td>
              <td><label>ME</label><input type="checkbox" /></td>
              <td><label>IE</label><input type="checkbox" /></td>
              <td><label>EE</label><input type="checkbox" /></td>
              <td><label></label></td>
          </table>
          <table className='bScProgram'>
            <tr>
              <td><label>B.Sc.Program</label></td>
              <td><label>MT</label><input type="checkbox" /></td>
              <td><label>EM</label><input type="checkbox" /></td>
              <td><label></label></td>
              <td><label></label></td>
            </tr>
          </table>
          <button className='submitbutton' type="submit">Add Course</button>
        </form>
        
      </div>
      <form onSubmit={handleSearchCourse}>
        <div className='filterCourse'>
          <div className="year">
            <select value={myyear} onChange={handleChangeYear}>
              <option disabled={true} value="">Select year:</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className='program'>
            <select value={myprogram} onChange={handleChangeProgram}>
              <option disabled={true} value="">Select program:</option>
              <option value="CPE">CPE</option>
              <option value="DE">DE</option>
              <option value="ChE">ChE</option>
              <option value="CE">CE</option>
              <option value="ME">ME</option>
              <option value="IE">IE</option>
              <option value="EE">EE</option>
              <option value="MT">MT</option>
              <option value="EM">EM</option>
            </select>
          </div>
          <button className='submitbutton' type="submit">Search Course</button>
        </div>
      </form>
    </div>

  );
};
export default coursemanagement;
