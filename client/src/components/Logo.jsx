import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Logo';
import { useHomeContext } from '../pages/HomeLayout';

const Logo = () => {
  const { isDarkTheme } = useHomeContext();

  return (
    <Wrapper>
      {isDarkTheme ? (
        <Link to="/">
          <img src="../jwfarmlogo-simple-yellow.svg" alt="JW Farm Logo" className="logo" />
        </Link>
      ) : (
        <Link to="/">
          <img src="../jwfarmlogo-simple.svg" alt="JW Farm Logo" className="logo" />
        </Link>
      )}
    </Wrapper>
  );
};

export default Logo;
