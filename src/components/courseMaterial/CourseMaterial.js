import './CourseMaterial.css';
import axios from 'axios';
import {useState} from 'react';
import { useSelector } from 'react-redux'
import downloadIcon from '../../icons/download icon.svg';
import deleteIcon from '../../icons/delete icon.svg';
function CourseMaterial(props) {
  const { weekId, getFileUrlHandler } = props;
  const role = useSelector((store) => store.user.role);
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

  const handleDeleteMaterial = (event) =>{
    event.preventDefault();
    const materialId = event.target.value;
    console.log(materialId);
  };
  return (
    <div className='course-material-container'>
      {filePath.length > 0 && filePath.map((file) =>(
        <div className='material-container'>
          <button className='download-btn' value={file.material_file_path} onClick={handleDownloadMaterial}>
            <img src={downloadIcon} width='25px'/>{file.material_file_path.split('/')[3]}
          </button>
          {role === 'teacher' || 'staff' && <input 
            className='delete-btn'
            type="image" 
            value={file.material_id}  
            src={deleteIcon} 
            onClick={handleDeleteMaterial}
          />}
        </div>
      ))}

    </div>
  
  );
}

export default CourseMaterial;
