import './CourseMaterial.css';
import axios from 'axios';
import {useState} from 'react';
import downloadIcon from '../../icons/download icon.svg';
function CourseMaterial(props) {
  const { weekId, getFileUrlHandler } = props;
  const [filePath, setFilePath] = useState([]);
  // console.log(`${process.env.REACT_APP_BACKEND_URL}/week/material?weekId=${weekId}`)
  if(filePath.length === 0){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/material?weekId=${weekId}`)
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
  }
  async function handleDownloadMaterial(event){
    var fileUrl = await getFileUrlHandler(event.target.value);
    console.log(fileUrl);
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className='course-material-container'>
      {filePath.length > 0 && filePath.map((file) =>(
        <button className='download-btn' value={file.material_file_path} onClick={handleDownloadMaterial}>
          <img src={downloadIcon} width='25px'/>{file.material_file_path.split('/')[3]}
        </button>
      ))}

    </div>
  
  );
}

export default CourseMaterial;
