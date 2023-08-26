import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Logo';

function Logo() {
  return (
    <Wrapper>
      <Link to="/">
        <img
          src="../jwfarmlogo-simple.svg"
          alt="JW Farm Logo"
          className="logo"
        />
      </Link>
    </Wrapper>
  );
}

export default Logo;
