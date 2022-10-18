import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

import { userActions } from '../../store/userSlice';

import googleIcon from '../../icons/google icon.svg';

import Navbar from '../../components/navbar/Navbar';
import './Login.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState();

  function loginWithGoogleHandler() {
    setErrorMsg();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { email } = result.user;
        const userData = await axios.get('https://api-dot-siit-academy.as.r.appspot.com/user?email=' + email);

        const { status, data, message } = userData.data;
        if (status === 'success') {
          dispatch(userActions.setUser(data));
          history.push('/home');
        } else if (status === 'fail') {
          setErrorMsg(message);
        } else {
          setErrorMsg(message);
        }
      })
      .catch(() => {
        setErrorMsg('Server error');
      });
  }

  return (
    <div className="login">
      <Navbar showTitle></Navbar>
      <div className="login__button-container">
        <p className="login__button-container--title">Sign In</p>
        <button onClick={loginWithGoogleHandler} className="login__button-container--btn">
          <img className="icon" src={googleIcon}></img>
          <p className="text">Sign in with google</p>
        </button>
        {errorMsg && <p className="login__error-msg">** {errorMsg} **</p>}
      </div>
    </div>
  );
}

export default Login;
