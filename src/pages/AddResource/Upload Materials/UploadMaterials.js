import './UploadMaterials.css';
import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadmaterialbtn from '../../AddResource/icons/upload-material-btn.png';
import { compose } from '@reduxjs/toolkit';

function UploadMaterials(props) {
  
  const fileRef = useRef();
  const materialFiles = document.querySelector("input[type=file]");
  const [materialFileNames, setMaterialFileNames] = useState([]);
  const [materialFilePaths, setMaterialFilePaths] = useState([]);
  const [weekIndex, setWeek] = useState('');
  const { uploadFileHandler, weekArr, courseId } = props;
  
  console.log(weekArr.length);
  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
  };
  const handleUploadMaterial = (event)=>{
    var tempMaterialFilePaths = [...materialFilePaths];
    var tempMaterialFileNames = [...materialFileNames];

    for (let i = 0; i<event.target.files.length; i++){
      tempMaterialFileNames = [...tempMaterialFileNames,event.target.files[i].name]
      tempMaterialFilePaths = [...tempMaterialFilePaths,`${courseId}/week${weekIndex + 1}/material/${event.target.files[i].name}`]
    }
    // tempmaterialFiles = [...tempmaterialFiles,event.target.files]
    
    setMaterialFilePaths(tempMaterialFilePaths);
    setMaterialFileNames(tempMaterialFileNames);
    // console.log(tempmaterialFiles);
    // console.log(tempmaterialFileNames);
  };
  const handleClearFile = (event) =>{
    setMaterialFilePaths([]);
    setMaterialFileNames([]);
    materialFiles.value = null;
  };
  async function handleConfirmUploadMaterial(e){
    e.preventDefault();
    const fileList = materialFiles.files;
    console.log(fileList);
    console.log(materialFileNames);
    console.log(materialFilePaths);
    // console.log(materialFileNames);
    // return;
    if ((fileList.length === 0) && (weekIndex ==='')){
      return;
    }
    for (let i=0; i<fileList.length; i++){
      console.log(fileList.item(i));
      // console.log(fileList.item(i).name)
      // if (fileArr.file && !(await uploadFileHandler(fileList.item(i), `${courseId}/week${weekIndex + 1}/material/${fileList.item(i).name}`))) {
      //   console.log(`error uploading file: ${`${courseId}/week${weekIndex + 1}/material/${fileList.item(i).name}`}`);
      //   return;
      // }
    }
    try{
      console.log(`${process.env.REACT_APP_BACKEND_URL}/week`,{weekId,materialFilePaths})
      // axios.post(`${process.env.REACT_APP_BACKEND_URL}/week`,{weekId,materialFilePaths})
    }catch (err) {
      console.log(err.message);
    }
    
  }

  return (
    <form className='confirm-upload-material' onSubmit={handleConfirmUploadMaterial}>
      <div className="upload-materials-container">
        <label className='course-container-header'style={{
          fontWeight:'600',fontSize:'20px',color:'#646464'
        }}>Upload New Material</label>
        
        <div className='upload-material-and-week-selection'>
          <div className='upload-material'>
            <input onChange={handleUploadMaterial}
              type="file"
              id="upload-material-btn"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
              ref={fileRef}
              multiple="multiple"
              required
              style={{ display: 'none' }}
            ></input>
            <label htmlFor="upload-material-btn">
              <img className='upload-material-icon' src={uploadmaterialbtn}/>
            </label>
            <div className='upload-material-texts'>
              <label style={{
                fontWeight:'500',fontSize:'14px', color:'#672C84'
              }}>Upload Material Files</label>
              <label style={{
                fontWeight:'300',fontSize:'12px',color:'#672C84'
              }}>Browse your file</label>
              {materialFileNames.length > 0 && materialFileNames.map((filename) => (
                <label value={filename} key={filename}>
                  {filename}
                </label>
              ))}
              {materialFileNames.length > 0 && <button className="clearbtn" onClick={handleClearFile}>Clear</button>}
            </div>
          </div>
          <div className='week-dropdown'>
            <label style={{
              color:'#A2842A',fontWeight:'600',fontSize:'16px',paddingBottom:'10px'
            }}>Upload to Week</label>
            <select value={weekIndex} onChange={handleChangeWeek}>
              <option disabled={true} value="">
                Select Week
              </option>
              {weekArr.map((week,index) => (
                <option value={index+1} key={index+1}>
                  {index+1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className='confirm-upload' type='submit'>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default UploadMaterials;
