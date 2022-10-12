import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import siitlogo from './images/siitlogo.png';

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
  return (
    <div className="LoginApp">
      <div style={{ textAlign: "center" }}>
        <div style={{
          alignItems:"center"
        }}>
          <header>
              <a href="/"><img class="siitlogo" src={siitlogo}/></a>
              <h1>
                  <a class="siittext">SIIT <span class="academytext">Academy</span></a>
              </h1>
              <p></p>
              {/* <a href="#"><button class="button loginbutton">login</button></a> */}
          </header>
          <div class="login">
            <div class="loginbox"> 
              {/*Text div*/}
              <h1 class="logintext">Sign in  </h1>

              {/* replace this with the google login */}
              <div class = "SignInWithGoogleButton">
                  <button onClick={loginWithGoogleHandler}>Login</button>
              </div>

            </div>
          </div>
          {/* <h2><a class="longsiit">Sirindhorn International Institute of Technology</a></h2>
          <img class="lineimg" src={line} width="550px" />
          <h2><a class="longtu">Thammasart University</a></h2> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
