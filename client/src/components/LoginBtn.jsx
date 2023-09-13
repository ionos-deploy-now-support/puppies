import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LoginBtn';
const LoginBtn = () => {
  return (
    <Wrapper>
      <Link to="/login" className="btn login-btn">
        Login
      </Link>
    </Wrapper>
  );
};
export default LoginBtn;
