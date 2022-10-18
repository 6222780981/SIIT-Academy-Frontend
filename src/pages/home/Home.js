// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import './Home.css';

function Home() {
  // const history = useHistory();
  // const userId = useSelector((store) => store.user.userId);

  // useEffect(() => {
  //   if (!userId) {
  //     history.replace('/login');
  //   }
  // }, [userId]);

  return (
    <div className="home">
      <Navbar></Navbar>
    </div>
  );
}

export default Home;
