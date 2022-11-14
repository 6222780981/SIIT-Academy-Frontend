import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';

import { userActions } from '../../store/userSlice';

import profileIcon from '../../icons/profile icon.svg';
import logo from '../../images/siitlogo.png';

import './Navbar.css';

function Navbar(props) {
  const { showTitle } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { courseId } = useParams();

  const userId = useSelector((store) => store.user.userId);
  const username = useSelector((store) => store.user.username);
  const role = useSelector((store) => store.user.role);

  function authenicationBtnClickHandler() {
    if (userId) {
      dispatch(userActions.resetUser());
    }

    history.push('/login');
  }

  return (
    <nav className="navbar">
      <Link to={userId ? '/home' : '/information'}>
        <img src={`${process.env.REACT_APP_CLOUD_STORAGE_URL}/Others/siitlogo.png`} className="navbar__logo"></img>
      </Link>
      {showTitle && (
        <p className="navbar__title">
          SIIT <span>Academy</span>
        </p>
      )}
      {pathname !== '/login' && (
        <div className="navbar__button-container">
          {role !== 'student' && pathname.includes('/course/') && (
            <Link to={`/course/${courseId}/management`} className="navbar__button-container--add-resource-link">
              Add resource
            </Link>
          )}
          {role === 'staff' && (
            <Link to="/management/course" className="navbar__button-container--manage-link">
              (Manage)
            </Link>
          )}
          {username && (
            <>
              <img src={profileIcon} className="navbar__button-container--profile-icon"></img>
              <p className="navbar__button-container--username">{username}</p>
            </>
          )}
          <button
            onClick={authenicationBtnClickHandler}
            className={`navbar__button-container--authenication-btn ${userId ? 'sign-out' : 'sign-in'}`}
          >
            {userId ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
