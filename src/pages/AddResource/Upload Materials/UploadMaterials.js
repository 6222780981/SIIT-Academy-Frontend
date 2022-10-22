import './UploadMaterials.css';
import {useState, useRef} from 'react';
function UploadMaterials() {
  const fileRef = useRef();
  const [week, setWeek] = useState('');
  // const [weekArr, setWeekArr] = useState([]);

  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
  };
  var weekArr = [1,2,3,4];
  return (
    <form>
      <div className="upload-materials">
        <label className='course-container-header'>Upload New Material</label>
        <div className='upload-material-and-week-selection'>
          <input
            type="file"
            id="upload-material-button"
            accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
            ref={fileRef}
            required
          ></input>
          <div className='week-dropdown'>
            <label>Select Week</label>
            <select value={week} onChange={handleChangeWeek}>
              <option disabled={true} value="">
                Select Week
              </option>
              {weekArr.map((week) => (
                <option value={week} key={week}>
                  {week}
                </option>
              ))}
            </select>
            {/* <label>{week}</label> */}
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
