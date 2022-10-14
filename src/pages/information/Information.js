import './Information.css';
import { Carousel } from 'react-carousel-minimal';
import { Link } from 'react-router-dom';
import siitlogo from '../../images/siitlogo.png';
import line from '../../images/Line 1.png';

function Information() {
  const data = [
    {
      image: require('../../images/siitcalendar.png'),
    },
    {
      image: require('../../images/bus_schedule.jpg'),
      style: 'object-fit:cover',
    },
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };
  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            alignItems: 'center',
          }}
        >
          <header>
            <Link to="/">
              <img className="siitlogo" src={siitlogo} />
            </Link>
            <h1>
              <a className="siittext">
                SIIT <span className="academytext">Academy</span>
              </a>
            </h1>
            <Link to="/login">
              <button className="button loginbutton">login</button>
            </Link>
          </header>
          <div className="carousel">
            <Carousel
              data={data}
              width="100%"
              height="792px"
              captionStyle={captionStyle}
              radius="10px"
              captionPosition="bottom"
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              style={{
                textAlign: 'center',
                // maxHeight: "500px",
                margin: '20px left',
                flex: 1,
              }}
            />
          </div>
          <h2>
            <a className="longsiit">Sirindhorn International Institute of Technology</a>
          </h2>
          <img className="lineimg" src={line} width="550px" />
          <h2>
            <a className="longtu">Thammasart University</a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Information;
