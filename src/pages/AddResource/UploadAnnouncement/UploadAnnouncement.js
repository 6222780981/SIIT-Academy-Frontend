import './UploadAnnouncement.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import uploadannouncementbtn from '../../../icons/upload-material-btn.png';

function UploadAnnouncement(props) {
  const { uploadFileHandler, courseId } = props;
  const fileRef = useRef();
  const [tempContent, setContent] = useState('');
  const announcementFiles = document.querySelector("input[name='upload-announcement']");
  const [announcementFilePaths, setAnnouncementFilePaths] = useState([]);
  const [announcementFileNames, setAnnouncementFileNames] = useState([]);
  const [msg, setMsg] = useState('');

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleUploadAnnouncement = (event) => {
    var tempAnnouncementFilePaths = [...announcementFilePaths];
    var tempAnnouncementFileNames = [...announcementFileNames];
    for (let i = 0; i < event.target.files.length; i++) {
      tempAnnouncementFileNames = [...tempAnnouncementFileNames, event.target.files[i].name];
      tempAnnouncementFilePaths = [...tempAnnouncementFilePaths, `${courseId}/announcement/${event.target.files[i].name}`];
    }

    setAnnouncementFilePaths(tempAnnouncementFilePaths);
    setAnnouncementFileNames(tempAnnouncementFileNames);
  };
  const handleClearFile = (event) => {
    setAnnouncementFilePaths([]);
    setAnnouncementFileNames([]);
    announcementFiles.value = null;
  };
  async function handleConfirmUploadAnnouncement(e) {
    e.preventDefault();
    const fileList = announcementFiles.files;
    const content = tempContent.replaceAll("'", '\'\'');
    console.log(tempContent);
    if (fileList.length !== 0) {
      for (let i = 0; i < fileList.length; i++) {
        if (!(await uploadFileHandler(fileList.item(i), `${courseId}/announcement/${fileList.item(i).name}`))) {
          console.log(`error uploading file: ${`${courseId}/announcement/${fileList.item(i).name}`}`);
          return;
        }
      }
    }
    try {
      var filePath = announcementFilePaths;
      var announcementDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      
      console.log(`${process.env.REACT_APP_BACKEND_URL}/course/announcement`, { courseId, announcementDate, content, filePath });
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/course/announcement`, { courseId, announcementDate, content, filePath })
        .then((response) => {
          console.log(response.data);
          const { status, data, message } = response.data;
          if (status !== 'success') {
            setMsg(message);
            return;
          }
          setMsg(`Successfully added announcement to ${courseId}`);
          setContent('');
          setAnnouncementFileNames([]);
          setAnnouncementFilePaths([]);
        });
    } catch (err) {
      console.log(err.message);
    }
    await delay(5000);
    setMsg('');
  }
  return (
    <form className="confirm-upload-announcement" onSubmit={handleConfirmUploadAnnouncement}>
      <div className="upload-announcement-container">
        <label
          className="course-container-header"
          style={{
            fontWeight: '600',
            fontSize: '20px',
            color: '#646464',
          }}
        >
          Upload New Announcement
        </label>
        <div className="upload-announcement-body">
          <div className="announcement-left-compartment">
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
              value={tempContent}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="announcement-right-compartment">
            <div className="upload-announcement-box">
              <input
                onChange={handleUploadAnnouncement}
                type="file"
                id="upload-announcement-btn"
                name="upload-announcement"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                ref={fileRef}
                multiple="multiple"
                style={{ display: 'none' }}
              ></input>
              <label htmlFor="upload-announcement-btn">
                <img className="upload-announcement-icon" src={uploadannouncementbtn} />
              </label>
              <div className="upload-announcement-texts">
                <label
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#672C84',
                  }}
                >
                  Upload Announcement Files
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
                {announcementFileNames.length > 0 &&
                  announcementFileNames.map((filename) => (
                    <label value={filename} key={filename}>
                      {filename}
                    </label>
                  ))}
                {announcementFileNames.length > 0 && (
                  <button className="clearbtn" onClick={handleClearFile}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <button className="confirm-upload" type="submit">
          Confirm
        </button>
      </div>
      {msg && (
        <label
          className="status-msg"
          style={{
            fontWeight: '500',
            fontSize: '14px',
            color: '#672C84',
            paddingTop: '10px',
            position:'absolute'
          }}
        >
          {msg}
        </label>
      )}
    </form>
  );
}

export default UploadAnnouncement;
