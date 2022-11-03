import {useState} from 'react';
import axios from 'axios';
import './CourseAnnouncement.css';
import downloadIcon from '../../icons/download icon.svg';
function CourseAnnouncement(props) {
  const { weekId, courseId, getFileUrlHandler } = props;
  const [announcementData, setAnnouncementData] = useState([]);

  if (announcementData.length === 0){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/announcement?courseId=${courseId}`)
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        // setMsg(message);
        return;
      }
      console.log(data);
      setAnnouncementData(data);
    });
  };

  async function handleDownloadMaterial(event){
    var fileUrl = await getFileUrlHandler(event.target.value);
    console.log(fileUrl);
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }
  return(
    <div className='announcement-container'>
      {announcementData.length > 0 && announcementData.reverse().map((post,index) =>(
        <div className='announcement-post'>
          <label className='announcement-date'>{post.announcement_date.slice(0,10)}</label>
          <label style={{
            paddingLeft:'10px',
            paddingTop:'10px',
            paddingBottom:'10px'
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
