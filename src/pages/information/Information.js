import Navbar from '../../components/navbar/Navbar';
import './Information.css';

function Information() {
  return (
    <div className="information">
      <Navbar showTitle></Navbar>
      <img src={`${process.env.REACT_APP_CLOUD_STORAGE_URL}/Others/siitcalendar.png`} className="information__calender"></img>
      <p className="information__footer siit">Sirindhorn International Institute of Technology</p>
      <p className="information__footer tu">Thammasart University</p>
    </div>
  );
}

export default Information;
