import './CourseAssignment.css';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import downloadIcon from '../../icons/download icon.svg';
import uploadworkbtn from '../../icons/upload-material-btn.png';
import deleteIcon from '../../icons/delete icon.svg';

function CourseAssignment(props) {
  const fileRef = useRef();
  const userId = useSelector((store) => store.user.userId);
  const role = useSelector((store) => store.user.role);
  const { weekId, courseId, weekIndex, getFileUrlHandler, uploadFileHandler, deleteFileHandler } = props;
  const [filePath, setFilePath] = useState([]);
  const [submissionFileNames, setSubmissionFileNames] = useState([]);
  const submissionFiles = document.querySelector("input[name='upload-work']");
  const [submissionData, setSubmissionData] = useState("");
  const [displayUnsubmitBtn, setDisplayUnsubmitBtn] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(async () => {
    // get list of assignment of the selected week
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/assignment?weekId=${weekId}`)
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status === 'fail') {
        setFilePath([]);
        return;
      } else if (status !== 'success') {
        return;
      }
      setFilePath(data);
    });
  }, [weekId]);
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  //get list of submissions
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission?userId=${userId}&assignmentId=${filePath[0].assignment_id}`)
      .then((response) => {
        const { status, data, message } = response.data;
        console.log(status)
        if (status === 'error') {
          return;
        }
        else if (status === 'fail'){
          setSubmissionData("");
          setDisplayUnsubmitBtn(0);
          setSubmissionFileNames([])
        }
        else if (status === 'success'){
          setSubmissionData(data.submissionArr[0].file_path);
          setDisplayUnsubmitBtn(1);
        }
      });
  }, [userId, filePath]);
  console.log(submissionFileNames);
  const handleUploadWork = (event) => {
    console.log(event.target.files);
    var tempSubmissionFileNames = [event.target.files[0].name];
    setSubmissionFileNames(tempSubmissionFileNames);
  };
  async function handleDeleteAssignment(event) {
    event.preventDefault();
    const dataArr = event.target.value.split('|');
    const assignmentId = +dataArr[0];
    const assignmentFilePath = dataArr[1];
    const assignmentFilePathSplit = assignmentFilePath.split('/');
    const assignmentDir =
      assignmentFilePathSplit[0] + '/' + assignmentFilePathSplit[1] + '/' + assignmentFilePathSplit[2] + '/' + 'submission';
    console.log(assignmentFilePath);
    console.log(assignmentDir);

    console.log(`${process.env.REACT_APP_BACKEND_URL}/week/assignment`, { data: { assignmentId, weekId } });
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/week/assignment`, { data: { assignmentId, weekId } }).then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        return;
      }
      console.log(data);
      const tempArr = filePath.filter((data) => data.assignment_id !== assignmentId);
      setFilePath(tempArr);
    });
    if (assignmentFilePath !== '' && !(await deleteFileHandler(assignmentFilePath))) {
      console.log(`error deleting file: ${assignmentFilePath}`);
      return;
    }
    if (submissionData.length > 0) {
      for (let i = 0; i < submissionData.length; i++) {
        if (!(await deleteFileHandler(submissionData[i].file_path))) {
          console.log(`error deleting file: ${submissionData[i].file_path}`);
        } else {
          console.log(`success deleting file: ${submissionData[i].file_path}`);
        }
      }
    }
  }

  const handleClearFile = (event) => {
    setSubmissionFileNames([]);
    submissionFiles.value = null;
  };
  async function handleDownloadMaterial(event) {
    event.preventDefault();
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
      submissionFilePaths = [...submissionFilePaths, `${courseId}/week${weekIndex + 1}/assignment/submission/${submissionFileNames[i]}`];
    }
    if (fileList.length === 0) {
      setMsg('No work uploaded');
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      if (
        fileList.length !== 0 &&
        !(await uploadFileHandler(fileList.item(i), `${courseId}/week${weekIndex + 1}/assignment/submission/${fileList.item(i).name}`))
      ) {
        console.log(`error uploading file: ${`${courseId}/week${weekIndex + 1}/assignment/submission/${fileList.item(i).name}`}`);
        return;
      }
    }
    // insert submission file url to database
    try {
      var filePath = submissionFilePaths;
      var submissionDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
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
          setDisplayUnsubmitBtn(1)
          setSubmissionData(filePath[0])
        });
    } catch (err) {
      console.log(err.message);
    }
    await delay(5000)
    setMsg('')
  }
  async function handleConfirmDeleteWork(event) {
    event.preventDefault();
    const assignmentId = +event.target.value;
    // delete file from Firebase
    if (submissionData !== "") {
      if (!(await deleteFileHandler(submissionData))) {
        console.log(`error deleting file: ${submissionData}`);
        return;
      }
    }

    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/submission`, { data: { userId, assignmentId } }).then((response) => {
      const { status, data, message } = response.data;
      if (status !== 'success') {
        setMsg(message);
        return;
      }
      setMsg(`Successfully deleted work from ${courseId}`);
      setDisplayUnsubmitBtn(0)
      setSubmissionData("");
      handleClearFile();
    });
    await delay(5000)
    setMsg('')
  }
  return (
    <div className="course-assignment-container">
      {filePath.length === 0 && (
        <label
          style={{
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '15px',
          }}
        >
          There is no assignment for this week.
        </label>
      )}
      {filePath.length > 0 &&
        filePath.map((assignment, index) => (
          <div className="assignment-box">
            <div className="assignment-box-header">
              <label
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                  color: '#3b3b3b',
                  paddingBottom: '10px',
                }}
              >
                Assignment {index + 1}: {assignment.assignment_title} | Due Date: {assignment.due_date.slice(0, 10)}
              </label>
              {role !== 'student' && (
                <input
                  type="image"
                  value={assignment.assignment_id + '|' + assignment.file_path}
                  src={deleteIcon}
                  onClick={handleDeleteAssignment}
                />
              )}
            </div>
            <label
              style={{
                paddingBottom: '10px',
                paddingRight: '40px',
              }}
            >
              {assignment.description}
            </label>
            {assignment.file_path && (
              <div className='assignment-file'>
                <button className="download-work-btn" value={assignment.file_path} onClick={handleDownloadMaterial}>
                  <img src={downloadIcon} width="25px" />
                  {assignment.file_path.split('/')[3]}
                </button>
              </div>
            )}
            {role === 'student' && (
              <div className="work-container">
                <label
                  style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#3b3b3b',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  }}
                >
                  Your Work
                </label>
                <div className="upload-work-box">
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
                      }}
                    >
                      Upload your work
                    </label>
                    <label
                      style={{
                        fontWeight: '300',
                        fontSize: '12px',
                        color: '#672C84',
                      }}
                    >
                      Browse your file
                    </label>
                    {submissionFileNames.length > 0 &&
                      submissionFileNames.map((filename) => (
                        <label
                          value={filename}
                          key={filename}
                          style={{
                            fontWeight: '500',
                            fontSize: '12px',
                            color: '#3b3b3b',
                          }}
                        >
                          {filename}
                        </label>
                      ))}
                    {submissionData !== "" && submissionFileNames.length === 0 &&
                        <label
                          value={submissionData}
                          key={submissionData}
                          style={{
                            fontWeight: '500',
                            fontSize: '12px',
                            color: '#3b3b3b',
                          }}
                        >
                          {submissionData.split('/')[4]}
                        </label>
                    }
                    {submissionFileNames.length > 0 && submissionData.length === 0 && displayUnsubmitBtn === 0 &&(
                      <button className="clearbtn" onClick={handleClearFile}>
                        Clear
                      </button>
                    )}
                    
                  </div>
                </div>
                {displayUnsubmitBtn === 0 && (
                  <button
                    id="submit-file"
                    className="confirm-submit"
                    value={assignment.assignment_id}
                    type="submit"
                    onClick={handleConfirmUploadWork}
                  >
                    Submit
                  </button>
                )}
                {displayUnsubmitBtn === 1 && (
                  <button className="confirm-submit" value={assignment.assignment_id} type="button" onClick={handleConfirmDeleteWork}>
                    Unsubmit
                  </button>
                )}
                {msg && (
                  <label
                    className="status-msg"
                    style={{
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#672C84',
                      paddingTop: '10px',
                    }}
                  >
                    {msg}
                  </label>
                )}
              </div>
            )}
            {role !== 'student' && (
              <div className="student-work-container">
                <Link to={`/assignment/${assignment.assignment_id}`} className="student-work-btn">
                  View Student Work
                </Link>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CourseAssignment;
