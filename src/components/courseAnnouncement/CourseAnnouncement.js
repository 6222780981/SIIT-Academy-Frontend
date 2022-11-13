import {useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import './CourseAnnouncement.css';
import downloadIcon from '../../icons/download icon.svg';
import deleteIcon from '../../icons/delete icon.svg';
function CourseAnnouncement(props) {
  const { weekId, courseId, getFileUrlHandler, deleteFileHandler } = props;
  const [announcementData, setAnnouncementData] = useState([]);
  const role = useSelector((store) => store.user.role);
  
  useEffect(async() => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/announcement?courseId=${courseId}`)
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        return;
      }
      console.log(data);
      setAnnouncementData(data.reverse());
    });
  },[courseId])

  async function handleDownloadMaterial(event){
    var fileUrl = await getFileUrlHandler(event.target.value);
    console.log(fileUrl);
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }
  async function handleDeleteAnnouncement(event){
    event.preventDefault();
    const dataArr = event.target.value.split('|');
    const announcementId = +dataArr[0];
    const announcementFilePath = dataArr[1];
    console.log(`${process.env.REACT_APP_BACKEND_URL}/course/announcement`,{data: {announcementId,courseId}});
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/course/announcement`,{data: {announcementId,courseId}})
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        return;
      }
      const tempArr = announcementData.filter(data => data.announcement_id !== announcementId);
      setAnnouncementData(tempArr);
    });
    
    if((announcementFilePath !== "") && !(await deleteFileHandler(announcementFilePath))){
      console.log(`error deleting file: ${announcementFilePath}`);
    }
  };
  return(
    <div className='announcement-container'>
      {announcementData.length === 0 && 
        <label style={{
          textAlign:'center',
          fontWeight:'500',
          fontSize:'15px'
        }}>There is no announcement for this course.</label>
      }
      {announcementData.length > 0 && announcementData.map((post,index) =>(
        <div className='announcement-post'>
          <div className='announcement-post-header'>
            <label className='announcement-date'>{post.announcement_date.slice(0,10)}</label>
            {role !== "student" && <input 
              className='delete-btn'
              type="image"
              value={post.announcement_id+"|"+post.file_path}  
              src={deleteIcon} 
              onClick={handleDeleteAnnouncement}
            />}
          </div>
          <label style={{
            paddingLeft:'10px',
            paddingTop:'10px',
            paddingBottom:'10px',
            flexWrap:'wrap',
            paddingRight:'40px'
          }}>{post.content}
          </label>
          {post.file_path && <button 
            className='download-work-btn' 
            value={post.file_path}
            
            onClick={handleDownloadMaterial}>
            <img src={downloadIcon} width='25px'/>{post.file_path.split('/')[2]}
          </button>}
          {/* if this is not the last element then display horizontal line */}
          {index+1 < announcementData.length && <hr/>}
        </div>
      ))}
    </div>
  );
}

export default CourseAnnouncement;
