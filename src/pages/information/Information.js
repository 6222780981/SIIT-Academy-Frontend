import calendar from '../../images/siitcalendar.png';

import Navbar from '../../components/navbar/Navbar';
import './Information.css';

function Information() {
  return (
    <div className="information">
      <Navbar showTitle></Navbar>
      <img src={calendar} className="information__calender"></img>
      <p className="information__footer siit">Sirindhorn International Institute of Technology</p>
      <p className="information__footer tu">Thammasart University</p>
    </div>
  );
}

export default Information;
