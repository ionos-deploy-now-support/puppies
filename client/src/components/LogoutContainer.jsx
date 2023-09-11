import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeContext } from '../pages/HomeLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser, logoutUser } = useHomeContext();
  const navigate = useNavigate();
  const navToDashboard = () => {
    navigate('/dashboard');
  };
  const navToHome = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
        {currentUser.photo ? (
          <img
            src={`/img/users/${currentUser.photo}`}
            alt={`photo of ${currentUser.name}`}
            className="img"
          />
        ) : (
          <FaUserCircle />
        )}
        {currentUser?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        {window.location.pathname !== '/dashboard' && (
          <button type="button" className="dropdown-btn" onClick={navToDashboard}>
            dashboard
          </button>
        )}
        {window.location.pathname !== '/' && (
          <button type="button" className="dropdown-btn" onClick={navToHome}>
            home
          </button>
        )}
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
