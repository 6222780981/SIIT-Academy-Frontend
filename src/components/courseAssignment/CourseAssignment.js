import './CourseAssignment.css';
import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import downloadIcon from '../../icons/download icon.svg';
import uploadworkbtn from '../../icons/upload-material-btn.png';
function CourseAssignment(props) {
  const fileRef = useRef();

  const userId = useSelector((store) => store.user.userId)
  // const userId = 1;
  const { weekId,courseId,weekIndex,getFileUrlHandler,uploadFileHandler } = props;
  const [filePath, setFilePath] = useState([]);
  const [submissionFileNames, setSubmissionFileNames] = useState([]);
  const submissionFiles = document.querySelector("input[name='upload-work']");
  const [submissionData, setSubmissionData] = useState([]);
  const [msg, setMsg] = useState('');

  // get list of assignment of the selected week
  if(filePath.length === 0){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/assignment?weekId=${weekId}`)
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        // setMsg(message);
        return;
      }
      console.log(data);
      console.log(userId);
      setFilePath(data);
    }
    );
  };
  //get list of submissions
  if (filePath.length !==0 && submissionData.length ===0){
    console.log(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission?userId=${userId}&assignmentId=${filePath[0].assignment_id}`)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission?userId=${userId}&assignmentId=${filePath[0].assignment_id}`)
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        // setMsg(message);
        return;
      }
      console.log(data);
      setSubmissionData(data.submissionArr);
    }
    );
  }

  const handleUploadWork = (event) => {
    var tempSubmissionFileNames = [...submissionFileNames];
    
    for (let i = 0; i < event.target.files.length; i++) {
      tempSubmissionFileNames = [...tempSubmissionFileNames, event.target.files[i].name];
    }
    console.log(tempSubmissionFileNames);
    setSubmissionFileNames(tempSubmissionFileNames);
    setMsg('');
  };

  const handleClearFile = (event) => {
    setSubmissionFileNames([]);
    submissionFiles.value = null;
    console.log(submissionFiles.files);
  };
  async function handleDownloadMaterial(event){
    var fileUrl = await getFileUrlHandler(event.target.value);
    console.log(fileUrl);
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }
  async function handleConfirmUploadWork(event) {
    event.preventDefault();
    const assignmentId = +event.target.value;
    const fileList = submissionFiles.files;
    var submissionFilePaths = [];
    for (let i = 0; i < submissionFileNames.length; i++) {
      submissionFilePaths = [...submissionFilePaths, `${courseId}/week${weekIndex+1}/assignment/submission/${submissionFileNames[i]}`];
    }
    if (fileList.length === 0) {
      setMsg("No work uploaded")
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList.item(i));
      console.log(fileList.item(i).name);
      if (
        fileList.length !== 0 &&
        !(await uploadFileHandler(fileList.item(i), `${courseId}/week${weekIndex+1}/assignment/submission/${fileList.item(i).name}`))
      ) {
        console.log(`error uploading file: ${`${courseId}/week${weekIndex+1}/assignment/submission/${fileList.item(i).name}`}`);
        return;
      }
    }
    try {
      var filePath = submissionFilePaths;
      var submissionDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
      console.log(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission`, { userId, assignmentId, filePath, submissionDate });
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission`, { userId, assignmentId, filePath, submissionDate })
        .then((response) => {
          console.log(response.data);
          const { status, data, message } = response.data;
          if (status !== 'success') {
            setMsg(message);
            return;
          }
          setMsg(`Successfully submitted work(s) to ${courseId}`);
          setSubmissionFileNames([]);
        });
    } catch (err) {
      console.log(err.message);
    }
  }
  const handleConfirmDeleteWork = (event) =>{
    event.preventDefault();
    const assignmentId = +event.target.value;
    console.log(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission`, {userId, assignmentId});
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission`, {data: {userId, assignmentId}})
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        setMsg(message);
        return;
      }
      setMsg(`Successfully deleted work from ${courseId}`);
      setSubmissionData([]);
    });
  }
  return (
    <div className='course-assignment-container'>
      {filePath.length > 0 && filePath.map((assignment,index) => (
        <div className='assignment-box'>
          <label style={{
            fontWeight: '700',
            fontSize: '16px',
            color:'#3b3b3b',
            paddingBottom:'10px'
            }}>Assignment {index+1}: {assignment.assignment_title} | Due Date: {assignment.due_date.slice(0,10)}
          </label>
          <label style={{
            paddingBottom: '10px'
            }}>{assignment.description}
          </label>
          {assignment.file_path && <button 
            className='download-work-btn' 
            value={assignment.file_path} 
            onClick={handleDownloadMaterial}>
            <img src={downloadIcon} width='25px'/>{assignment.file_path.split('/')[3]}
          </button>}
          <label style={{
            fontWeight: '700',
            fontSize: '16px',
            color:'#3b3b3b',
            paddingTop:'10px',
            paddingBottom:'10px'
            }}>Your Work
          </label>
          <div className='upload-work-box'>
            <input
              onChange={handleUploadWork}
              type="file"
              id="upload-work-btn"
              name="upload-work"
              accept="application/pdf"
              ref={fileRef}
              style={{ display: 'none' }}
            ></input>
            <label htmlFor="upload-work-btn">
              <img className="upload-work-icon" src={uploadworkbtn} />
            </label>
            <div className="upload-work-texts">
              <label
                style={{
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#672C84',
                }}>Upload your work
              </label>
              <label
                style={{
                  fontWeight: '300',
                  fontSize: '12px',
                  color: '#672C84',
                }}>Browse your file
              </label>
              {submissionFileNames.length > 0 &&
                submissionFileNames.map((filename) => (
                  <label value={filename} key={filename}
                    style={{
                      fontWeight: '500',
                      fontSize: '12px',
                      color: '#3b3b3b',
                    }}>{filename}
                  </label>
              ))}
              {submissionData.length > 0 &&
                submissionData.map((filename) => (
                  <label value={filename} key={filename}
                    style={{
                      fontWeight: '500',
                      fontSize: '12px',
                      color: '#3b3b3b',
                    }}>{filename.file_path.split('/')[4]}
                  </label>
              ))}
              {submissionFileNames.length > 0 && (
                <button className="clearbtn" onClick={handleClearFile}>
                  Clear
                </button>
              )}
            </div>
          </div>
          
            {submissionFileNames.length > 0 && <button 
              id='submit-file'
              className='confirm-submit' 
              value={assignment.assignment_id} 
              type="submit" 
              onClick={handleConfirmUploadWork}>
                Submit
            </button>}
            {submissionData.length > 0 && <button 
              className='confirm-submit' 
              value={assignment.assignment_id} 
              type="button"
              onClick={handleConfirmDeleteWork}>
                Unsubmit
            </button>}
          {msg && (
            <label
              className="status-msg"
              style={{
                fontWeight: '500',
                fontSize: '14px',
                color: '#672C84',
                paddingTop: '10px',
              }}>{msg}
            </label>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseAssignment;
