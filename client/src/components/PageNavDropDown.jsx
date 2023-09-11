import Wrapper from '../assets/wrappers/PageNavDropDown';
import { FaAlignLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useHomeContext } from '../pages/HomeLayout';

const PageNavDropDown = () => {
  const { showMenuDropDown, setShowMenuDropDown } = useHomeContext();
  const navigate = useNavigate();
  const navToGallery = () => {
    navigate('/gallery');
    setShowMenuDropDown(!showMenuDropDown);
  };
  const navToAbout = () => {
    navigate('/about');
    setShowMenuDropDown(!showMenuDropDown);
  };
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="menu-btn"
          onClick={() => setShowMenuDropDown(!showMenuDropDown)}>
          <FaAlignLeft />
        </button>
      </div>
      <div className={showMenuDropDown ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type="button" className="dropdown-btn" onClick={navToGallery}>
          gallery
        </button>
        <button type="button" className="dropdown-btn" onClick={navToAbout}>
          about
        </button>
      </div>
    </Wrapper>
  );
};
export default PageNavDropDown;
