import './UploadAssignment.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import uploadassignmentbtn from '../../AddResource/icons/upload-material-btn.png';

function UploadAssignment(props) {
  const { uploadFileHandler, weekArr, courseId } = props;

  const fileRef = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const assignmentFiles = document.querySelector("input[name='upload-assignment']");
  const [assignmentFileNames, setAssignmentFileNames] = useState([]);
  const [assignmentFilePaths, setAssignmentFilePaths] = useState([]);
  const [weekId, setWeek] = useState('');
  const [msg, setMsg] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
  };
  const handleUploadAssignment = (event) => {
    var tempAssignmentFilePaths = [...assignmentFilePaths];
    var tempAssignmentFileNames = [...assignmentFileNames];
    // console.log(event.target.files)
    for (let i = 0; i < event.target.files.length; i++) {
      tempAssignmentFileNames = [...tempAssignmentFileNames, event.target.files[i].name];
      tempAssignmentFilePaths = [...tempAssignmentFilePaths, `${courseId}/week${weekId + 1}/assignment/${event.target.files[i].name}`];
    }

    setAssignmentFilePaths(tempAssignmentFilePaths);
    setAssignmentFileNames(tempAssignmentFileNames);
  };
  const handleClearFile = (event) => {
    setAssignmentFilePaths([]);
    setAssignmentFileNames([]);
    assignmentFiles.value = null;
  };

  async function handleConfirmUploadAssignment(e) {
    e.preventDefault();
    // console.log(assignmentFiles);
    const fileList = assignmentFiles.files;
    console.log(fileList);
    console.log(assignmentFileNames);
    console.log(assignmentFilePaths);
    // console.log(materialFileNames);
    // return;
    if (fileList.length === 0 && weekId === '') {
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList.item(i));
      console.log(fileList.item(i).name);
      if (
        fileList.length !== 0 &&
        !(await uploadFileHandler(fileList.item(i), `${courseId}/week${weekId + 1}/assignment/${fileList.item(i).name}`))
      ) {
        console.log(`error uploading file: ${`${courseId}/week${weekId + 1}/assignment/${fileList.item(i).name}`}`);
        return;
      }
    }
    try {
      var filePath = assignmentFilePaths;
      console.log(`${process.env.REACT_APP_BACKEND_URL}/week/assignment`, { weekId, title, description, filePath, dueDate });
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/week/assignment`, { weekId, title, description, filePath, dueDate })
        .then((response) => {
          console.log(response.data);
          const { status, data, message } = response.data;
          if (status !== 'success') {
            setMsg(message);
            return;
          }
          setMsg(`Successfully added assignment(s) to ${courseId}`);
        });
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form className="confirm-upload-assignment" onSubmit={handleConfirmUploadAssignment}>
      <div className="upload-assignment-container">
        <label
          className="course-container-header"
          style={{
            fontWeight: '600',
            fontSize: '20px',
            color: '#646464',
          }}
        >
          Upload New Assignment
        </label>
        <div className="upload-assignment-body">
          <div className="left-compartment">
            <label
              className="title-text"
              style={{
                color: '#A2842A',
                fontWeight: '600',
                fontSize: '18px',
                paddingBottom: '10px',
              }}
            >
              Title
            </label>
            <input
              className="title-textbox"
              placeholder="Title"
              type="text"
              multiple="multiple"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              className="description-text"
              style={{
                color: '#A2842A',
                fontWeight: '600',
                fontSize: '18px',
                paddingBottom: '10px',
                paddingTop: '10px',
              }}
            >
              Description
            </label>
            <textarea
              className="description-textbox"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="right-compartment">
            <div className="upload-assignment-box">
              <input
                onChange={handleUploadAssignment}
                type="file"
                id="upload-assignment-btn"
                name="upload-assignment"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                ref={fileRef}
                // required
                style={{ display: 'none' }}
              ></input>
              <label htmlFor="upload-assignment-btn">
                <img className="upload-assignment-icon" src={uploadassignmentbtn} />
              </label>
              <div className="upload-assignment-texts">
                <label
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#672C84',
                  }}
                >
                  Upload Assignment Files
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
                {assignmentFileNames.length > 0 &&
                  assignmentFileNames.map((assignmentfilename) => (
                    <label value={assignmentfilename} key={assignmentfilename}>
                      {assignmentfilename}
                    </label>
                  ))}
                {assignmentFileNames.length > 0 && (
                  <button className="clearbtn" onClick={handleClearFile}>
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="assignment-week-dropdown">
              <label
                style={{
                  color: '#A2842A',
                  fontWeight: '600',
                  fontSize: '18px',
                  paddingBottom: '10px',
                }}
              >
                Upload to Week
              </label>
              <select value={weekId} onChange={handleChangeWeek}>
                <option disabled={true} value="">
                  Select Week
                </option>
                {weekArr.map((week, index) => (
                  <option value={index + 1} key={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="due-date">
              <label
                style={{
                  color: '#A2842A',
                  fontWeight: '600',
                  fontSize: '18px',
                  paddingBottom: '10px',
                }}
              >
                Due Date
              </label>
              <input className="due-date-calendar" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}></input>
            </div>
          </div>
        </div>
        <button className="confirm-upload" type="submit">
          Confirm
        </button>
      </div>
      {msg && (
        <label
          style={{
            fontWeight: '500',
            fontSize: '14px',
            color: '#672C84',
            paddingTop: '10px',
          }}
          className="status-msg"
        >
          {msg}
        </label>
      )}
    </form>
  );
}

export default UploadAssignment;
