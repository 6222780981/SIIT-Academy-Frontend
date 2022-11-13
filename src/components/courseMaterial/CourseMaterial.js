import './CourseMaterial.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import downloadIcon from '../../icons/download icon.svg';
import deleteIcon from '../../icons/delete icon.svg';
function CourseMaterial(props) {
  const { weekId, getFileUrlHandler, deleteFileHandler } = props;
  const role = useSelector((store) => store.user.role);
  const [filePath, setFilePath] = useState([]);
  useEffect(async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/material?weekId=${weekId}`).then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status === 'fail') {
        setFilePath([]);
        return;
      } else if (status !== 'success') {
        return;
      } else {
        setFilePath(data);
      }
    });
  }, [weekId]);

  async function handleDownloadMaterial(event) {
    console.log(event.target.value);
    var fileUrl = await getFileUrlHandler(event.target.value);
    console.log(fileUrl);
    if (fileUrl === 0){
      console.log("cannot get file");
      return;
    }
    
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }

  async function handleDeleteMaterial(event) {
    event.preventDefault();
    const dataArr = event.target.value.split('|');
    const materialId = +dataArr[0];
    const materialFilePath = dataArr[1];
    console.log(`${process.env.REACT_APP_BACKEND_URL}/week/material`, { data: { materialId, weekId } });
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/week/material`, { data: { materialId, weekId } }).then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        return;
      }
      console.log(data);
      const tempArr = filePath.filter((data) => data.material_id !== materialId);
      setFilePath(tempArr);
    });

    if (materialFilePath !== '' && !(await deleteFileHandler(materialFilePath))) {
      console.log(`error deleting file: ${materialFilePath}`);
      return;
    }
  }
  return (
    <div className="course-material-container">
      <div className="course-material">
        {filePath.length === 0 && (
          <label
            style={{
              fontWeight: '500',
              fontSize: '15px',
            }}
          >
            There is no material for this course.
          </label>
        )}
        {filePath.length > 0 &&
          filePath.map((file) => (
            <div className="material-container">
              <button className="download-btn" value={file.material_file_path} onClick={handleDownloadMaterial}>
                <img src={downloadIcon} width="25px" />
                {file.material_file_path.split('/')[3]}
              </button>
              {role === 'teacher' ||
                ('staff' && (
                  <input
                    className="delete-btn"
                    type="image"
                    value={file.material_id + '|' + file.material_file_path}
                    src={deleteIcon}
                    onClick={handleDeleteMaterial}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CourseMaterial;
