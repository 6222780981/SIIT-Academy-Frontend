import './CourseAssignment.css';
import {useState,useRef} from 'react';
import axios from 'axios';
import downloadIcon from '../../icons/download icon.svg';
import uploadworkbtn from '../../icons/upload-material-btn.png';
function CourseAssignment(props) {
  const fileRef = useRef();
  const { weekId, getFileUrlHandler } = props;
  const [filePath, setFilePath] = useState([]);
  const [submissionFileNames, setSubmissionFileNames] = useState([]);
  const submissionFiles = document.querySelector("input[name='upload-work']");
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
      setFilePath(data);
    });
  };

  const handleUploadWork = (event) => {
    var tempSubmissionFileNames = [...submissionFileNames];
    for (let i = 0; i < event.target.files.length; i++) {
      tempSubmissionFileNames = [...tempSubmissionFileNames, event.target.files[i].name];
    }
    console.log(submissionFiles);
    setSubmissionFileNames(tempSubmissionFileNames);
  };

  // const handleClearFile = (event) => {
  //   setSubmissionFileNames([]);
  //   submissionFiles.value = null;
  // };
  async function handleDownloadMaterial(event){
    var fileUrl = await getFileUrlHandler(event.target.value);
    console.log(fileUrl);
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
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
              id="upload-work"
              name="upload-work"
              accept="application/pdf"
              multiple="multiple"
              ref={fileRef}
              style={{ display: 'none' }}
            ></input>
            <label htmlFor="upload-work-btn">
              <img 
                className="upload-work-icon" 
                src={uploadworkbtn} 
                width="70px"
                height="70px"
              />
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
              {submissionFileNames.length > 0 && (
                <button className="clearbtn" onClick={handleClearFile}>
                  Clear
                </button>
              )}
            </div>
            
          </div>
            
        </div>
      ))}
    </div>
  );
}

export default CourseAssignment;
