import './UploadAnnouncement.css';
import {useState, useRef} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadannouncementbtn from '../../AddResource/icons/upload-material-btn.png';
function UploadAnnouncement() {
  const { courseId } = useParams();
  const fileRef = useRef();
  const [description,setDescription] = useState('');
  const announcementFiles = document.querySelector("input[name='upload-announcement']");
  const [announcementFilePaths, setAnnouncementFilePaths] = useState([]);
  const [announcementFileNames, setAnnouncementFileNames] = useState([]);

  const handleUploadAnnouncement = (event)=>{
    var tempAnnouncementFilePaths = [...announcementFilePaths];
    var tempAnnouncementFileNames = [...announcementFileNames];
    for (let i = 0; i<event.target.files.length; i++){
      tempAnnouncementFileNames = [...tempAnnouncementFileNames,event.target.files[i].name]
      tempAnnouncementFilePaths = [...tempAnnouncementFilePaths,`${courseId}/announcement/${event.target.files[i].name}`]
    }
    
    setAnnouncementFilePaths(tempAnnouncementFilePaths);
    setAnnouncementFileNames(tempAnnouncementFileNames);
    // console.log(announcementFiles);
  };
  const handleClearFile = (event) =>{
    setAnnouncementFilePaths([]);
    setAnnouncementFileNames([]);
    announcementFiles.value = null;
  };
  async function handleConfirmUploadAnnouncement(e){
    e.preventDefault();
    const fileList = announcementFiles.files;
    console.log(fileList);
    console.log(announcementFileNames);
    console.log(announcementFilePaths);
    // console.log(materialFileNames);
    // return;
    if ((fileList.length === 0) && (weekIndex ==='')){
      return;
    }
    for (let i=0; i<fileList.length; i++){
      console.log(fileList.item(i));
      // console.log(fileList.item(i).name)
      // if (fileArr.file && !(await uploadFileHandler(fileList.item(i), `${courseId}/announcement/${fileList.item(i).name}`))) {
      //   console.log(`error uploading file: ${`${courseId}/announcement/${fileList.item(i).name}`}`);
      //   return;
      // }
    }
    try{
      var filePath = announcementFilePaths;
      console.log(`${process.env.REACT_APP_BACKEND_URL}/${courseId}/announcement`,{courseId,description,filePath})
      // axios.post(`${process.env.REACT_APP_BACKEND_URL}/week`,{weekId,materialFilePaths})
    }catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form className='confirm-upload-announcement' onSubmit={handleConfirmUploadAnnouncement}>
      <div className="upload-announcement-container">
        <label className='course-container-header'style={{
          fontWeight:'600',fontSize:'20px',color:'#646464'
        }}>Upload New Announcement
        </label>
        <div className='upload-announcement-body'>
          <div className='announcement-left-compartment'>
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
          <div className='announcement-right-compartment'>
            <div className='upload-announcement-box'>
              <input onChange={handleUploadAnnouncement}
                type="file"
                id="upload-announcement-btn"
                name='upload-announcement'
                accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                ref={fileRef}
                multiple="multiple"
                style={{ display: 'none' }}
              ></input>
              <label htmlFor="upload-announcement-btn">
                <img className='upload-announcement-icon' src={uploadannouncementbtn}/>
              </label>
              <div className='upload-announcement-texts'>
                <label style={{
                  fontWeight:'500',fontSize:'14px', color:'#672C84'
                }}>Upload Announcement Files</label>
                <label style={{
                  fontWeight:'300',fontSize:'12px',color:'#672C84'
                }}>Browse your file</label>
                {announcementFileNames.length > 0 && announcementFileNames.map((filename) => (
                  <label value={filename} key={filename}>
                    {filename}
                  </label>
                ))}
                {announcementFileNames.length > 0 && <button className="clearbtn" onClick={handleClearFile}>Clear</button>}
              </div>
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

export default UploadAnnouncement;
