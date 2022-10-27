import './UploadAssignment.css';
import {useState, useRef} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadassignmentbtn from '../../AddResource/icons/upload-material-btn.png';

function UploadAssignment(props) {

  const { uploadFileHandler, weekArr, courseId } = props;

  const fileRef = useRef();
  const [title, setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [assignmentFiles, setAssignmentFiles] = useState([]);
  const [assignmentFileNames, setAssignmentFileNames] = useState([]);
  const [weekIndex, setWeek] = useState('');
  const [duedate, setDueDate] = useState(new Date());

  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
  };
  const handleUploadAssignment = (event)=>{
    var tempassignmentFiles = [...assignmentFiles];
    var tempassignmentFileNames = [...assignmentFileNames];
    // console.log(event.target.files)
    for (let i = 0; i<event.target.files.length; i++){
      tempassignmentFileNames = [...tempassignmentFileNames,event.target.files[i].name]
    }
    
    tempassignmentFiles = [...tempassignmentFiles,event.target.files]
    
    setAssignmentFiles(tempassignmentFiles);
    setAssignmentFileNames(tempassignmentFileNames);
  };
  const handleClearFile = (event) =>{
    setAssignmentFiles([]);
    setAssignmentFileNames([]);

  };

  async function handleConfirmUploadAssignment(e){
    e.preventDefault();
    console.log(assignmentFiles);
    console.log(assignmentFileNames);
    // if ((filePaths.length === 0) && (week ==='')){
    //   return;
    // }
    // console.log(filePaths, week);
  }
  return (
    <form className='confirm-upload-assignment' onSubmit={handleConfirmUploadAssignment}>
      <div className="upload-assignment-container">
        <label className='course-container-header'style={{
          fontWeight:'600',fontSize:'20px',color:'#646464'
        }}>Upload New Assignment
        </label>
        <div className='upload-assignment-body'>
          <div className='left-compartment'>
            <label className='title-text'style={{
              color:'#A2842A',fontWeight:'600',fontSize:'16px',paddingBottom:'10px'
            }}>Title</label>
            <input 
              className='title-textbox' 
              placeholder="Title" 
              type='text'
              multiple="multiple"
              // required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className='description-text'style={{
              color:'#A2842A',fontWeight:'600',fontSize:'16px',paddingBottom:'10px',paddingTop:'10px'
            }}>Description</label>
            <textarea 
              className='description-textbox' 
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            
          </div>
          <div className='right-compartment'>
            <div className='upload-assignment-box'>
              <input onChange={handleUploadAssignment}
                type="file"
                id="upload-assignment-btn"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                ref={fileRef}
                required
                style={{ display: 'none' }}
              ></input>
              <label htmlFor="upload-assignment-btn">
                <img className='upload-assignment-icon' src={uploadassignmentbtn}/>
              </label>
              <div className='upload-assignment-texts'>
                <label style={{
                  fontWeight:'500',fontSize:'14px', color:'#672C84'
                }}>Upload Assignment Files</label>
                <label style={{
                  fontWeight:'300',fontSize:'12px',color:'#672C84'
                }}>Browse your file</label>
                {assignmentFileNames.length > 0 && assignmentFileNames.map((assignmentfilename) => (
                  <label value={assignmentfilename} key={assignmentfilename}>
                    {assignmentfilename}
                  </label>
                ))}
                {assignmentFileNames.length > 0 && <button className="clearbtn" onClick={handleClearFile}>Clear</button>}
              </div>
            </div>
            <div className='assignment-week-dropdown'>
              <label style={{
                color:'#A2842A',fontWeight:'600',fontSize:'16px',paddingBottom:'10px'
              }}>Upload to Week</label>
              <select value={weekIndex} onChange={handleChangeWeek}>
                <option disabled={true} value="">
                  Select Week
                </option>
                {weekArr.map((week,index) => (
                  <option value={index+1} key={index+1}>
                    {index+1}
                  </option>
                ))}
              </select>
            </div>
            <div className='due-date'>
              <label style={{
                color:'#A2842A',fontWeight:'600',fontSize:'16px',paddingBottom:'10px'
              }}>Due Date</label>
              <input 
                className='due-date-calendar' 
                type="date" 
                value = {duedate} 
                onChange={(e) => setDueDate(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <button className='confirm-upload' type='submit'>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default UploadAssignment;
