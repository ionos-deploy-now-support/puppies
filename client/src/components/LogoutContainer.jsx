import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeContext } from '../pages/HomeLayout';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser } = useHomeContext();
  // const { user } = useDashboardContext();
  const { user } = useHomeContext();
  const navigate = useNavigate();
  const navToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Wrapper>
      <button type="button" className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
        {/* {user.photo ? (
          <img src={`/img/users/${user.photo}`} alt={`photo of ${user.name}`} className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown /> */}

        {user.name}
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type="button" className="dropdown-btn" onClick={navToDashboard}>
          dashboard
        </button>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
