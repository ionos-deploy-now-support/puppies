import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/LandingPage';
import Carousel from '../components/Carousel';

const Landing = () => {
  return (
    <Wrapper>
      <PageNav />
      <div className="intro">
        <hr />
        <h2>JW Farm AKC Labrador Puppies</h2>
        <h4>Raised in our home with love,</h4>
        <h4>fresh air and sunshine on the farm</h4>
        <h5>Puppies available for $800</h5>
        <p>We do not limit your puppy's breeding rights (Full Registration).</p>
        <hr />
      </div>
      <Carousel />
      <div className="reserve-container">
        <Link to="/reserve" className="btn reserve-link">
          Reserve Your Puppy
        </Link>
      </div>
    </Wrapper>
  );
};
export default Landing;
