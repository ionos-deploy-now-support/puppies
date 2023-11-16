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
  const navToReserve = () => {
    navigate('/reserve');
    setShowMenuDropDown(!showMenuDropDown);
  };
  const navToContactUs = () => {
    navigate('/contact');
    setShowMenuDropDown(!showMenuDropDown);
  };
  const navToGuarantee = () => {
    navigate('/guarantee');
    setShowMenuDropDown(!showMenuDropDown);
  };
  const navToLanding = () => {
    navigate('/');
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
        <button type="button" className="dropdown-btn" onClick={navToAbout}>
          about
        </button>
        <button type="button" className="dropdown-btn" onClick={navToContactUs}>
          contact us
        </button>
        <button type="button" className="dropdown-btn" onClick={navToGallery}>
          gallery
        </button>
        <button type="button" className="dropdown-btn" onClick={navToGuarantee}>
          guarantee
        </button>
        <button type="button" className="dropdown-btn" onClick={navToLanding}>
          home
        </button>
        <button type="button" className="dropdown-btn" onClick={navToReserve}>
          reserve puppy
        </button>
      </div>
    </Wrapper>
  );
};
export default PageNavDropDown;
