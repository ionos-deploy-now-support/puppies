import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Wrapper from '../assets/wrappers/LandingPage';
import Carousel from '../components/Carousel';

const Landing = () => {
  return (
    <Wrapper>
      <PageNav />
      <h1> H1 JW Farm AKC Labrador Puppies</h1>
      <h2>H2 Raised in our home with love and sunshine on the farm.</h2>
      <p>P Just to see what text looks like</p>
      <Carousel />
      <Link to="/reserve" className="btn reserve-link">
        Reserve Your Puppy
      </Link>
    </Wrapper>
  );
};
export default Landing;
