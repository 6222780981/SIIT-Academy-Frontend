import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import './Login.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function loginWithGoogleHandler() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // result.user is the signed-in user info.
      const { email } = result.user;

      // call api `backend_url/user?email=${email}` to get user data
    })
    .catch((err) => {
      // Handle Errors here.
    });
}

function Login() {
  return <div onClick={loginWithGoogleHandler}>Login</div>;
}

export default Login;
