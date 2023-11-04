import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div className="container">
          <img src={img} alt="404 page not found" />
          <h3>Sorry. Page not found.</h3>
          <p>We can&apos;t seem to find the page you are looking for</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>Sorry, something went wrong.</h3>
    </Wrapper>
  );
};
export default Error;
