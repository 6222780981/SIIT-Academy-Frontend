import './UploadMaterials.css';
import {useState, useRef} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadmaterialbtn from '../../AddResource/icons/upload-material-btn.png';

function UploadMaterials() {
  const { courseId } = useParams();
  const fileRef = useRef();
  const [materialFilePaths, setMaterialFilePaths] = useState([]);
  const [week, setWeek] = useState('');
  const [weekArr, setWeekArr] = useState([]);

  if (weekArr.length === 0){
    console.log(`${process.env.REACT_APP_BACKEND_URL}/week?courseId=${courseId}`);
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/week?courseId=${courseId}`)
    .then((response) => {
      console.log(response.data);
      const { status, data, message } = response.data;
      if (status !== 'success') {
        // setSearchErrorMsg(message);
        return;
      }
      const weekArr = response.data.data.weekArr;
      setWeekArr(weekArr);
    })
  }

  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
  };
  const handleUploadMaterial = (event)=>{
    // console.log(event.target.files[0].name);
    var tempmaterialFilePaths = [...materialFilePaths];
    tempmaterialFilePaths = [...tempmaterialFilePaths,event.target.files[0].name]
    setMaterialFilePaths(tempmaterialFilePaths);
  };
  const handleClearFile = (event) =>{
    setMaterialFilePaths([]);
  };
  const handleConfirmUploadMaterial = (event) =>{
    if ((materialFilePaths.length === 0) && (week ==='')){
      return;
    }
    console.log(materialFilePaths, week);
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
              {materialFilePaths.length > 0 && materialFilePaths.map((filename) => (
                <label value={filename} key={filename}>
                  {filename}
                </label>
              ))}
              {materialFilePaths.length > 0 && <button className="clearbtn" onClick={handleClearFile}>Clear</button>}
            </div>
          </div>
          <div className='week-dropdown'>
            <label style={{
              color:'#A2842A',fontWeight:'600',fontSize:'16px',paddingBottom:'10px'
            }}>Upload to Week</label>
            <select value={week} onChange={handleChangeWeek}>
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
