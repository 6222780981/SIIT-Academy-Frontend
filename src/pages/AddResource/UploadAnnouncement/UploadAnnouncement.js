import './UploadAnnouncement.css';
import {useState, useRef} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadannouncementbtn from '../../AddResource/icons/upload-material-btn.png';
function UploadAnnouncement() {
  const { courseId } = useParams();
  const fileRef = useRef();
  const [description,setDescription] = useState('')
  const [announcementFilePaths, setAnnouncementFilePaths] = useState([]);

  const handleUploadAnnouncement = (event)=>{
    var tempmaterialFilePaths = [...materialFilePaths];
    tempmaterialFilePaths = [...tempmaterialFilePaths,event.target.files[0].name]
    setAnnouncementFilePaths(tempmaterialFilePaths);
  };
  const handleClearFile = (event) =>{
    setMaterialFilePaths([]);
  };
  const handleConfirmUploadAnnouncement = (event) =>{
    if ((materialFilePaths.length === 0) && (week ==='')){
      return;
    }
    console.log(materialFilePaths, week);
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
                accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                ref={fileRef}
                required
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
                {announcementFilePaths.length > 0 && announcementFilePaths.map((announcementfilename) => (
                  <label value={announcementfilename} key={announcementfilename}>
                    {announcementfilename}
                  </label>
                ))}
                {announcementFilePaths.length > 0 && <button className="clearbtn" onClick={handleClearFile}>Clear</button>}
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
