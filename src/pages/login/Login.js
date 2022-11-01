import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

import { userActions } from '../../store/userSlice';

import googleIcon from '../../icons/google icon.svg';

import Navbar from '../../components/navbar/Navbar';
import './Login.css';

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
        const { email, photoURL } = result.user;

        const userData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user?email=${email}`);

        const { status, data, message } = userData.data;

        if (status !== 'success') {
          setErrorMsg(message);
          return;
        }

        dispatch(userActions.setUser({ ...data, photoURL }));
        history.push('/home');
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
