import './UploadMaterials.css';
import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadmaterialbtn from '../../AddResource/icons/upload-material-btn.png';

function UploadMaterials(props) {
  
  const fileRef = useRef();
  const [materialFileNames, setMaterialFileNames] = useState([]);
  const [materialFilePaths, setMaterialFilePaths] = useState([]);
  const [weekIndex, setWeek] = useState('');
  const { uploadFileHandler, weekArr, courseId } = props;
  
  console.log(weekArr.length);
  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
  };
  const handleUploadMaterial = (event)=>{
    var tempmaterialFileNames = [...materialFileNames];
    var tempmaterialFilePaths = [...materialFilePaths];
    console.log(event.target.files)
    tempmaterialFilePaths = [...tempmaterialFileNames,`${courseId}/week${weekIndex + 1}/material/${event.target.files[0].name}`]
    tempmaterialFileNames = [...tempmaterialFileNames,event.target.files[0].name]
    setMaterialFilePaths(tempmaterialFilePaths);
    setMaterialFileNames(tempmaterialFileNames);
    console.log(tempmaterialFilePaths);
    console.log(tempmaterialFileNames);
  };
  const handleClearFile = (event) =>{
    setMaterialFileNames([]);
    setMaterialFilePaths([]);
    console.log(materialFileNames);
    console.log(materialFilePaths);
  };
  async function handleConfirmUploadMaterial(e){
    e.preventDefault();
    if ((materialFilePaths.length === 0) && (weekIndex ==='')){
      return;
    }
    for (fileArr in materialFilePaths){
      if (fileArr.file && !(await uploadFileHandler(fileArr.file, `${courseId}/week${weekIndex + 1}/material/${fileArr.file.name}`))) {
        console.log(`error uploading file: ${`${courseId}/week${weekIndex + 1}/material/${fileArr.file.name}`}`);
        return;
      }
      try{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/week`,{weekId,materialFilePaths})
      }catch (err) {
        console.log(err.message);
      }
    }
    // console.log(materialFilePaths, week);
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
