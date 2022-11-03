import './UploadMaterials.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import uploadmaterialbtn from '../../AddResource/icons/upload-material-btn.png';

function UploadMaterials(props) {
  const fileRef = useRef();
  
  const materialFiles = document.querySelector("input[name='upload-material']");
  const [materialFileNames, setMaterialFileNames] = useState([]);
  // const [materialFilePaths, setMaterialFilePaths] = useState([]);
  const [weekId, setWeekId] = useState('');
  const [weekNum, setWeekNum] = useState('');
  const [msg, setMsg] = useState('');
  const { uploadFileHandler, weekArr, courseId } = props;
  // console.log(weekArr);

  const handleChangeWeek = (event) => {
    // console.log(event.target[event.target.selectedIndex].dataset.weekId);
    // console.log(event.target[event.target.selectedIndex].dataset.index);
    setWeekId(event.target[event.target.selectedIndex].dataset.weekId);
    setWeekNum(event.target[event.target.selectedIndex].dataset.index);
  };
  const handleUploadMaterial = (event) => {
    
    var tempMaterialFileNames = [...materialFileNames];

    for (let i = 0; i < event.target.files.length; i++) {
      tempMaterialFileNames = [...tempMaterialFileNames, event.target.files[i].name];
      // tempMaterialFilePaths = [...tempMaterialFilePaths, `${courseId}/week${weekNum}/material/${event.target.files[i].name}`];
    }
    // tempmaterialFiles = [...tempmaterialFiles,event.target.files]
    // console.log(tempMaterialFilePaths);
    // setMaterialFilePaths(tempMaterialFilePaths);
    setMaterialFileNames(tempMaterialFileNames);
    
  };

  const handleClearFile = (event) => {
    // setMaterialFilePaths([]);
    setMaterialFileNames([]);
    materialFiles.value = null;
  };
  async function handleConfirmUploadMaterial(e) {
    e.preventDefault();
    const fileList = materialFiles.files;
    console.log(fileList);
    console.log(materialFileNames);
    var materialFilePaths = [];
    for (let i = 0; i < materialFileNames.length; i++) {
      materialFilePaths = [...materialFilePaths, `${courseId}/week${weekNum}/material/${materialFileNames[i]}`];
    }
    console.log(materialFilePaths);
    // console.log(materialFileNames);
    if (fileList.length === 0 && weekId === '') {
      return;
    }
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList.item(i));
      // console.log(fileList.item(i).name);
      // if there is a file then perform file uploading
      if (
        fileList.length !== 0 &&
        !(await uploadFileHandler(fileList.item(i), `${courseId}/week${weekNum}/material/${fileList.item(i).name}`))
      ) {
        console.log(`error uploading file: ${`${courseId}/week${weekNum}/material/${fileList.item(i).name}`}`);
        return;
      }
    }
    try {
      var materialFilePathArr = materialFilePaths;
      console.log(`${process.env.REACT_APP_BACKEND_URL}/week/material`, { weekId, materialFilePathArr });
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/week/material`, { weekId, materialFilePathArr }).then((response) => {
        console.log(response.data);
        const { status, data, message } = response.data;
        if (status !== 'success') {
          setMsg(message);
          return;
        }
        setMsg(`Successfully added material(s) to ${courseId}`);
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <form className="confirm-upload-material" onSubmit={handleConfirmUploadMaterial}>
      <div className="upload-materials-container">
        <label
          className="course-container-header"
          style={{
            fontWeight: '600',
            fontSize: '20px',
            color: '#646464',
          }}
        >
          Upload New Material
        </label>

        <div className="upload-material-and-week-selection">
          <div className="upload-material">
            <input
              onChange={handleUploadMaterial}
              type="file"
              id="upload-material-btn"
              name="upload-material"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
              ref={fileRef}
              multiple="multiple"
              required
              style={{ display: 'none' }}
            ></input>
            <label htmlFor="upload-material-btn">
              <img className="upload-material-icon" src={uploadmaterialbtn} />
            </label>
            <div className="upload-material-texts">
              <label
                style={{
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#672C84',
                }}
              >
                Upload Material Files
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
              {materialFileNames.length > 0 &&
                materialFileNames.map((filename) => (
                  <label value={filename} key={filename}>
                    {filename}
                  </label>
                ))}
              {materialFileNames.length > 0 && (
                <button className="clearbtn" onClick={handleClearFile}>
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="week-dropdown">
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
            <select onChange={handleChangeWeek}>
              <option selected disabled={true} value="" hidden>
                Select Week
              </option>
              {weekArr.map((week, index) => (
                <option data-week-id={week.week_id} data-index={index+1} key={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* <label>{weekNum}</label>
            <label>{weekId}</label> */}
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
          }}
        >
          {msg}
        </label>
      )}
    </form>
  );
}

export default UploadMaterials;
