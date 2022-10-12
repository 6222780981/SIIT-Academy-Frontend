import './Information.css';
import { Carousel } from 'react-carousel-minimal';
import siitlogo from './images/siitlogo.png';
import line from './images/Line 1.png'

function Information() {
  const data = [
    {
        image: require('./images/siitcalendar.png')
    },
    {
        image: require('./images/bus_schedule.jpg'), style: "object-fit:cover"
    }
];

const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
}
const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
}
return (
    
    <div className="App">
        <div style={{ textAlign: "center" }}>
        <div style={{
            alignItems:"center"
        }}>
        <header>
            <a href="/"><img class="siitlogo" src={siitlogo}/></a>
            <h1>
                <a class="siittext">SIIT <span class="academytext">Academy</span></a>
            </h1>
            <a href="/login"><button class="button loginbutton">login</button></a>
        </header>
        <div class="carousel">
        <Carousel
            data= {data}
            
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
                textAlign: "center",
                // maxHeight: "500px",
                margin: "20px left",
                flex: 1,
                
            }}
        />
        </div>
        <h2><a class="longsiit">Sirindhorn International Institute of Technology</a></h2>
        <img class="lineimg" src={line} width="550px" />
        <h2><a class="longtu">Thammasart University</a></h2>
        </div>
    </div>
    </div>
);
}

export default Information;
