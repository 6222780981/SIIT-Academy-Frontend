import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';

import { setupActions } from '../../store/setupSlice';
import axios from 'axios';

import siitlogo from '../../images/siitlogo.png';
import googleButton from '../../images/googleButton.png';

import './Login.css';
import { getType } from '@reduxjs/toolkit';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
// const axios = require('axios');
let userData = null;

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  function loginWithGoogleHandler() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // result.user is the signed-in user info.
        const { email } = result.user;

        // call api `backend_url/user?email=${email}` to get user data
        userData = await axios.get('https://api-dot-siit-academy.as.r.appspot.com/user?email=' + email);
        // console.log(result.user.email);
        // console.log(userData);
        // console.log(typeof userData.data.status);
        if (userData.data.status === 'success') {
          // console.log('help');
          dispatch(setupActions.setEmail(userData.data.data));
          history.push('/');
        } else if (userData.data.status === 'fail') {
          //failed message
        } else {
          //error message
        }

        // console.log("catch1");
      })
      .catch((err) => {
        // Handle Errors here.
      });
  }
  return (
    <div className="LoginApp">
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
            <p></p>
            {/* <Link to="#"><button className="button loginbutton">login</button></a> */}
          </header>
          <div className="login">
            <div className="loginbox">
              {/*Text div*/}
              <h1 className="logintext">Sign in </h1>

              {/* replace this with the google login */}
              <div className="SignInWithGoogleButton">
                <button onClick={loginWithGoogleHandler}>
                  <img src={googleButton} />
                </button>
                {/* <Link to="/"></a> */}
              </div>
            </div>
          </div>
          {/* <h2><a className="longsiit">Sirindhorn International Institute of Technology</a></h2>
          <img className="lineimg" src={line} width="550px" />
          <h2><a className="longtu">Thammasart University</a></h2> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
